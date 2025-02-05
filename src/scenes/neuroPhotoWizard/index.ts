import { ModelUrl, MyContext, UserModel } from '../../interfaces'
import {
  imageNeuroGenerationCost,
  sendInsufficientStarsMessage,
  sendBalanceMessage,
} from '@/price/helpers'
import { generateNeuroImage } from '@/services/generateNeuroImage'
import {
  getLatestUserModel,
  getReferalsCountAndUserData,
  getUserBalance,
} from '@/core/supabase'
import { mainMenu, sendPhotoDescriptionRequest } from '@/menu'
import { handleHelpCancel } from '@/handlers/handleHelpCancel'
import { composeWizardScene } from '../sceneFactory'

const neuroPhotoConversation = async (
  ctx: MyContext,
  doneCallback: () => Promise<void>,
  next: () => void
) => {
  console.log('CASE: neuroPhotoConversation')
  const isRu = ctx.from?.language_code === 'ru'
  const userId = ctx.from?.id

  if (!userId) {
    await ctx.reply(
      isRu
        ? '❌ Ошибка идентификации пользователя'
        : '❌ User identification error'
    )
    return doneCallback()
  }

  const currentBalance = await getUserBalance(userId)

  if (currentBalance < imageNeuroGenerationCost) {
    await sendInsufficientStarsMessage(userId, currentBalance, isRu)
    return doneCallback()
  }

  await sendBalanceMessage(
    userId,
    currentBalance,
    imageNeuroGenerationCost,
    isRu
  )

  const userModel = await getLatestUserModel(userId)

  const telegram_id = ctx.from?.id?.toString() || ''
  const { count, subscription } = await getReferalsCountAndUserData(telegram_id)

  if (!userModel || !userModel.model_url) {
    await ctx.reply(
      isRu
        ? '❌ У вас нет обученных моделей.\n\nИспользуйте команду "🤖 Цифровое тело аватара", в главном меню, чтобы создать свою ИИ модель для генерации нейрофото в вашим лицом. '
        : "❌ You don't have any trained models.\n\nUse the '🤖  Digital avatar body' command in the main menu to create your AI model for generating neurophotos with your face.",
      {
        reply_markup: {
          keyboard: (
            await mainMenu({ isRu, inviteCount: count, subscription })
          ).reply_markup.keyboard,
        },
      }
    )

    return doneCallback()
  }

  ctx.session.userModel = userModel as UserModel
  ctx.session.mode = 'neuro_photo'

  await sendPhotoDescriptionRequest(ctx, isRu, 'neuro_photo')
  const isCancel = await handleHelpCancel(ctx)
  if (isCancel) {
    return doneCallback()
  }
  console.log('CASE: neuroPhotoConversation next')
  ctx.wizard.next()
}

const neuroPhotoPromptStep = async (
  ctx: MyContext,
  doneCallback: () => Promise<void>
) => {
  console.log('CASE: neuroPhotoPromptStep')
  const isRu = ctx.from?.language_code === 'ru'
  const promptMsg = ctx.message
  console.log(promptMsg, 'promptMsg')

  if (promptMsg && 'text' in promptMsg) {
    const promptText = promptMsg.text

    const isCancel = await handleHelpCancel(ctx)

    if (isCancel) {
      return doneCallback()
    } else {
      ctx.session.prompt = promptText
      const model_url = ctx.session.userModel.model_url as ModelUrl
      const trigger_word = ctx.session.userModel.trigger_word as string

      const userId = ctx.from?.id

      if (model_url && trigger_word) {
        const fullPrompt = `Fashionable ${trigger_word}, ${promptText}`
        await generateNeuroImage(fullPrompt, model_url, 1, userId || 0, ctx)
      } else {
        await ctx.reply(isRu ? '❌ Некорректный промпт' : '❌ Invalid prompt')
      }
    }

    ctx.scene.leave()
  }
}

export const neuroPhotoWizard = composeWizardScene(
  neuroPhotoConversation,
  neuroPhotoPromptStep
)
