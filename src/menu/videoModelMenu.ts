import { Markup } from 'telegraf'

// Создаем клавиатуру для выбора модели
export const videoModelKeyboard = (isRu: boolean) =>
  Markup.keyboard([
    [
      Markup.button.text(isRu ? 'Minimax' : 'Minimax'),
      Markup.button.text(isRu ? 'Haiper' : 'Haiper'),
    ],
    [
      Markup.button.text(isRu ? 'Ray' : 'Ray'),
      Markup.button.text(isRu ? 'I2VGen-XL' : 'I2VGen-XL'),
    ],
    [Markup.button.text(isRu ? 'Отмена' : 'Cancel')],
  ])
