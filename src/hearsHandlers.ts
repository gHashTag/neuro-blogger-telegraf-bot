import { imageModelMenu } from './menu/imageModelMenu'

import { balanceCommand } from './commands/balanceCommand'
import { generateTextToImage } from './services/generateTextToImage'
import { isRussian } from './helpers/language'

import { generateNeuroImage } from './services/generateNeuroImage'

import { handleSizeSelection } from './handlers'
import { levels, mainMenu } from './menu'
import { getReferalsCountAndUserData } from './core/supabase'
import { composer } from './bot'

composer.hears([levels[1].title_ru, levels[1].title_en], async ctx => {
  console.log('CASE: 🤖 Цифровое тело')
  ctx.session.mode = 'digital_avatar_body'
  await ctx.scene.enter('digitalAvatarBodyWizard')
})

composer.hears([levels[2].title_ru, levels[2].title_en], async ctx => {
  console.log('CASE: 📸 Нейрофото')
  ctx.session.mode = 'neuro_photo'
  await ctx.scene.enter('neuroPhotoWizard')
})

composer.hears([levels[3].title_ru, levels[3].title_en], async ctx => {
  console.log('CASE: 🔍 Промпт из фото')
  ctx.session.mode = 'image_to_prompt'
  await ctx.scene.enter('imageToPromptWizard')
})

composer.hears([levels[4].title_ru, levels[4].title_en], async ctx => {
  console.log('CASE: 🧠 Мозг аватара')
  ctx.session.mode = 'avatar'

  await ctx.scene.enter('avatarWizard')
})

composer.hears([levels[5].title_ru, levels[5].title_en], async ctx => {
  console.log('CASE: 💭 Чат с аватаром')
  ctx.session.mode = 'chat_with_avatar'
  await ctx.scene.enter('chatWithAvatarWizard')
})

composer.hears([levels[6].title_ru, levels[6].title_en], async ctx => {
  console.log('CASE: 🤖 Выбор модели ИИ')
  ctx.session.mode = 'select_model'
  await ctx.scene.enter('selectModelWizard')
})

composer.hears([levels[7].title_ru, levels[7].title_en], async ctx => {
  console.log('CASE: 🎤 Голос аватара')
  ctx.session.mode = 'voice'
  await ctx.scene.enter('voiceAvatarWizard')
})

composer.hears([levels[8].title_ru, levels[8].title_en], async ctx => {
  console.log('CASE: 🎙️ Текст в голос')
  ctx.session.mode = 'text_to_speech'
  await ctx.scene.enter('textToSpeechWizard')
})

composer.hears([levels[9].title_ru, levels[9].title_en], async ctx => {
  console.log('CASE: 🎥 Фото в видео')
  ctx.session.mode = 'image_to_video'
  await ctx.scene.enter('imageToVideoWizard')
})

composer.hears([levels[10].title_ru, levels[10].title_en], async ctx => {
  console.log('CASE: 🎥 Видео из текста')
  ctx.session.mode = 'text_to_video'
  await ctx.scene.enter('textToVideoWizard')
})

composer.hears([levels[11].title_ru, levels[11].title_en], async ctx => {
  console.log('CASE: 🖼️ Текст в фото')
  ctx.session.mode = 'text_to_image'
  await ctx.scene.enter('textToImageWizard')
  await imageModelMenu(ctx)
})

composer.hears(['🎤 Синхронизация губ', '🎤 Lip Sync'], async ctx => {
  console.log('CASE: Синхронизация губ')
  ctx.session.mode = 'lip_sync'
  await ctx.scene.enter('lipSyncWizard')
})

composer.hears(['❓ Помощь', '❓ Help'], async ctx => {
  console.log('CASE: Помощь')
  ctx.session.mode = 'help'
  await ctx.scene.enter('helpScene')
})

composer.hears([levels[99].title_ru, levels[99].title_en], async ctx => {
  console.log('CASE: Начать обучение')
  ctx.session.mode = 'start_learning'
  await ctx.scene.enter('step0')
})

