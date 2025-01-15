import { Telegraf, Scenes, session, Middleware } from 'telegraf'
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
} from './scenes'
import { subscriptionMiddleware } from '@/middlewares/subscription'

import { setupLevelHandlers } from './handlers/setupLevelHandlers'
import { menuCommand } from './commands/menuCommand'
import { inviteCommand } from './commands/inviteCommand'

import { priceCommand } from './commands/priceCommand'
import { myComposer } from './hearsHandlers'

import { defaultSession } from './store'
import { menuScene, balanceScene } from './scenes/'

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
  ...levelQuestWizard,
])

export function registerCommands(bot: Telegraf<MyContext>) {
  bot.use(session({ defaultSession }))

  bot.use(subscriptionMiddleware as Middleware<MyContext>)

  setupLevelHandlers(bot as Telegraf<MyContext>)

  // Регистрация команд
  myComposer.command('start', async ctx => {
    console.log('CASE: start')
    await neuroQuestCommand(ctx)
  })

  myComposer.command('buy', async ctx => {
    console.log('CASE: buy')
    await ctx.scene.enter('paymentScene')
  })

  myComposer.command('menu', async ctx => {
    console.log('CASE: myComposer.command menu')
    await menuCommand(ctx)
  })

  myComposer.command('invite', async ctx => {
    console.log('CASE: invite')
    await inviteCommand(ctx)
  })

  myComposer.command('balance', ctx => balanceCommand(ctx))

  myComposer.command('help', async ctx => {
    await neuroQuestCommand(ctx)
  })

  myComposer.command('price', async ctx => {
    await priceCommand(ctx)
  })

  myComposer.command('neuro_coder', async ctx => {
    await ctx.scene.enter('neuroCoderScene')
  })
}
