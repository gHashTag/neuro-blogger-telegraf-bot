import { Markup } from 'telegraf'
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram'

export function mainMenu(isRu: boolean): Markup.Markup<ReplyKeyboardMarkup> {
  console.log('CASE: mainMenu')
  return Markup.keyboard([
    [
      Markup.button.text(isRu ? '🎮 Начать обучение' : '🎮 Start learning'),
      Markup.button.text(isRu ? '🧠 Мозг аватара' : '🧠 Avatar Brain'),
    ],
    [
      Markup.button.text(
        isRu ? '🤖 Цифровое тело аватара' : '🤖 Digital Avatar Body'
      ),
      Markup.button.text(
        isRu ? '🖼️ Изображение из текста' : '🖼️ Text to Image'
      ),
    ],
    [
      Markup.button.text(isRu ? '🎥 Видео из текста' : '🎥 Text to Video'),
      Markup.button.text(isRu ? '📸 Нейрофото' : '📸 NeuroPhoto'),
    ],
    [
      Markup.button.text(isRu ? '🎥 Изображение в видео' : '🎥 Image to Video'),
      Markup.button.text(
        isRu ? '🔍 Описание из изображения' : '🔍 Image to Prompt'
      ),
    ],
    [
      Markup.button.text(isRu ? '📐 Изменить размер' : '📐 Change size'),
      Markup.button.text(isRu ? '🎤 Голос для аватара' : '🎤 Voice for Avatar'),
    ],
    [
      Markup.button.text(isRu ? '🎙️ Текст в голос' : '🎙️ Text to Voice'),
      Markup.button.text(isRu ? '🤖 Выбор модели ИИ' : '🤖 Select AI Model'),
    ],
    [Markup.button.text(isRu ? '💎 Пополнить баланс' : '💎 Top up balance')],
  ]).resize()
}
