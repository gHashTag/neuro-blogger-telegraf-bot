import { levels } from '@/menu/mainMenu'

import { MyContext } from '@/interfaces'
import { isRussian } from '@/helpers/language'

export const handleMenu = async (ctx: MyContext, text: string) => {
  console.log('CASE:handleMenu', text)
  const isRu = isRussian(ctx)
  if (text === (isRu ? levels[0].title_ru : levels[0].title_en)) {
    console.log('CASE: 💵 Оформление подписки')
    ctx.session.mode = 'subscribe'
    await ctx.scene.enter('subscriptionScene')
  } else if (text === (isRu ? levels[1].title_ru : levels[1].title_en)) {
    console.log('CASE: 🤖 Цифровое тело')
    ctx.session.mode = 'digital_avatar_body'
    await ctx.scene.enter('digitalAvatarBodyWizard')
  } else if (text === (isRu ? levels[2].title_ru : levels[2].title_en)) {
    console.log('CASE: 💭 Чат с аватаром')
    ctx.session.mode = 'chat_with_avatar'
    await ctx.scene.enter('chatWithAvatarWizard')
  } else if (text === (isRu ? levels[3].title_ru : levels[3].title_en)) {
    console.log('CASE: 🤖 Выбор модели ИИ')
    ctx.session.mode = 'select_model'
    await ctx.scene.enter('selectModelWizard')
  } else if (text === (isRu ? levels[4].title_ru : levels[4].title_en)) {
    console.log('CASE: 🤖 Цифровое тело')
    ctx.session.mode = 'digital_avatar_body'
    await ctx.scene.enter('digitalAvatarBodyWizard')
  } else if (text === (isRu ? levels[5].title_ru : levels[5].title_en)) {
    console.log('CASE: 📸 Нейрофото')
    ctx.session.mode = 'neuro_photo'
    await ctx.scene.enter('neuroPhotoWizard')
  } else if (text === (isRu ? levels[6].title_ru : levels[6].title_en)) {
    console.log('CASE: 🔍 Промпт из фото')
    ctx.session.mode = 'image_to_prompt'
    await ctx.scene.enter('promptFromPhotoWizard')
  } else if (text === (isRu ? levels[7].title_ru : levels[7].title_en)) {
    console.log('CASE: 🎤 Голос аватара')
    ctx.session.mode = 'voice'
    await ctx.scene.enter('voiceAvatarWizard')
  } else if (text === (isRu ? levels[8].title_ru : levels[8].title_en)) {
    console.log('CASE: 🎙️ Текст в голос')
    ctx.session.mode = 'text_to_speech'
    await ctx.scene.enter('textToSpeechWizard')
  } else if (text === (isRu ? levels[9].title_ru : levels[9].title_en)) {
    console.log('CASE: 🎥 Фото в видео')
    ctx.session.mode = 'image_to_video'
    await ctx.scene.enter('imageToVideoWizard')
  } else if (text === (isRu ? levels[10].title_ru : levels[10].title_en)) {
    console.log('CASE:  Видео из текста')
    ctx.session.mode = 'text_to_video'
    await ctx.scene.enter('textToVideoWizard')
  } else if (text === (isRu ? levels[11].title_ru : levels[11].title_en)) {
    console.log('CASE: 🖼️ Текст в фото')
    ctx.session.mode = 'text_to_image'
    await ctx.scene.enter('textToImageWizard')
  } else if (text === (isRu ? levels[99].title_ru : levels[99].title_en)) {
    console.log('CASE: 🎮 Начать обучение')
    await ctx.scene.enter('step0')
  } else if (text === (isRu ? levels[100].title_ru : levels[100].title_en)) {
    console.log('CASE: 💎 Пополнить баланс')
    await ctx.scene.enter('paymentScene')
  } else if (text === (isRu ? levels[101].title_ru : levels[101].title_en)) {
    console.log('CASE: 🤑 Баланс')
    await ctx.scene.enter('balanceCommand')
  } else if (text === (isRu ? levels[102].title_ru : levels[102].title_en)) {
    console.log('CASE: 👥 Пригласить друга')
    await ctx.scene.enter('inviteCommand')
  } else if (text === (isRu ? levels[103].title_ru : levels[103].title_en)) {
    console.log('CASE: ❓ Помощь')
    await ctx.scene.enter('step0')
  } else if (text === (isRu ? levels[104].title_ru : levels[104].title_en)) {
    console.log('CASE: 🏠 Главное меню')
    await ctx.scene.enter('menuScene')
  } else {
    console.log('CASE: menuScene.handleMenu.else', text)
    await ctx.scene.enter('menuScene')
  }
}
