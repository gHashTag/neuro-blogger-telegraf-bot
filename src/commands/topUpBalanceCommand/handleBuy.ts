import { Context } from 'telegraf'

interface BuyParams {
  ctx: Context
  data: string
  isRu: boolean
}

export async function handleBuy({ ctx, data, isRu }: BuyParams) {
  try {
    const starAmounts = [
      10, 50, 100, 500, 1000, 2000, 5000, 10000, 20000, 50000,
    ]

    console.log('data', data)
    console.log('starAmounts', starAmounts)

    for (const amount of starAmounts) {
      if (data.endsWith(`top_up_${amount}`)) {
        await ctx.replyWithInvoice({
          title: `${amount} ⭐️`,
          description: isRu
            ? `💬 Получите ${amount} звезд.\nИспользуйте звезды для различных функций нашего бота и наслаждайтесь новыми возможностями!`
            : `💬 Get ${amount} stars.\nUse stars for various functions of our bot and enjoy new opportunities!`,
          payload: `${amount}_${Date.now()}`,
          currency: 'XTR', // Pass “XTR” for payments in Telegram Stars.
          prices: [
            {
              label: 'Цена',
              amount: amount,
            },
          ],
          provider_token: '',
        })

        return
      }
    }
  } catch (error) {
    console.error('Error in handleBuy:', error)
    throw error
  }
}
