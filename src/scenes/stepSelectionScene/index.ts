import { Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import { getStepSelectionMenu } from '../../menu/getStepSelectionMenu'
import { isRussian } from '@/helpers/language'
import { handleTrainingCost } from '@/helpers/telegramStars'

import { mainMenu } from '@/menu'

export const stepSelectionScene = new Scenes.WizardScene<MyContext>(
  'stepSelectionScene',
  async ctx => {
    const isRu = isRussian(ctx)
    await ctx.reply(
      isRu
        ? 'Выберите количество шагов для обучения модели (чем больше, тем лучше, но дороже)'
        : 'Select the number of steps for model training (the more, the better, but more expensive)',
      getStepSelectionMenu(isRu)
    )
    return ctx.wizard.next()
  },
  async ctx => {
    const isRu = isRussian(ctx)
    console.log('Entering step 2 of the wizard')
    if (ctx.message && 'text' in ctx.message) {
      const messageText = ctx.message.text
      const stepsMatch = messageText.match(/\d+/)
      console.log('stepsMatch', stepsMatch)
      if (stepsMatch) {
        const steps = parseInt(stepsMatch[0])
        ctx.session.steps = steps
        console.log('Parsed steps:', steps)
        await handleTrainingCost(ctx, steps, isRu)

        return ctx.scene.enter('trainFluxModelWizard')
      } else {
        console.log('No steps found in callback data')
      }
    } else {
      console.log('Callback query does not contain data')
    }

    if (ctx.message && 'text' in ctx.message && ctx.message.text === 'Отмена') {
      await ctx.reply(
        isRu ? 'Отмена обучения модели' : 'Cancel model training',
        mainMenu(isRu)
      )
      return ctx.scene.leave()
    }

    await ctx.reply(
      isRu
        ? 'Пожалуйста, выберите количество шагов.'
        : 'Please select the number of steps.'
    )
  }
)
