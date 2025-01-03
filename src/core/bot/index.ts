import dotenv from 'dotenv'

// Загружаем переменные окружения из .env файла
dotenv.config()
import { Telegraf } from 'telegraf'
import { MyContext } from '@/interfaces'

export const isDev = process.env.NODE_ENV === 'development'

if (!process.env.TELEGRAM_BOT_TOKEN_DEV) {
  throw new Error('TELEGRAM_BOT_TOKEN_DEV is not set')
}

if (!process.env.TELEGRAM_BOT_TOKEN_PROD) {
  throw new Error('TELEGRAM_BOT_TOKEN_PROD is not set')
}

const token = isDev ? process.env.TELEGRAM_BOT_TOKEN_DEV : process.env.TELEGRAM_BOT_TOKEN_PROD
const bot = new Telegraf<MyContext>(token)

export default bot
