import { Scenes, Markup } from 'telegraf'
import { MyContext } from '../../interfaces'
import { getAvailableModels } from '../../commands/selectModelCommand/getAvailableModels'
import { sendGenericErrorMessage } from '@/menu'

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

      const keyboard = Markup.inlineKeyboard(buttons)

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
    const isRu = ctx.from?.language_code === 'ru'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callbackQuery = ctx.callbackQuery as any
    if (!callbackQuery || !callbackQuery.data) {
      await sendGenericErrorMessage(ctx, isRu)
      return ctx.scene.leave()
    }

    const data = callbackQuery.data
    if (data === 'cancel') {
      await ctx.reply(isRu ? '❌ Выбор отменен.' : '❌ Selection cancelled.')
      return ctx.scene.leave()
    }

    if (data.startsWith('select_model_')) {
      const selectedModel = data.replace('select_model_', '')
      await ctx.reply(
        isRu
          ? `Вы выбрали модель: ${selectedModel}`
          : `You selected model: ${selectedModel}`
      )
      // Здесь можно добавить логику для обработки выбранной модели
    }

    return ctx.scene.leave()
  }
)

export default selectModelWizard
