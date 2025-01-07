import { Telegraf, Scenes, session, Middleware } from 'telegraf'
import { MyContext } from './interfaces'

import { startCommand } from './commands/startCommand'
import { neuroQuestCommand } from './commands/neuroQuestCommand'

import { topUpBalanceCommand } from './commands/topUpBalanceCommand'
import { balanceCommand } from './commands/balanceCommand'

import {
  avatarWizard,
  textToVideoWizard,
  emailWizard,
  neuroPhotoWizard,
  imageToPromptWizard,
  improvePromptWizard,
  sizeWizard,
  textPromptToImageWizard,
  imageToVideoWizard,
  cancelPredictionsWizard,
  trainFluxModelWizard,
  uploadTrainFluxModelScene,
  stepSelectionScene,
  selectModelWizard,
  voiceAvatarWizard,
  textToSpeechWizard,
} from './scenes'
import { subscriptionMiddleware } from './middlewares/subscription'

import { setupLevelHandlers } from './handlers/setupLevelHandlers'
import { menuCommand } from './commands/menuCommand'
import { inviteCommand } from './commands/inviteCommand'

import { priceCommand } from './commands/priceCommand'
import myComposer from './hearsHandlers'
import { handleBuy } from './commands/topUpBalanceCommand/handleBuy'
import { defaultSession } from './store'

export const startScene = new Scenes.WizardScene<MyContext>(
  'startCommand',
  startCommand
)
export const neuroQuestScene = new Scenes.WizardScene<MyContext>(
  'neuroQuestCommand',
  neuroQuestCommand
)
export const menuScene = new Scenes.WizardScene<MyContext>(
  'menuCommand',
  menuCommand
)
export const balanceScene = new Scenes.WizardScene<MyContext>(
  'balanceCommand',
  balanceCommand
)
export const topUpBalanceScene = new Scenes.WizardScene<MyContext>(
  'topUpBalanceCommand',
  topUpBalanceCommand
)

export const stage = new Scenes.Stage<MyContext>([
  startScene,
  neuroQuestScene,
  menuScene,
  balanceScene,
  topUpBalanceScene,
  avatarWizard,
  imageToPromptWizard,
  emailWizard,
  textPromptToImageWizard,
  menuScene,
  improvePromptWizard,
  sizeWizard,
  neuroPhotoWizard,
  textToVideoWizard,
  imageToVideoWizard,
  cancelPredictionsWizard,
  trainFluxModelWizard,
  uploadTrainFluxModelScene,
  stepSelectionScene,
  selectModelWizard,
  voiceAvatarWizard,
  textToSpeechWizard,
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

  // startScene.on('message', ctx => {
  //   console.log('CASE: startScene', ctx.message)
  // })

  // neuroQuestScene.on('message', ctx => {
  //   console.log('CASE: neuroQuestScene', ctx.message)
  // })

  bot.command('buystars', async ctx => {
    const isRu = ctx.from?.language_code === 'ru'
    const data = 'top_up_5000'

    await handleBuy({ ctx, data, isRu })
  })

  myComposer.command('menu', async ctx => {
    console.log('CASE: myComposer.command menu')
    await menuCommand(ctx)
  })

  myComposer.command('invite', async ctx => {
    console.log('CASE: invite')
    await inviteCommand(ctx)
  })

  myComposer.command('buy', async ctx => {
    await ctx.scene.enter('emailWizard')
  })

  myComposer.command('balance', ctx => balanceCommand(ctx))

  myComposer.command('help', async ctx => {
    await neuroQuestCommand(ctx)
  })

  myComposer.command('price', async ctx => {
    await priceCommand(ctx)
  })
}
