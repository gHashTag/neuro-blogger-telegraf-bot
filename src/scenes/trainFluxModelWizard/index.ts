import { Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import * as fs from 'fs/promises'
import fetch from 'node-fetch'
import {
  getUserBalance,
  sendBalanceMessage,
  sendInsufficientStarsMessage,
  updateUserBalance,
} from '../../helpers/telegramStars/telegramStars'
import { trainingCostInStars } from '../../helpers/telegramStars/calculateFinalPrice'
import { isValidImage } from '../../helpers/images'
import { createImagesZip } from '../../helpers/images/createImagesZip'
import { ensureSupabaseAuth } from '../../core/supabase'
import { uploadToSupabase } from '../../core/supabase/uploadToSupabase'
import { trainFluxModel } from '../../core/replicate/trainFluxModel'

export const trainFluxModelWizard = new Scenes.WizardScene<MyContext>(
  'trainFluxModelWizard',
  async ctx => {
    const isRu = ctx.from?.language_code === 'ru'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = ctx.message as any
    if (message && 'text' in message) {
      const args = message.text?.split(' ')
      let targetUserId: string
      let username: string | undefined

      if (args && args.length > 1) {
        targetUserId = args[1]
        if (!/^\d+$/.test(targetUserId)) {
          await ctx.reply(
            isRu
              ? '❌ Неверный формат Telegram ID.'
              : '❌ Invalid Telegram ID format.'
          )
          return ctx.scene.leave()
        }
        if (args.length > 2) {
          username = args[2]
        }
      } else {
        if (!ctx.from) {
          await ctx.reply(
            isRu
              ? '❌ Ошибка идентификации пользователя.'
              : '❌ User identification error.'
          )
          return ctx.scene.leave()
        }
        targetUserId = ctx.from.id.toString()
        username = ctx.from.username
      }

      if (!username) {
        await ctx.reply(
          isRu
            ? '❌ Для обучения модели необходимо указать username в настройках Telegram'
            : '❌ You need to set a username in Telegram settings to train a model'
        )
        return ctx.scene.leave()
      }

      const currentBalance = await getUserBalance(Number(targetUserId))
      if (currentBalance < trainingCostInStars) {
        await sendInsufficientStarsMessage(ctx, isRu)
        return ctx.scene.leave()
      }

      await sendBalanceMessage(currentBalance, trainingCostInStars, ctx, isRu)
      await updateUserBalance(
        Number(targetUserId),
        currentBalance - trainingCostInStars
      )

      ctx.session.images = []
      ctx.session.modelName = `${username.toLowerCase()}`
      ctx.session.targetUserId = Number(targetUserId)
      ctx.session.username = username

      await ctx.reply(
        isRu
          ? 'Пожалуйста, отправьте изображения для обучения модели (минимум 10 изображений). Отправьте /done когда закончите.'
          : 'Please send images for model training (minimum 10 images). Send /done when finished.',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: isRu ? '❌ Отменить' : '❌ Cancel',
                  callback_data: 'cancel_training',
                },
              ],
            ],
          },
        }
      )
    }
    return ctx.wizard.next()
  },
  async ctx => {
    const isRu = ctx.from?.language_code === 'ru'
    const message = ctx.message

    if (message && 'text' in message && message.text === '/done') {
      if (ctx.session.images.length < 10) {
        await ctx.reply(
          isRu
            ? `Необходимо минимум 10 изображений. Сейчас: ${ctx.session.images.length}`
            : `Minimum 10 images required. Current: ${ctx.session.images.length}`
        )
        return
      }
      ctx.wizard.next()
    }

    if (message && 'photo' in message) {
      const photo = message.photo[message.photo.length - 1]
      const file = await ctx.telegram.getFile(photo.file_id)

      if (!file.file_path) {
        await ctx.reply(
          isRu ? '❌ Ошибка получения файла' : '❌ Error getting file'
        )
        return
      }

      const response = await fetch(
        `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`
      )
      const buffer = Buffer.from(await response.arrayBuffer())

      if (!(await isValidImage(buffer))) {
        await ctx.reply(
          isRu
            ? '❌ Файл не является корректным изображением. Пожалуйста, отправьте другое изображение.'
            : '❌ File is not a valid image. Please send another image.'
        )
        return
      }

      const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10 MB
      if (buffer.length > MAX_IMAGE_SIZE) {
        await ctx.reply(
          isRu
            ? '❌ Изображение слишком большое. Максимальный размер: 10MB'
            : '❌ Image is too large. Maximum size: 10MB'
        )
        return
      }

      ctx.session.images.push({
        buffer: Buffer.from(buffer),
        filename: `a_photo_of_${ctx.session.username}x${
          ctx.session.images.length + 1
        }.jpg`,
      })

      await ctx.reply(
        isRu
          ? `✅ Изображение ${ctx.session.images.length} добавлено. Отправьте еще или /done для завершения`
          : `✅ Image ${ctx.session.images.length} added. Send more or /done to finish`
      )
    }
  },
  async ctx => {
    const isRu = ctx.from?.language_code === 'ru'
    try {
      await ctx.reply(isRu ? '⏳ Создаю архив...' : '⏳ Creating archive...')
      const zipPath = await createImagesZip(ctx.session.images)

      await ensureSupabaseAuth()

      await ctx.reply(isRu ? '⏳ Загружаю архив...' : '⏳ Uploading archive...')
      const zipUrl = await uploadToSupabase(
        zipPath,
        ctx.session.targetUserId.toString()
      )

      const triggerWord = `${ctx.session.username.toLocaleUpperCase()}`
      if (!triggerWord) {
        await ctx.reply(
          isRu ? '❌ Некорректный trigger word' : '❌ Invalid trigger word'
        )
        return ctx.scene.leave()
      }

      await ctx.reply(
        isRu ? '⏳ Начинаю обучение модели...' : '⏳ Starting model training...'
      )
      await ctx.reply(
        isRu
          ? `✅ Обучение начато!\n\nВаша модель будет натренирована через 3-6 часов. После завершения вы сможете проверить её работу, используя команду /neuro_photo.`
          : `✅ Training started!\n\nYour model will be trained in 3-6 hours. Once completed, you can check its performance using the /neuro_photo command.`
      )

      await trainFluxModel(
        zipUrl,
        triggerWord,
        ctx.session.modelName,
        ctx.session.targetUserId.toString()
      )

      await fs.unlink(zipPath).catch(console.error)
    } catch (error) {
      console.error('Error in trainFluxModelWizard:', error)
      await ctx.reply(
        isRu
          ? '❌ Произошла ошибка. Пожалуйста, попробуйте еще раз.'
          : '❌ An error occurred. Please try again.'
      )
    } finally {
      await ctx.scene.leave()
    }
  }
)

export default trainFluxModelWizard
