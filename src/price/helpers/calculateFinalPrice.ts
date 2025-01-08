import { VideoModelPrices } from '../models/videoModelPrices'
import { starCost } from '@/price'
import { VideoModel } from '@/interfaces'
import { interestRate } from '@/price/'

// Функция для расчета окончательной стоимости модели
export function calculateFinalPrice(model: VideoModel): number {
  const basePrice = VideoModelPrices[model]
  const finalPrice = basePrice * (1 + interestRate)
  return Math.floor(finalPrice / starCost)
}