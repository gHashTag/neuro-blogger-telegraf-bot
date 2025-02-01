import { Subscription } from '@/interfaces/supabase.interface'
import { Markup } from 'telegraf'
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram'

interface Level {
  title_ru: string
  title_en: string
}

export const levels: Record<number, Level> = {
  0: {
    title_ru: '💫 Оформить подписку',
    title_en: '💫 Subscribe',
  },
  // digitalAvatarBodyWizard
  1: {
    title_ru: '🤖 Цифровое тело',
    title_en: '🤖 Digital Body',
  },
  // neuroPhotoWizard
  2: {
    title_ru: '📸 Нейрофото',
    title_en: '📸 NeuroPhoto',
  },
  // imageToPromptWizard
  3: {
    title_ru: '🔍 Промпт из фото',
    title_en: '🔍 Prompt from Photo',
  },
  // avatarWizard
  4: {
    title_ru: '🧠 Мозг аватара',
    title_en: '🧠 Avatar Brain',
  },
  // chatWithAvatarWizard
  5: {
    title_ru: '💭 Чат с аватаром',
    title_en: '💭 Chat with avatar',
  },
  // selectModelWizard
  6: {
    title_ru: '🤖 Выбор модели ИИ',
    title_en: '🤖 Choose AI Model',
  },
  // voiceAvatarWizard
  7: {
    title_ru: '🎤 Голос аватара',
    title_en: '🎤 Avatar Voice',
  },
  // textToSpeechWizard
  8: {
    title_ru: '🎙️ Текст в голос',
    title_en: '🎙️ Text to Voice',
  },
  // imageToVideoWizard
  9: {
    title_ru: '🎥 Фото в видео',
    title_en: '🎥 Photo to Video',
  },
  // textToVideoWizard
  10: {
    title_ru: '🎥 Видео из текста',
    title_en: '🎥 Text to Video',
  },
  // textToImageWizard
  11: {
    title_ru: '🖼️ Текст в фото',
    title_en: '🖼️ Text to Image',
  },
  // step0
  99: {
    title_ru: '🎮 Начать обучение',
    title_en: '🎮 Start learning',
  },
  // paymentScene
  100: {
    title_ru: '💎 Пополнить баланс',
    title_en: '💎 Top up balance',
  },
  // balanceCommand
  101: {
    title_ru: '🤑 Баланс',
    title_en: '🤑 Balance',
  },
  // inviteCommand
  102: {
    title_ru: '👥 Пригласить друга',
    title_en: '👥 Invite a friend',
  },
  // helpCommand
  103: {
    title_ru: '❓ Помощь',
    title_en: '❓ Help',
  },
  104: {
    title_ru: '🏠 Главное меню',
    title_en: '🏠 Main menu',
  },
}

export async function mainMenu(
  isRu: boolean,
  inviteCount: number,
  subscription: Subscription
): Promise<Markup.Markup<ReplyKeyboardMarkup>> {
  console.log('CASE: mainMenu')
  console.log('inviteCount', inviteCount)
  console.log('subscription', subscription)

  // Определяем, имеет ли пользователь доступ ко всем уровням
  const hasFullAccess = [
    'neurobase',
    'neuromeeting',
    'neuroblogger',
    'neurotester',
  ].includes(subscription)

  const availableLevels = Object.keys(levels)
    .filter(
      level =>
        (hasFullAccess || parseInt(level) <= inviteCount) && level !== '103'
    )
    .map(level => levels[parseInt(level)])
  console.log('availableLevels', availableLevels)

  const helpButton = isRu ? levels[103].title_ru : levels[103].title_en

  if (availableLevels.length === 0) {
    console.warn(
      'No available levels for the current invite count and subscription status.'
    )
    return Markup.keyboard([[Markup.button.text(helpButton)]]).resize()
  }

  const buttons = availableLevels.map(level =>
    Markup.button.text(isRu ? level.title_ru : level.title_en)
  )
  console.log('buttons', buttons)

  // Разбиваем кнопки на строки по две кнопки
  const buttonRows = []
  for (let i = 0; i < buttons.length; i += 2) {
    buttonRows.push(buttons.slice(i, i + 2))
  }

  // Добавляем дополнительные кнопки в конце
  buttonRows.push([Markup.button.text(helpButton)])

  return Markup.keyboard(buttonRows).resize()
}
