import dotenv from 'dotenv'
dotenv.config()

import { Composer, Telegraf } from 'telegraf'
import { MyContext } from '@/interfaces'
import { isDev } from '@/config'
import { handleModelCallback } from './handlers'

import { setBotCommands } from './setCommands'
import { registerCommands, stage } from './registerCommands'
import { handleCallback } from './handlers/handleCallback'

import { NODE_ENV } from './config'
import { handlePaymentPolicyInfo } from './handlers/paymentHandlers/handlePaymentPolicyInfo'
import { handlePreCheckoutQuery } from './handlers/paymentHandlers/handlePreCheckoutQuery'
import { handleTopUp } from './handlers/paymentHandlers/handleTopUp'
import { handleSuccessfulPayment } from './handlers/paymentHandlers'
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

  console.log(`NODE_ENV: ${NODE_ENV}`) // Логирование значения NODE_ENV

  if (NODE_ENV === 'development') {
    console.log('Starting bots in development mode...')
    await development(bot1)
    await development(bot2)
  } else {
    console.log('Starting bots in production mode...')
    await production(bot1)
    await production(bot2)
  }
}

createBots()
