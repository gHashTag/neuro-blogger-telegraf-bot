import dotenv from 'dotenv'
dotenv.config()

import { development, production } from './utils/launch'

import { handleModelCallback } from './handlers'
import bot from './core/bot'

import { setBotCommands } from './setCommands'
import { registerCommands } from './registerCommands'
import { handleCallback } from './handlers/handleCallback'
import { MyContext } from './interfaces'

import { NODE_ENV } from './config'
import { handlePaymentPolicyInfo } from './handlers/paymentHandlers/handlePaymentPolicyInfo'
import { handlePreCheckoutQuery } from './handlers/paymentHandlers/handlePreCheckoutQuery'
import { handleTopUp } from './handlers/paymentHandlers/handleTopUp'
import { handleSuccessfulPayment } from './handlers/paymentHandlers'
import { Composer } from 'telegraf'

if (NODE_ENV === 'development') {
  development(bot).catch(console.error)
} else {
  production(bot).catch(console.error)
}

console.log(`Starting bot in ${NODE_ENV} mode`)

export const composer = new Composer<MyContext>()

setBotCommands(bot)
registerCommands({ bot, composer })

bot.action('callback_query', (ctx: MyContext) => {
  console.log('CASE: callback_query', ctx)
  handleCallback(ctx)
})

bot.action(/^select_model_/, async ctx => {
  console.log('CASE: select_model_', ctx.match)

  const model = ctx.match.input.replace('select_model_', '')
  ctx.session.selectedModel = model
  console.log('Selected model:', model)
  await handleModelCallback(ctx, model)
})

bot.action('payment_policy_info', handlePaymentPolicyInfo)
bot.action(/top_up_\d+/, handleTopUp)
bot.on('pre_checkout_query', handlePreCheckoutQuery)
bot.on('successful_payment', handleSuccessfulPayment)

bot.hears(['🎙️ Текст в голос', '🎙️ Text to speech'], async ctx => {
  console.log('CASE bot: 🎙️ Текст в голос')
  ctx.session.mode = 'text_to_speech'
  await ctx.scene.enter('textToSpeechWizard')
})

bot.hears(['🏠 Главное меню', '🏠 Main menu'], async ctx => {
  console.log('CASE: Главное меню')
  ctx.session.mode = 'main_menu'
  await ctx.scene.enter('menuScene')
})

bot.catch(err => {
  const error = err as Error
  console.error('Error:', error.message)
})

// Enable graceful stop
process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
