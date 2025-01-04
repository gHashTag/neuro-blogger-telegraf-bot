export type VideoModel = 'minimax' | 'haiper' | 'ray' | 'i2vgen-xl'

// Стоимость одной звезды
export const starCost = 0.016

// Определяем базовую стоимость для каждой модели
export const MODEL_PRICES: Record<VideoModel, number> = {
  minimax: 0.5,
  haiper: 0.05,
  ray: 0.45,
  'i2vgen-xl': 0.45,
}

// Процент наценки
const interestRate = 0.5 // 50% наценка

// Функция для расчета окончательной стоимости модели
export function calculateFinalPrice(model: VideoModel): number {
  const basePrice = MODEL_PRICES[model]
  const finalPrice = basePrice * (1 + interestRate)
  return Math.floor(finalPrice / starCost)
}

// Функция для расчета стоимости в звездах
function calculateCostInStars(costInDollars: number): number {
  return costInDollars / starCost
}

export const costPerStepInStars = 1.47

export function calculateTrainingCostInStars(steps: number): number {
  const totalCostInStars = steps * costPerStepInStars

  // Округляем до одного знака после запятой
  return parseFloat(totalCostInStars.toFixed(2))
}

export function calculateTrainingCostInDollars(steps: number): number {
  const totalCostInStars = steps * costPerStepInStars

  // Округляем до одного знака после запятой
  return parseFloat(totalCostInStars.toFixed(2))
}

export function calculateTrainingCostInRub(steps: number): number {
  const totalCostInStars = steps * costPerStepInStars

  // Округляем до одного знака после запятой
  return parseFloat(totalCostInStars.toFixed(2))
}

export const promptGenerationCost = calculateCostInStars(0.048)
export const textToImageGenerationCost = calculateCostInStars(0.12)
export const imageNeuroGenerationCost = calculateCostInStars(0.12)
export const textToVideoGenerationCost = calculateCostInStars(0.99)
export const textToVideoCost = calculateCostInStars(0.99)
export const speechGenerationCost = calculateCostInStars(0.12)
export const textToSpeechCost = calculateCostInStars(0.12)
export const imageToVideoCost = calculateCostInStars(0.99)
export const imageToVideoGenerationCost = calculateCostInStars(0.99)
export const imageToPromptCost = calculateCostInStars(0.03)
export const voiceConversationCost = calculateCostInStars(0.99)
