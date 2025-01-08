import dotenv from 'dotenv'
dotenv.config()

import { development, production } from './utils/launch'

import { handleModelCallback, handleTextMessage } from './handlers'
import bot from './core/bot'

import { setBotCommands } from './setCommands'
import { registerCommands, stage } from './registerCommands'
import { handleCallback } from './handlers/handleCallback'
import { MyContext, MyTextMessageContext } from './interfaces'
import myComposer from './hearsHandlers'
import { NODE_ENV } from './config'
import { handleBuy } from './commands/topUpBalanceCommand/handleBuy'
import { handleSelectStars } from './commands/topUpBalanceCommand/handleSelectStars'
import { incrementBalance } from './price'
import { isRussian } from './helpers/language'
import { getUid } from './core/supabase/getUid'

if (NODE_ENV === 'development') {
  development(bot).catch(console.error)
} else {
  production(bot).catch(console.error)
}

console.log(`Starting bot in ${NODE_ENV} mode`)

setBotCommands(bot)
registerCommands(bot)

bot.use(stage.middleware())
bot.use(myComposer.middleware())

bot.on('pre_checkout_query', async ctx => {
  await ctx.answerPreCheckoutQuery(true)
  return
})

bot.action('callback_query', (ctx: MyContext) => handleCallback(ctx))

bot.action(/^select_model_/, async ctx => {
  console.log('CASE: select_model_', ctx.match)
  const model = ctx.match.input.replace('select_model_', '')
  console.log('Selected model:', model)
  await handleModelCallback(ctx, model)
})

bot.action('payment_policy_info', async ctx => {
  const isRu = ctx.from?.language_code === 'ru'
  await ctx.answerCbQuery() // Закрыть уведомление о нажатии кнопки
  await ctx.reply(
    isRu
      ? `💳 Оплата производится через систему Robokassa\n\n📦 Услуги предоставляются онлайн через вебинары, боты и консультации.\n\n🔄 Возврат средств возможен в течение 14 дней с момента оплаты при условии, что услуга не была оказана.\n\nИП Камская Гея Викторовна\nИНН: 711613594921\nОГРН/ОГРНИП: 317715400010572\n\n📝 Политика обработки персональных данных: Мы соблюдаем требования ФЗ "О персональных данных" от 27.07.2006 N 152-ФЗ.`
      : `💳 Payment is processed through the Robokassa system\n\n📦 Services are provided online through webinars, bots, and consultations.\n\n🔄 Refunds are possible within 14 days of payment if the service was not provided.\n\nIP Kamskaya Geya Viktorovna\nINN: 711613594921\nOGRN/OGRNIP: 317715400010572\n\n📝 Personal data processing policy: We comply with the requirements of the Federal Law "On Personal Data" dated 27.07.2006 N 152-FZ.`
  )
})

bot.command('buy', async ctx => {
  const isRu = ctx.from?.language_code === 'ru'
  await handleSelectStars({ ctx, isRu })
})

bot.action(/top_up_\d+/, async ctx => {
  const data = ctx.match[0]
  console.log('data', data)
  const isRu = ctx.from?.language_code === 'ru'
  await handleBuy({ ctx, data, isRu })
})

bot.on('pre_checkout_query', async ctx => {
  await ctx.answerPreCheckoutQuery(true)
  return
})

bot.on('successful_payment', async ctx => {
  if (!ctx.chat) {
    console.error('Update does not belong to a chat')
    return
  }
  const isRu = isRussian(ctx)

  // Рассчитайте количество звезд, которые пользователь получит
  const stars = ctx.message.successful_payment.total_amount

  if (!ctx.from?.id) throw new Error('No telegram id')
  const user_id = await getUid(ctx.from.id.toString())
  if (!user_id) throw new Error('No user_id')

  // Увеличиваем баланс пользователя на количество звезд
  await incrementBalance({ telegram_id: ctx.from.id.toString(), amount: stars })

  await ctx.reply(
    isRu
      ? `💫 Ваш баланс пополнен на ${stars} звезд!`
      : `💫 Your balance has been replenished by ${stars} stars!`
  )
  await ctx.telegram.sendMessage(
    '-1001978334539',
    `💫 Пользователь @${ctx.from.username} (ID: ${ctx.from.id}) пополнил баланс на ${stars} звезд!`
  )
})

bot.on('text', (ctx: MyTextMessageContext) => handleTextMessage(ctx))

bot.catch(err => {
  const error = err as Error
  console.error('Error:', error.message)
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
