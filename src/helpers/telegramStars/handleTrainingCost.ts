import { starCost } from './calculateFinalPrice'
import { sendInsufficientStarsMessage } from './telegramStars'
import { Markup } from 'telegraf'
import { calculateTrainingCostInDollars } from './calculateFinalPrice'

import { calculateTrainingCostInRub } from './calculateFinalPrice'

import { MyContext } from '@/interfaces'
import { getUserBalance } from './telegramStars'
import { calculateTrainingCostInStars } from './calculateFinalPrice'

export async function handleTrainingCost(
  ctx: MyContext,
  steps: number,
  isRu: boolean
) {
  const trainingCostInStars = calculateTrainingCostInStars(steps)
  const trainingCostInRub = calculateTrainingCostInRub(steps)
  const trainingCostInDollars = calculateTrainingCostInDollars(steps)
  const currentBalance = await getUserBalance(Number(ctx.from?.id))

  if (currentBalance < trainingCostInStars) {
    await sendInsufficientStarsMessage(ctx, isRu)
    return ctx.scene.leave()
  }

  const message = isRu
    ? `✅ Вы выбрали ${steps} шагов стоимостью ${trainingCostInStars}⭐️ звезд\n` +
      `Одна звезда стоит ${starCost} ₽\n` +
      `Стоимость в рублях: ${trainingCostInRub} ₽\n` +
      `Ваш баланс: ${currentBalance} ⭐️`
    : `✅ You selected ${steps} steps costing ${trainingCostInStars}⭐️ stars\n` +
      `One star costs ${starCost} $\n` +
      `Cost in dollars: ${trainingCostInDollars} $\n` +
      `Your balance: ${currentBalance} ⭐️`

  await ctx.reply(message, Markup.removeKeyboard())
}