composer.hears([levels[100].title_ru, levels[100].title_en], async ctx => {
  console.log('CASE: Пополнить баланс')
  ctx.session.mode = 'top_up_balance'
  ctx.session.subscription = 'stars'
  await ctx.scene.enter('paymentScene')
})

composer.hears([levels[101].title_ru, levels[101].title_en], async ctx => {
  console.log('CASE: Баланс')
  ctx.session.mode = 'balance'
  await balanceCommand(ctx)
})

composer.hears([levels[102].title_ru, levels[102].title_en], async ctx => {
  console.log('CASE: Пригласить друга')
  ctx.session.mode = 'invite'
  await ctx.scene.enter('inviteScene')
})

composer.hears(['🏠 Главное меню', '🏠 Main menu'], async ctx => {
  console.log('CASE: Главное меню')
  ctx.session.mode = 'main_menu'
  await ctx.scene.enter('menuScene')
})

composer.hears(['1️⃣', '2️⃣', '3️⃣', '4️⃣'], async ctx => {
  const text = ctx.message.text
  console.log(`CASE: Нажата кнопка ${text}`)
  const isRu = isRussian(ctx)
  const prompt = ctx.session.prompt
  const userId = ctx.from.id
  const numImages = parseInt(text[0])
  console.log('ctx.session.mode', ctx.session.mode)
  // ctx.session.mode = 'text_to_image'
  const generate = async (num: number) => {
    if (ctx.session.mode === 'neuro_photo') {
      await generateNeuroImage(
        prompt,
        ctx.session.userModel.model_url,
        num,
        userId,
        ctx
      )
    } else {
      await generateTextToImage(
        prompt,
        ctx.session.selectedModel || '',
        num,
        userId,
        isRu,
        ctx
      )
    }
  }

  if (numImages >= 1 && numImages <= 4) {
    await generate(numImages)
  } else {
    await ctx.reply('Неизвестная кнопка')
  }
})

composer.hears(
  ['🎥 Сгенерировать новое видео?', '🎥 Generate new video?'],
  async ctx => {
    console.log('CASE: Сгенерировать новое видео')
    const mode = ctx.session.mode
    console.log('mode', mode)
    if (mode === 'text_to_video') {
      await ctx.scene.enter('textToVideoWizard')
    } else if (mode === 'image_to_video') {
      await ctx.scene.enter('imageToVideoWizard')
    } else {
      await ctx.reply(
        isRussian(ctx)
          ? 'Вы не можете сгенерировать новое видео в этом режиме'
          : 'You cannot generate a new video in this mode'
      )
    }
  }
)

composer.hears(['⬆️ Улучшить промпт', '⬆️ Improve prompt'], async ctx => {
  console.log('CASE: Улучшить промпт')

  await ctx.scene.enter('improvePromptWizard')
})

composer.hears(['📐 Изменить размер', '📐 Change size'], async ctx => {
  console.log('CASE: Изменить размер')

  await ctx.scene.enter('sizeWizard')
})

composer.hears(
  [
    '21:9',
    '16:9',
    '3:2',
    '4:3',
    '5:4',
    '1:1',
    '4:5',
    '3:4',
    '2:3',
    '9:16',
    '9:21',
  ],
  async ctx => {
    console.log('CASE: Изменить размер')
    const size = ctx.message.text
    await handleSizeSelection(ctx, size)
  }
)

composer.hears(
  ['🎥 Сгенерировать новое видео', '🎥 Generate new video'],
  async ctx => {
    console.log('CASE: Сгенерировать новое видео')
    ctx.session.mode = 'text_to_video'
    await ctx.scene.enter('textToVideoWizard')
  }
)

composer.hears(/^(Отмена|отмена|Cancel|cancel)$/i, async ctx => {
  console.log('CASE: Отмена')
  const isRu = isRussian(ctx)
  const telegram_id = ctx.from?.id?.toString() || ''
  const { count, subscription } = await getReferalsCountAndUserData(telegram_id)
  await mainMenu({ isRu, inviteCount: count, subscription })
  return ctx.scene.leave()
})

composer.hears(['Справка по команде', 'Help for the command'], async ctx => {
  console.log('CASE: Справка по команде')
  await ctx.scene.enter('helpScene')
})
