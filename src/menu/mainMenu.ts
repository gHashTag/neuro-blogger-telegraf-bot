import { Markup } from 'telegraf'
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram'

interface Level {
  title_ru: string
  title_en: string
}

export const levels: Record<number, Level> = {
  1: {
    title_ru: '🧠 Мозг аватара',
    title_en: '🧠 Avatar Brain',
  },
  2: {
    title_ru: '💭 Чат с аватаром',
    title_en: '💭 Chat with avatar',
  },
  3: {
    title_ru: '🤖 Выбор модели ИИ',
    title_en: '🤖 Choose AI Model',
  },
  4: {
    title_ru: '🤖 Цифровое тело',
    title_en: '🤖 Digital Body',
  },
  5: {
    title_ru: '📸 Нейрофото',
    title_en: '📸 NeuroPhoto',
  },
  6: {
    title_ru: '🔍 Промпт из фото',
    title_en: '🔍 Prompt from Photo',
  },
  7: {
    title_ru: '🎤 Голос аватара',
    title_en: '🎤 Avatar Voice',
  },
  8: {
    title_ru: '🎙️ Текст в голос',
    title_en: '🎙️ Text to Voice',
  },
  9: {
    title_ru: '🎥 Фото в видео',
    title_en: '🎥 Photo to Video',
  },
  10: {
    title_ru: '🎥 Видео из текста',
    title_en: '🎥 Text to Video',
  },
  11: {
    title_ru: '🖼️ Текст в фото',
    title_en: '🖼️ Text to Image',
  },
  99: {
    title_ru: '🎮 Начать обучение',
    title_en: '🎮 Start learning',
  },
  100: {
    title_ru: '💎 Пополнить баланс',
    title_en: '💎 Top up balance',
  },
  101: {
    title_ru: '🤑 Баланс',
    title_en: '🤑 Balance',
  },
  102: {
    title_ru: '👥 Пригласить друга',
    title_en: '👥 Invite a friend',
  },
}

export async function mainMenu(
  isRu: boolean,
  inviteCount: number,
  vip = false
): Promise<Markup.Markup<ReplyKeyboardMarkup>> {
  console.log('CASE: mainMenu')

  const availableLevels = Object.keys(levels)
    .filter(level => vip || parseInt(level) <= inviteCount)
    .map(level => levels[parseInt(level)])

  const buttons = availableLevels.map(level =>
    Markup.button.text(isRu ? level.title_ru : level.title_en)
  )

  // Разбиваем кнопки на строки по две кнопки
  const buttonRows = []
  for (let i = 0; i < buttons.length; i += 2) {
    buttonRows.push(buttons.slice(i, i + 2))
  }

  // Добавляем дополнительные кнопки в конце
  buttonRows.push([
    Markup.button.text(isRu ? '💎 Пополнить баланс' : '💎 Top up balance'),
    // Markup.button.text(isRu ? '🎮 Начать обучение' : '🎮 Start learning'),
  ])

  return Markup.keyboard(buttonRows).resize()
}
