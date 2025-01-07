import { Context } from 'telegraf'

interface BuyParams {
  ctx: Context
  isRu: boolean
}

export async function handleSelectStars({ ctx, isRu }: BuyParams) {
  try {
    const starAmounts = [
      10, 50, 100, 500, 1000, 2000, 5000, 10000, 20000, 50000,
    ]

    const inlineKeyboard = starAmounts.map(amount => {
      return [
        {
          text: isRu ? `Купить ${amount}⭐️` : `Buy ${amount}⭐️`,
          callback_data: `top_up_${amount}`,
        },
      ]
    })

    await ctx.reply(
      isRu
        ? 'Выберите количество звезд для покупки:'
        : 'Choose the number of stars to buy:',
      {
        reply_markup: {
          inline_keyboard: inlineKeyboard,
        },
      }
    )
  } catch (error) {
    console.error('Error in handleSelectStars:', error)
    throw error
  }
}
