import { Markup } from 'telegraf'
import { sendInsufficientStarsMessage } from './sendInsufficientStarsMessage'
import { MyContext } from '@/interfaces'
import { getUserBalance } from '@/core/supabase'
import {
  calculateTrainingCostInDollars,
  calculateTrainingCostInRub,
  calculateTrainingCostInStars,
} from './calculateTrainingCost'
import { starCost } from '@/price'

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
    await sendInsufficientStarsMessage(ctx.from.id, currentBalance, isRu)
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
