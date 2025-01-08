import { Scenes } from 'telegraf'
import { MyContext } from '@/interfaces'
import {
  sendBalanceMessage,
  sendInsufficientStarsMessage,
} from '@/price/helpers'
import { isRussian } from '@/helpers/language'
import { generateImage } from '@/services/generateReplicateImage'
import {
  sendGenerationCancelledMessage,
  sendPhotoDescriptionRequest,
  sendGenericErrorMessage,
} from '@/menu'
import { errorMessageAdmin } from '@/helpers/error'
import { imageModelPrices } from '@/price'
import { getUserBalance } from '@/core/supabase'

export const textToImageWizard = new Scenes.WizardScene<MyContext>(
  'textToImageWizard',
  async ctx => {
    try {
      const isRu = isRussian(ctx)

      console.log('CASE: textPromptToImageCommand')

      if (!ctx.from || !ctx.from.id || !ctx.chat?.id) {
        await sendGenericErrorMessage(ctx, isRu)
        return ctx.scene.leave()
      }
      ctx.session.mode = 'text_to_image'

      if (!ctx.message || !('text' in ctx.message)) {
        await sendGenericErrorMessage(ctx, isRu)
        return ctx.scene.leave()
      }

      const modelShortName = ctx.message.text
      console.log(modelShortName, 'modelShortName')

      // Найдите полное имя модели по короткому имени
      const selectedModelEntry = Object.entries(imageModelPrices).find(
        ([, modelInfo]) => modelInfo.shortName === modelShortName
      )
      console.log(selectedModelEntry, 'selectedModelEntry')

      if (!selectedModelEntry) {
        console.error('Model not found:', modelShortName)
        await sendGenericErrorMessage(ctx, isRu)
        return ctx.scene.leave()
      }
      const [fullModelId, selectedModelInfo] = selectedModelEntry
      ctx.session.selectedModel = fullModelId
      // Получаем информацию о выбранной модели

      console.log(selectedModelInfo, 'selectedModelInfo')
      if (!selectedModelInfo) {
        await sendGenericErrorMessage(ctx, isRu)
        return ctx.scene.leave()
      }

      const currentBalance = await getUserBalance(ctx.from.id)
      const price = selectedModelInfo.costPerImage

      console.log(price, 'price')
      console.log(currentBalance, 'currentBalance')
      if (currentBalance < price) {
        await sendInsufficientStarsMessage(ctx.from.id, currentBalance, isRu)
        return ctx.scene.leave()
      }

      await sendBalanceMessage(ctx.from.id, currentBalance, price, isRu)

      // Отправляем информацию о модели
      await ctx.replyWithPhoto(selectedModelInfo.previewImage, {
        caption: isRu
          ? `Модель: ${selectedModelInfo.shortName}\nОписание: ${selectedModelInfo.description_ru}`
          : `Model: ${selectedModelInfo.shortName}\nDescription: ${selectedModelInfo.description_en}`,
      })

      await sendPhotoDescriptionRequest(ctx, isRu, 'text_to_image')

      return ctx.wizard.next()
    } catch (error) {
      const isRu = isRussian(ctx)
      console.error('Error in textToImageWizard:', error)
      await sendGenericErrorMessage(ctx, isRu)
      errorMessageAdmin(error as Error)
      return ctx.scene.leave()
    }
  },
  async ctx => {
    const isRu = isRussian(ctx)
    const message = ctx.message

    console.log(message, 'message')

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
      ctx.session.mode = 'text_to_image'

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
