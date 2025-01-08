import { MyContext } from '@/interfaces'
import { imageModelPrices } from '@/price'
import { VideoModel } from '@/interfaces'
import { calculateFinalPrice } from '@/price/helpers'

export async function validateAndCalculatePrice(
  videoModel: string,
  availableModels: VideoModel[],
  currentBalance: number,
  isRu: boolean,
  ctx: MyContext
): Promise<number | null> {
  if (!videoModel || !availableModels.includes(videoModel as VideoModel)) {
    await ctx.reply(
      isRu
        ? 'Пожалуйста, выберите корректную модель'
        : 'Please choose a valid model'
    )
    return null
  }

  const model = videoModel as VideoModel
  if (!(model in imageModelPrices)) {
    await ctx.reply(
      isRu ? 'Ошибка: неверная модель видео.' : 'Error: invalid video model.'
    )
    return null
  }

  const price = calculateFinalPrice(model)
  ctx.session.paymentAmount = price
  if (currentBalance < price) {
    await ctx.reply(
      isRu ? 'Недостаточно средств на балансе' : 'Insufficient balance'
    )
    return null
  }

  return price
}
