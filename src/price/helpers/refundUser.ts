import { MyContext } from '@/interfaces'
import { getUserBalance, updateUserBalance } from '@/core/supabase'
import { mainMenu } from '@/menu'

export async function refundUser(ctx: MyContext, paymentAmount: number) {
  if (!ctx.from) {
    throw new Error('User not found')
  }
  const balance = await getUserBalance(ctx.from.id)
  console.log('balance', balance)
  // Возвращаем средства пользователю
  const newBalance = balance + paymentAmount
  console.log('newBalance', newBalance)
  await updateUserBalance(ctx.from.id, newBalance)

  // Отправляем сообщение пользователю
  const isRu = ctx.from.language_code === 'ru'
  await ctx.reply(
    isRu
      ? `Возвращено ${paymentAmount.toFixed(
          2
        )} ⭐️ на ваш счет.\nВаш баланс: ${newBalance.toFixed(2)} ⭐️`
      : `${paymentAmount.toFixed(
          2
        )} ⭐️ have been refunded to your account.\nYour balance: ${newBalance.toFixed(
          2
        )} ⭐️`,
    {
      reply_markup: {
        keyboard: mainMenu(isRu).reply_markup.keyboard,
      },
    }
  )
}
