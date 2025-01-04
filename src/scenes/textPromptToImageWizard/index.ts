import { Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import {
  getUserBalance,
  sendBalanceMessage,
  sendInsufficientStarsMessage,
  textToImageGenerationCost,
} from '../../helpers/telegramStars'
import { isRussian } from '../../helpers/language'
import { generateImage } from '../../services/generateReplicateImage'
import {
  sendGenerationCancelledMessage,
  sendPhotoDescriptionRequest,
  sendGenericErrorMessage,
} from '../../menu'

export const textPromptToImageWizard = new Scenes.WizardScene<MyContext>(
  'textPromptToImageWizard',
  async ctx => {
    const isRu = isRussian(ctx)
    console.log('CASE: textPromptToImageCommand')

    if (!ctx.from || !ctx.from.id || !ctx.chat?.id) {
      await sendGenericErrorMessage(ctx, isRu)
      return ctx.scene.leave()
    }
    ctx.session.mode = 'image_to_prompt'

    const currentBalance = await getUserBalance(ctx.from.id)
    const price = textToImageGenerationCost
    if (currentBalance < price) {
      await sendInsufficientStarsMessage(ctx, isRu)
      return ctx.scene.leave()
    }

    await sendBalanceMessage(
      currentBalance,
      textToImageGenerationCost,
      ctx,
      isRu
    )

    await sendPhotoDescriptionRequest(ctx, isRu)

    return ctx.wizard.next()
  },
  async ctx => {
    const isRu = isRussian(ctx)
    const message = ctx.message

    // Обработка текстового сообщения
    if (message && 'text' in message) {
      const text = message.text

      // Проверка на отмену генерации
      if (text === (isRu ? 'Отменить генерацию' : 'Cancel generation')) {
        await sendGenerationCancelledMessage(ctx, isRu)

        return ctx.scene.leave()
      }

      console.log(text, 'text')

      // Здесь вы можете вызвать функцию для генерации изображения
      if (!ctx.from?.id) {
        await ctx.reply(isRu ? '❌ Нет ID пользователя' : '❌ No user id')
        return ctx.scene.leave()
      }

      ctx.session.prompt = text
      ctx.session.mode = 'generate_image'
      await generateImage(
        text,
        ctx.session.selectedModel || '',
        1,
        ctx.from.id,
        isRu,
        ctx
      )

      return ctx.scene.leave()
    }

    await ctx.reply(isRu ? '❌ Некорректный промпт' : '❌ Invalid prompt')
    return ctx.scene.leave()
  }
)

export default textPromptToImageWizard
