import { Markup } from 'telegraf'
import { MyContext } from '@/interfaces'
import { imageModelPrices } from '@/price'

export async function imageModelMenu(ctx: MyContext) {
  const isRu = ctx.from?.language_code === 'ru'

  // Фильтруем модели, исключая те, у которых есть 'dev' или 'image' в inputType
  const filteredModels = Object.values(imageModelPrices).filter(
    model =>
      !model.inputType.includes('dev') && model.inputType.includes('image')
  )

  // Если режим 'text_to_image', фильтруем модели, которые поддерживают 'text'
  const modelsForMenu =
    ctx.session.mode === 'text_to_image'
      ? filteredModels.filter(model => model.inputType.includes('text'))
      : filteredModels

  // Создаем массив кнопок на основе shortName отфильтрованных моделей
  const modelButtons = modelsForMenu.map(model =>
    Markup.button.text(model.shortName)
  )

  // Разбиваем кнопки на строки по 2 кнопки в каждой
  const keyboardButtons = []
  for (let i = 0; i < modelButtons.length; i += 2) {
    keyboardButtons.push(modelButtons.slice(i, i + 2))
  }

  // Добавляем кнопки "Отмена" и "Главное меню"
  keyboardButtons.push([
    Markup.button.text(isRu ? 'Отмена' : 'Cancel'),
    Markup.button.text(isRu ? '🏠 Главное меню' : '🏠 Main menu'),
  ])

  const keyboard = Markup.keyboard(keyboardButtons).resize()

  await ctx.reply(
    isRu
      ? '🎨 Выберите модель для генерации:'
      : '🎨 Choose a model for generation:',
    {
      reply_markup: keyboard.reply_markup,
    }
  )
}
