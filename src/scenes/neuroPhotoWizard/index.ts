import { Scenes } from 'telegraf'
import { ModelUrl, MyContext, UserModel } from '../../interfaces'

import {
  imageNeuroGenerationCost,
  sendInsufficientStarsMessage,
  sendBalanceMessage,
} from '@/price/helpers'
import { generateNeuroImage } from '@/services/generateNeuroImage'
import { getLatestUserModel, getUserBalance } from '@/core/supabase'
import {
  mainMenu,
  sendGenerationCancelledMessage,
  sendPhotoDescriptionRequest,
} from '@/menu'

export const neuroPhotoWizard = new Scenes.WizardScene<MyContext>(
  'neuroPhotoWizard',
  async ctx => {
    console.log('CASE: neuroPhotoConversation')
    const isRu = ctx.from?.language_code === 'ru'
    const userId = ctx.from?.id

    if (!userId) {
      await ctx.reply(
        isRu
          ? '❌ Ошибка идентификации пользователя'
          : '❌ User identification error'
      )
      return ctx.scene.leave()
    }

    const currentBalance = await getUserBalance(userId)

    if (currentBalance < imageNeuroGenerationCost) {
      await sendInsufficientStarsMessage(userId, currentBalance, isRu)
      return ctx.scene.leave()
    }

    await sendBalanceMessage(
      userId,
      currentBalance,
      imageNeuroGenerationCost,
      isRu
    )

    // Получаем последнюю обученную модель пользователя
    const userModel = await getLatestUserModel(userId)

    console.log(userModel, 'userModel')

    if (!userModel || !userModel.model_url) {
      await ctx.reply(
        isRu
          ? '❌ У вас нет обученных моделей.\n\nИспользуйте команду "🤖 Цифровое тело аватара", в главном меню, чтобы создать свою ИИ модель для генерации нейрофото в вашим лицом. '
          : "❌ You don't have any trained models.\n\nUse the '🤖  Digital avatar body' command in the main menu to create your AI model for generating neurophotos with your face.",
        {
          reply_markup: {
            keyboard: mainMenu(isRu).reply_markup.keyboard,
          },
        }
      )

      return ctx.scene.leave()
    }

    ctx.session.userModel = userModel as UserModel

    ctx.session.mode = 'neuro_photo'

    await sendPhotoDescriptionRequest(ctx, isRu, 'neuro_photo')

    return ctx.wizard.next()
  },
  async ctx => {
    const isRu = ctx.from?.language_code === 'ru'
    const promptMsg = ctx.message

    if (promptMsg && 'text' in promptMsg) {
      const promptText = promptMsg.text

      if (promptText === (isRu ? 'Отменить генерацию' : 'Cancel generation')) {
        await sendGenerationCancelledMessage(ctx, isRu)
        return ctx.scene.leave()
      }

      console.log(promptText, 'promptText')
      console.log(ctx.session.userModel, 'ctx.session.userModel')
      ctx.session.prompt = promptText
      const model_url = ctx.session.userModel.model_url as ModelUrl
      const trigger_word = ctx.session.userModel.trigger_word as string

      // Добавляем trigger word к промпту
      const userId = ctx.from?.id

      if (model_url && trigger_word) {
        console.log(model_url, 'model_url')
        const fullPrompt = `Fashionable ${trigger_word}, ${promptText}`
        await generateNeuroImage(fullPrompt, model_url, 1, userId || 0, ctx)
      } else {
        await ctx.reply(isRu ? '❌ Некорректный промпт' : '❌ Invalid prompt')
      }
    }

    return ctx.scene.leave()
  }
)
