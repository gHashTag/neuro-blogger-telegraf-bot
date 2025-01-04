import { Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import {
  getUserBalance,
  sendBalanceMessage,
  sendInsufficientStarsMessage,
  updateUserBalance,
} from '../../helpers/telegramStars/telegramStars'
import { trainingCostInStars } from '../../helpers/telegramStars/calculateFinalPrice'
import { isValidImage } from '../../helpers/images'
import { isRussian } from '@/helpers/language'
import { BOT_TOKEN } from '@/core/bot'

export const trainFluxModelWizard = new Scenes.WizardScene<MyContext>(
  'trainFluxModelWizard',

  async ctx => {
    console.log('CASE 2 ctx.session.steps', ctx.session.steps)
    const isRu = isRussian(ctx)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = ctx.message as any
    console.log('CASE: trainFluxModelWizard', message)
    if (message && 'text' in message) {
      const args = message.text?.split(' ')
      console.log('args', args)
      let targetUserId: string
      let username: string | undefined

      if (args && args.length > 1 && /^\d+$/.test(args[1])) {
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
      console.log('Current balance:', currentBalance)
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
      ctx.session.triggerWord = `${username.toLowerCase()}`

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
    console.log('Proceeding to image upload step')
    ctx.wizard.next()
    return
  },
  async ctx => {
    console.log('Scene: IMAGES')
    const isRu = isRussian(ctx)
    const message = ctx.message

    if (message && 'text' in message && message.text === '/done') {
      console.log('Received /done command')
      if (ctx.session.images.length < 10) {
        await ctx.reply(
          isRu
            ? `Необходимо минимум 10 изображений. Сейчас: ${ctx.session.images.length}`
            : `Minimum 10 images required. Current: ${ctx.session.images.length}`
        )
        return
      }
      console.log('Proceeding to next step')
      ctx.scene.enter('uploadTrainFluxModelScene')
      console.log('Moved to ZIP scene')
      return
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

      console.log('File path:', file.file_path)

      const response = await fetch(
        `https://api.telegram.org/file/bot${BOT_TOKEN}/${file.file_path}`
      )
      const buffer = Buffer.from(await response.arrayBuffer())

      console.log('Buffer length:', buffer.length)
      console.log('Buffer content:', buffer.slice(0, 20)) // Вывод первых 20 байт

      const isValid = await isValidImage(buffer)
      console.log('Is valid image:', isValid)

      if (!isValid) {
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
      console.log(`Image ${ctx.session.images.length} added`)
    }
  }
)

export default trainFluxModelWizard
