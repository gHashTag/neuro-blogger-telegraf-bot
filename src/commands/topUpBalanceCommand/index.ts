import { MyContext } from '../../interfaces'
import {
  rubToUsdRate,
  starCost,
} from '@/core/telegramStars/calculateFinalPrice'

function calculateStars(rubAmount: number): number {
  const usdAmount = rubAmount / rubToUsdRate
  return Math.floor(usdAmount / starCost)
}

const starsFor10 = calculateStars(10)
const starsFor1999 = calculateStars(1999)
const starsFor5000 = calculateStars(5000)
const starsFor10000 = calculateStars(10000)

const allowedUserIds = [144022504, 1254048880]

export async function topUpBalanceCommand(ctx: MyContext) {
  try {
    const isRu = ctx.from?.language_code === 'ru'
    const userId = ctx.from?.id

    const inlineKeyboard = [
      [
        {
          text: isRu
            ? `Купить ${starsFor1999}⭐️ за 1999 р`
            : `Buy ${starsFor1999}⭐️ for 1999 RUB`,
          web_app: {
            url: `https://auth.robokassa.ru/merchant/Invoice/mU8cKP2DlkWpXvrLJ5RDlQ`,
          },
        },
      ],
      [
        {
          text: isRu
            ? `Купить ${starsFor5000}⭐️ за 5000 р`
            : `Buy ${starsFor5000}⭐️ for 5000 RUB`,
          web_app: {
            url: `https://auth.robokassa.ru/merchant/Invoice/lm8bmBTG0Eet_kh7ITXp-w`,
          },
        },
      ],
      [
        {
          text: isRu
            ? `Купить ${starsFor10000}⭐️ за 10000 р`
            : `Buy ${starsFor10000}⭐️ for 10000 RUB`,
          web_app: {
            url: `https://auth.robokassa.ru/merchant/Invoice/I3IwAR8z-E67RwCPE-ag6Q`,
          },
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
Теперь вы можете пополнить баланс на любое количество звезд и использовать их для различных функций бота.\nПросто выберите количество звезд, которое вы хотите добавить на свой баланс.\nВ случае возникновения проблем с оплатой, пожалуйста, свяжитесь с нами @neurocalls`
        : `<b>🤑 Balance Top-Up</b>
You can now top up your balance with any number of stars and use them for various bot features. Simply choose the number of stars you want to add to your balance.\nIn case of payment issues, please contact us @neurocalls`,
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
