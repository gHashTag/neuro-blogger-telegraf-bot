import { Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import { getUserBalance } from '@/core/supabase'
import {
  sendBalanceMessage,
  sendInsufficientStarsMessage,
  textToImageGenerationCost,
} from '@/price/helpers'
import { isRussian } from '@/helpers/language'
import { generateImage } from '@/services/generateReplicateImage'
import {
  sendGenerationCancelledMessage,
  sendPhotoDescriptionRequest,
  sendGenericErrorMessage,
} from '@/menu'
import { imageModelPrices } from '@/price'

export const textToImageWizard = new Scenes.WizardScene<MyContext>(
  'textToImageWizard',
  async ctx => {
    const isRu = isRussian(ctx)
    console.log('CASE: textToImageWizard STEP 1', ctx.from?.id)

    if (!ctx.from || !ctx.from.id) {
      await sendGenericErrorMessage(ctx, isRu)
      return ctx.scene.leave()
    }
    ctx.session.mode = 'text_to_image'

    const currentBalance = await getUserBalance(ctx.from.id)

    const price = textToImageGenerationCost
    console.log('price STEP 1', price)
    if (currentBalance < price) {
      await sendInsufficientStarsMessage(ctx.from.id, currentBalance, isRu)
      return ctx.scene.leave()
    }

    await sendBalanceMessage(
      ctx.from.id,
      currentBalance,
      textToImageGenerationCost,
      isRu
    )
    if (!ctx.message || !('text' in ctx.message)) {
      await sendGenericErrorMessage(ctx, isRu)
      return ctx.scene.leave()
    }
    const modelShortName = ctx.message.text

    // Найдите полное имя модели по короткому имени
    const selectedModelEntry = Object.entries(imageModelPrices).find(
      ([, modelInfo]) => modelInfo.shortName === modelShortName
    )
    if (!selectedModelEntry) {
      console.error('Model not found:', modelShortName)
      await sendGenericErrorMessage(ctx, isRu)
      return ctx.scene.leave()
    }
    const [fullModelId, selectedModelInfo] = selectedModelEntry
    ctx.session.selectedModel = fullModelId

    if (!selectedModelInfo) {
      await sendGenericErrorMessage(ctx, isRu)
      return ctx.scene.leave()
    }

    // Отправляем информацию о модели
    await ctx.replyWithPhoto(selectedModelInfo.previewImage, {
      caption: isRu
        ? `<b>Модель: ${selectedModelInfo.shortName}</b>\n\n<b>Описание:</b> ${selectedModelInfo.description_ru}`
        : `<b>Model: ${selectedModelInfo.shortName}</b>\n\n<b>Description:</b> ${selectedModelInfo.description_en}`,
      parse_mode: 'HTML',
    })

    await sendPhotoDescriptionRequest(ctx, isRu, 'text_to_image')

    return ctx.wizard.next()
  },
  async ctx => {
    const isRu = isRussian(ctx)

    const message = ctx.message || ctx.callbackQuery?.message
    console.log('CASE: textToImageWizard STEP 2', message)
    // Обработка текстового сообщения
    if (message && 'text' in message) {
      const text = message.text

      // Проверка на отмену генерации
      if (text === 'Отмена' || text === 'Cancel') {
        await sendGenerationCancelledMessage(ctx, isRu)

        return ctx.scene.leave()
      }

      console.log(text, 'text')

      if (!ctx.from?.id) {
        await ctx.reply(isRu ? '❌ Нет ID пользователя' : '❌ No user id')
        return ctx.scene.leave()
      }

      ctx.session.prompt = text

      console.log(ctx.session.selectedModel, 'ctx.session.selectedModel')

      await generateImage(
        text,
        ctx.session.selectedModel,
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

export default textToImageWizard
