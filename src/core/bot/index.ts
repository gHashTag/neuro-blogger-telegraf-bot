import dotenv from 'dotenv'
import { Composer, Telegraf } from 'telegraf'
import { MyContext } from '@/interfaces'
import { isDev } from '@/config'
import { handleModelCallback } from '../../handlers'

import { setBotCommands } from '../../setCommands'
import { registerCommands, stage } from '../../registerCommands'
import { handleCallback } from '../../handlers/handleCallback'

import { NODE_ENV } from '../../config'
import { handlePaymentPolicyInfo } from '../../handlers/paymentHandlers/handlePaymentPolicyInfo'
import { handlePreCheckoutQuery } from '../../handlers/paymentHandlers/handlePreCheckoutQuery'
import { handleTopUp } from '../../handlers/paymentHandlers/handleTopUp'
import { handleSuccessfulPayment } from '../../handlers/paymentHandlers'
import { development, production } from '@/utils/launch'

// Загружаем переменные окружения из .env файла
dotenv.config()

if (!process.env.TELEGRAM_BOT_TOKEN_DEV) {
  throw new Error('TELEGRAM_BOT_TOKEN_DEV is not set')
}

if (!process.env.TELEGRAM_BOT_TOKEN_PROD) {
  throw new Error('TELEGRAM_BOT_TOKEN_PROD is not set')
}

export const BOT_TOKEN = isDev
  ? process.env.TELEGRAM_BOT_TOKEN_DEV
  : process.env.TELEGRAM_BOT_TOKEN_PROD

const BOT_TOKEN_2 = process.env.BOT_TOKEN_2
const bot1 = new Telegraf<MyContext>(BOT_TOKEN)
const bot2 = new Telegraf<MyContext>(BOT_TOKEN_2)

export const createBots = async () => {
  // Define your logic
  bot1.on('text', ctx => ctx.reply('I am bot1'))
  bot2.on('text', ctx => ctx.reply('I am bot2'))

  bot1.launch()
  bot2.launch()
}

// Создаем ботов и добавляем общую логику
// export const createBots = async () => {
//   const bots = await Promise.all(
//     [token1, token2].map(async token => {
//       const bot = new Telegraf<MyContext>(token)

//       if (NODE_ENV === 'development') {
//         await development(bot)
//       } else {
//         await production(bot)
//       }
//       bot.on('text', ctx => {
//         console.log('Received text message:', ctx.message)
//         ctx.reply('I am one of the bots!')
//       })
//       // const composer = new Composer<MyContext>()
//       // Устанавливаем команды и регистрируем обработчики
//       // setBotCommands(bot)
//       // registerCommands({ bot, composer })

//       // // Используем middleware
//       // bot.use(stage.middleware())
//       // bot.use(composer.middleware())

//       // Обработчики действий
//       // bot.action('callback_query', (ctx: MyContext) => {
//       //   console.log('CASE: callback_query', ctx)
//       //   handleCallback(ctx)
//       // })

//       // bot.action(/^select_model_/, async ctx => {
//       //   console.log('CASE: select_model_', ctx.match)
//       //   const model = ctx.match.input.replace('select_model_', '')
//       //   ctx.session.selectedModel = model
//       //   console.log('Selected model:', model)
//       //   await handleModelCallback(ctx, model)
//       // })

//       // bot.action('payment_policy_info', handlePaymentPolicyInfo)
//       // bot.action(/top_up_\d+/, handleTopUp)
//       // bot.on('pre_checkout_query', handlePreCheckoutQuery)
//       // bot.on('successful_payment', handleSuccessfulPayment)

//       // Обработка ошибок
//       bot.catch(err => {
//         const error = err as Error
//         console.error('Error:', error.message)
//       })

//       // Enable graceful stop
//       process.once('SIGINT', () => bot.stop())
//       process.once('SIGTERM', () => bot.stop())
//       return bot
//     })
//   )

//   return bots
// }
