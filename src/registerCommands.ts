import { Telegraf, Scenes, session, Middleware, Composer } from 'telegraf'
import { MyContext } from './interfaces'

import { neuroQuestCommand } from './commands/neuroQuestCommand'

import { balanceCommand } from './commands/balanceCommand'

import {
  avatarWizard,
  textToVideoWizard,
  emailWizard,
  neuroPhotoWizard,
  imageToPromptWizard,
  improvePromptWizard,
  sizeWizard,
  textToImageWizard,
  imageToVideoWizard,
  cancelPredictionsWizard,
  trainFluxModelWizard,
  uploadTrainFluxModelScene,
  digitalAvatarBodyWizard,
  selectModelWizard,
  voiceAvatarWizard,
  textToSpeechWizard,
  paymentScene,
  levelQuestWizard,
  neuroCoderScene,
  lipSyncWizard,
  startScene,
  neuroQuestScene,
  chatWithAvatarWizard,
  helpScene,
  balanceScene,
  menuScene,
  subscriptionScene,
  inviteScene,
} from './scenes'
import { subscriptionMiddleware } from '@/middlewares/subscription'

import { setupLevelHandlers } from './handlers/setupLevelHandlers'

import { priceCommand } from './commands/priceCommand'

import { defaultSession } from './store'
import { rubGetWizard } from './scenes/rubGetWizard'
// import { handleTextMessage } from './handlers'
import { get100Command } from './commands/get100Command'

export const stage = new Scenes.Stage<MyContext>([
  startScene,
  chatWithAvatarWizard,
  neuroQuestScene,
  menuScene,
  balanceScene,
  avatarWizard,
  imageToPromptWizard,
  emailWizard,
  textToImageWizard,
  improvePromptWizard,
  sizeWizard,
  neuroPhotoWizard,
  textToVideoWizard,
  imageToVideoWizard,
  cancelPredictionsWizard,
  trainFluxModelWizard,
  uploadTrainFluxModelScene,
  digitalAvatarBodyWizard,
  selectModelWizard,
  voiceAvatarWizard,
  textToSpeechWizard,
  paymentScene,
  neuroCoderScene,
  lipSyncWizard,
  helpScene,
  subscriptionScene,
  rubGetWizard,
  inviteScene,
  ...levelQuestWizard,
])

export function registerCommands({
  bot,
  composer,
}: {
  bot: Telegraf<MyContext>
  composer: Composer<MyContext>
}) {
  bot.use(session({ defaultSession }))

  bot.use(subscriptionMiddleware as Middleware<MyContext>)

  setupLevelHandlers(bot as Telegraf<MyContext>)

  // Регистрация команд
  composer.command('start', async ctx => {
    console.log('CASE: start')
    await neuroQuestCommand(ctx)
  })

  composer.command('get100', async ctx => {
    console.log('CASE: get100')
    await get100Command(ctx)
  })

  composer.command('buy', async ctx => {
    console.log('CASE: buy')
    ctx.session.subscription = 'stars'
    await ctx.scene.enter('paymentScene')
  })

  composer.command('menu', async ctx => {
    console.log('CASE: myComposer.command menu')
    await ctx.scene.enter('menuScene')
  })

  composer.command('invite', async ctx => {
    console.log('CASE: invite')
    await ctx.scene.enter('inviteScene')
  })

  composer.command('balance', ctx => balanceCommand(ctx))

  composer.command('help', async ctx => {
    await neuroQuestCommand(ctx)
  })

  composer.command('price', async ctx => {
    await priceCommand(ctx)
  })

  composer.command('neuro_coder', async ctx => {
    await ctx.scene.enter('neuroCoderScene')
  })

  // myComposer.on('text', (ctx: MyContext) => {
  //   console.log('CASE: text')
  //   handleTextMessage(ctx)
  // })
}
