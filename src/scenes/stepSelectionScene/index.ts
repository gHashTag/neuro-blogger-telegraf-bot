import { Markup, Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import { getStepSelectionMenu } from '../../menu/getStepSelectionMenu'
import { isRussian } from '@/helpers/language'
import { handleTrainingCost } from '@/price/helpers'
import { mainMenu } from '@/menu'

export const stepSelectionScene = new Scenes.WizardScene<MyContext>(
  'stepSelectionScene',
  async ctx => {
    const isRu = isRussian(ctx)
    await ctx.reply(
      isRu
        ? '🔢 Пожалуйста, выберите количество шагов для обучения модели.\n\n📈 Чем больше шагов, тем лучше качество, но это будет стоить дороже. 💰'
        : '🔢 Please select the number of steps for model training.\n\n📈 The more steps, the better the quality, but it will be more expensive. 💰',
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
        const { leaveScene, trainingCostInStars, currentBalance } =
          await handleTrainingCost(ctx, steps, isRu)
        if (leaveScene) {
          return ctx.scene.leave()
        } else {
          const message = isRu
            ? `✅ Вы выбрали ${steps} шагов стоимостью ${trainingCostInStars}⭐️ звезд\n\nВаш баланс: ${currentBalance} ⭐️`
            : `✅ You selected ${steps} steps costing ${trainingCostInStars}⭐️ stars\n\nYour balance: ${currentBalance} ⭐️`

          await ctx.reply(message, Markup.removeKeyboard())
          return ctx.scene.enter('trainFluxModelWizard')
        }
      }
    } else {
      console.error('Callback query does not contain data')
    }

    if (ctx.message && 'text' in ctx.message && ctx.message.text === 'Отмена') {
      await ctx.reply(isRu ? '❌ Отмена' : '❌ Cancel', {
        reply_markup: {
          keyboard: mainMenu(isRu).reply_markup.keyboard,
        },
      })
      return ctx.scene.leave()
    }

    await ctx.reply(
      isRu
        ? '🔢 Пожалуйста, выберите количество шагов для продолжения обучения модели.'
        : '🔢 Please select the number of steps to proceed with model training.'
    )
  }
)
