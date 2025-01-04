import { Scenes, Markup } from 'telegraf'
import { MyContext } from '../../interfaces'
import { getAvailableModels } from '../../commands/selectModelCommand/getAvailableModels'
import { mainMenu, sendGenericErrorMessage } from '@/menu'
import { isRussian } from '@/helpers/language'

export const selectModelWizard = new Scenes.WizardScene<MyContext>(
  'selectModelWizard',
  async ctx => {
    const isRu = ctx.from?.language_code === 'ru'

    try {
      const models = await getAvailableModels()

      // Создаем кнопки для каждой модели, по 3 в ряд
      const buttons: ReturnType<typeof Markup.button.callback>[][] = []
      for (let i = 0; i < models.length; i += 3) {
        const row: ReturnType<typeof Markup.button.callback>[] = []
        if (models[i]) {
          row.push(
            Markup.button.callback(models[i], `select_model_${models[i]}`)
          )
        }
        if (models[i + 1]) {
          row.push(
            Markup.button.callback(
              models[i + 1],
              `select_model_${models[i + 1]}`
            )
          )
        }
        if (models[i + 2]) {
          row.push(
            Markup.button.callback(
              models[i + 2],
              `select_model_${models[i + 2]}`
            )
          )
        }
        buttons.push(row)
      }

      // Добавляем кнопку "Отмена" в конце
      buttons.push([
        Markup.button.callback(isRu ? '❌ Отменить' : '❌ Cancel', 'cancel'),
      ])

      const keyboard = Markup.keyboard(buttons)

      await ctx.reply(
        isRu ? '🧠 Выберите модель:' : '🧠 Select AI Model:',
        keyboard
      )

      return ctx.wizard.next()
    } catch (error) {
      console.error('Error creating model selection menu:', error)
      await ctx.reply(
        isRu
          ? '❌ Ошибка при получении списка моделей'
          : '❌ Error fetching models list'
      )
      return ctx.scene.leave()
    }
  },
  async ctx => {
    const isRu = isRussian(ctx)
    const message = ctx.message

    if (!message || !('text' in message)) {
      await sendGenericErrorMessage(ctx, isRu)
      return ctx.scene.leave()
    }

    const text = message.text
    console.log('CASE: selectModelWizard', text)

    if (text.toLowerCase() === (isRu ? '❌ отменить' : '❌ cancel')) {
      await ctx.reply(
        isRu ? '❌ Выбор модели отменен.' : '❌ Selection model cancelled.',
        {
          reply_markup: {
            keyboard: mainMenu(isRu).reply_markup.keyboard,
          },
        }
      )
      return ctx.scene.leave()
    }

    if (text.startsWith('select_model_')) {
      const selectedModel = text.replace('select_model_', '')

      await ctx.reply(
        isRu
          ? `🧠 Вы выбрали модель: ${selectedModel}`
          : `🧠You selected model: ${selectedModel}`
      )
    }

    return ctx.scene.leave()
  }
)

export default selectModelWizard
