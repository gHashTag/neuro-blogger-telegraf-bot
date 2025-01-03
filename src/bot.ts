import dotenv from 'dotenv'

// Загружаем переменные окружения из .env файла
dotenv.config()

// Создаем экземпляр бота с токеном из переменных окружения
import bot, { isDev } from './core/bot'
import { production } from './utils/launch'
import { development } from './utils/launch'

// Настраиваем команды бота
bot.start(ctx => ctx.reply('Welcome!!!!'))
bot.help(ctx => ctx.reply('Send me a sticker'))
bot.on('sticker', ctx => ctx.reply('👍'))
bot.hears('hi', ctx => ctx.reply('Hey there'))

if (process.env.NODE_ENV === 'development') {
  development(bot).catch(console.error)
} else {
  production(bot).catch(console.error)
}

// Обеспечиваем корректное завершение работы бота
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
