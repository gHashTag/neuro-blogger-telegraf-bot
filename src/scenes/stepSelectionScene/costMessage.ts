const costPerStepInRubles = 0.276 // Стоимость за шаг в рублях
const costPerStepInStars = 1.47 // Стоимость за шаг в звездах
const starsToDollarsRate = 0.016 // 1 звезда = 0.016 доллара
const rublesToDollarsRate = 100 // 100 рублей = 1 доллар
const rublesPerStar = 1.6 // 1 звезда = 1.6 рубля

const markupRate = 3 // Наценка 200%

const stepOptions = [
  1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000,
]

const costDetails = stepOptions.map(steps => {
  const costInRubles = calculateTrainingCostInRubles(steps) * markupRate // Применяем наценку
  const costInStars = costInRubles / rublesPerStar // Переводим рубли в звезды
  const costInDollars = costInRubles / rublesToDollarsRate // Переводим рубли в доллары

  return {
    steps,
    stars: costInStars.toFixed(0), // Форматируем до двух знаков после запятой
    rubles: costInRubles.toFixed(0), // Форматируем до двух знаков после запятой
    dollars: costInDollars.toFixed(0), // Форматируем до двух знаков после запятой
  }
})

// Функция для расчета стоимости в звездах
function calculateTrainingCostInStars(steps: number): number {
  return steps * costPerStepInStars // Умножаем количество шагов на стоимость за шаг в звездах
}

// Функция для расчета стоимости в рублях
function calculateTrainingCostInRubles(steps: number): number {
  return steps * costPerStepInRubles // Умножаем количество шагов на стоимость за шаг в рублях
}

// Формирование сообщения
export const stepsCostMessageRu =
  '🔢 Пожалуйста, выберите количество шагов для обучения модели.\n\n📈 Чем больше шагов, тем лучше качество, но это будет стоить дороже. 💰\n\n💰 Стоимость:\n' +
  costDetails
    .map(
      detail => `${detail.steps} шагов - ${detail.stars}⭐ / ${detail.rubles}₽`
    )
    .join('\n')

export const stepsCostMessageEn =
  '🔢 Please choose the number of steps for model training.\n\n📈 The more steps, the better the quality, but it will cost more. 💰\n\n💰 Cost:\n' +
  costDetails
    .map(
      detail => `${detail.steps} steps - ${detail.stars}⭐ / $${detail.dollars}`
    )
    .join('\n')

// Вывод результатов
console.log('💰 Стоимость:')
costDetails.forEach(detail => {
  console.log(
    `${detail.steps} шагов - ${detail.stars}⭐ / ${detail.rubles}₽ / $${detail.dollars}`
  )
})
