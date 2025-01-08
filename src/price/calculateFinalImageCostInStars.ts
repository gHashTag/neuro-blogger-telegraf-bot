import { interestRate } from './calculateFinalPrice'

import { starCost } from './calculateFinalPrice'

// Функция для расчета окончательной стоимости изображения в звездах
export function calculateFinalImageCostInStars(baseCost: number): number {
  const finalCostInDollars = baseCost * (1 + interestRate)
  return Math.round(finalCostInDollars / starCost)
}
