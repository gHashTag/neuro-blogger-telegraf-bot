import { MyContext } from '@/interfaces'
import { starCost } from '@/price'
export const rubToUsdRate = 100
export const starAmounts = [10, 50, 100, 500, 1000, 2000, 5000, 10000, 20000]

function calculateStars(rubAmount: number): number {
  const usdAmount = rubAmount / rubToUsdRate
  return Math.floor(usdAmount / starCost)
}

const starsFor10 = calculateStars(10)
const starsFor1999 = calculateStars(1999)
const starsFor5000 = calculateStars(5000)
const starsFor10000 = calculateStars(10000)

const allowedUserIds = [144022504, 1254048880]

interface BuyParams {
  ctx: MyContext
  isRu: boolean
}

export async function handleBuyRobokassa({ ctx, isRu }: BuyParams) {
  try {
    const userId = ctx.from?.id

    const inlineKeyboard = [
      [
        {
          text: isRu
            ? `Купить ${starsFor1999}⭐️ за 1999 р`
            : `Buy ${starsFor1999}⭐️ for 1999 RUB`,
          web_app: {
            url: `https://auth.robokassa.ru/merchant/Invoice/aGuNEDxGvEmFhI9CFLQ-AQ`,
          },
        },
      ],
      [
        {
          text: isRu
            ? `Купить ${starsFor5000}⭐️ за 5000 р`
            : `Buy ${starsFor5000}⭐️ for 5000 RUB`,
          web_app: {
            url: `https://auth.robokassa.ru/merchant/Invoice/tmejnivH6kuGz-ZPSs0DKg`,
          },
        },
      ],
      [
        {
          text: isRu
            ? `Купить ${starsFor10000}⭐️ за 10000 р`
            : `Buy ${starsFor10000}⭐️ for 10000 RUB`,
          web_app: {
            url: `https://auth.robokassa.ru/merchant/Invoice/cESGr7zzsUGqlRm5u8dPlQ`,
          },
        },
      ],
      [
        {
          text: isRu
            ? 'Информация о платежах и политике'
            : 'Payment and Policy Info',
          callback_data: 'payment_policy_info',
        },
      ],
    ]

    if (userId && allowedUserIds.includes(userId)) {
      inlineKeyboard.push([
        {
          text: isRu
            ? `Купить ${starsFor10}⭐️ за 10 р`
            : `Buy ${starsFor10}⭐️ for 10 RUB`,
          web_app: {
            url: 'https://auth.robokassa.ru/merchant/Invoice/R2Gm8t1jU0WcBqcrAwbj4Q',
          },
        },
      ])
    }

    inlineKeyboard.push([
      {
        text: isRu ? 'Что такое звезды❓' : 'What are stars❓',
        web_app: {
          url: `https://telegram.org/blog/telegram-stars/${
            isRu ? 'ru' : 'en'
          }?ln=a`,
        },
      },
    ])

    await ctx.reply(
      isRu
        ? `<b>🤑 Пополнение баланса</b>
Теперь вы можете пополнить баланс на любое количество звезд и использовать их для различных функций бота.\nПросто выберите количество звезд, которое вы хотите добавить на свой баланс.\nВ случае возникновения проблем с оплатой, пожалуйста, свяжитесь с нами @neuro_sage`
        : `<b>🤑 Balance Top-Up</b>
You can now top up your balance with any number of stars and use them for various bot features. Simply choose the number of stars you want to add to your balance.\nIn case of payment issues, please contact us @neuro_sage`,
      {
        reply_markup: {
          inline_keyboard: inlineKeyboard,
        },
        parse_mode: 'HTML',
      }
    )
    return
  } catch (error) {
    console.error('Error in buyRobokassa:', error)
    throw error
  }
}