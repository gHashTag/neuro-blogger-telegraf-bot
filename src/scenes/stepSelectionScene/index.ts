import { Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import { getStepSelectionMenu } from '../../menu/getStepSelectionMenu'
import { isRussian } from '@/helpers/language'

export const stepSelectionScene = new Scenes.WizardScene<MyContext>(
  'stepSelectionScene',
  async ctx => {
    const isRu = isRussian(ctx)
    await ctx.reply(
      isRu
        ? 'Выберите количество шагов для обучения модели (чем больше, тем лучше, но дороже) 1 шаг = 10 звезд:'
        : 'Select the number of steps for model training (the more, the better, but more expensive) 1 step = 10 stars:',
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

        await ctx.reply(
          isRu ? `Вы выбрали ${steps} шагов.` : `You selected ${steps} steps.`
        )

        return ctx.scene.enter('trainFluxModelWizard')
      } else {
        console.log('No steps found in callback data')
      }
    } else {
      console.log('Callback query does not contain data')
    }

    await ctx.reply(
      isRu
        ? 'Пожалуйста, выберите количество шагов.'
        : 'Please select the number of steps.'
    )
  }
)
