import { generateNeuroImage } from '../../services/generateNeuroImage'
import { getPrompt } from '../../core/supabase'
import { MyContext } from '../../interfaces'
import {
  sendInsufficientStarsMessage,
  getUserBalance,
  imageModelPrices,
} from '../../price'
import { sendGenerationErrorMessage } from '../../menu'

export async function handleGenerate(
  ctx: MyContext,
  data: string,
  isRu: boolean
) {
  try {
    if (!ctx || !ctx.from) {
      await ctx.reply(
        isRu ? 'Ошибка идентификации пользователя' : 'User identification error'
      )
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, count, promptId] = data.split('_')
    const promptData = await getPrompt(promptId)
    if (!promptData) {
      await ctx.reply(
        isRu
          ? 'Не удалось найти информацию о промпте'
          : 'Could not find prompt information'
      )
      return
    }

    const numImages = parseInt(count)
    console.log('numImages', numImages)

    const currentBalance = await getUserBalance(ctx.from.id)
    const price = imageModelPrices[promptData.model_type].costPerImage
    if (currentBalance < price) {
      await sendInsufficientStarsMessage(ctx, currentBalance, isRu)
      return
    } else {
      await generateNeuroImage(
        promptData.prompt,
        promptData.model_type,
        numImages,
        ctx.from.id,
        ctx
      )
      return
    }
    return
  } catch (error) {
    console.error('Ошибка при генерации:', error)
    await sendGenerationErrorMessage(ctx, isRu)
    throw error
  }
}
