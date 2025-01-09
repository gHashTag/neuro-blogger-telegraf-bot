import { Composer, Markup } from 'telegraf'
import { MyContext } from './interfaces'
import { imageModelMenu } from './menu/imageModelMenu'

import { balanceCommand } from './commands/balanceCommand'
import { menuCommand } from './commands/menuCommand'
import { generateImage } from './services/generateReplicateImage'
import { isRussian } from './helpers/language'

import { generateNeuroImage } from './services/generateNeuroImage'

import { mainMenu } from './menu'

import { handleSizeSelection } from './handlers'
import { imageModelPrices } from './price/models'

const myComposer = new Composer<MyContext>()

myComposer.hears(['🧠 Мозг аватара', '🧠 Avatar Brain'], async ctx => {
  console.log('CASE: Создать аватар')
  ctx.session.mode = 'avatar'

  await ctx.scene.enter('avatarWizard')
})

myComposer.hears(['Справка по команде', 'Help for the command'], async ctx => {
  console.log('CASE: Справка по команде')
  await ctx.scene.enter('helpCommand')
})

myComposer.hears(['🌟 Выбор модели ИИ', '🌟 Select AI Model'], async ctx => {
  console.log('CASE: Выбор модели ИИ')
  ctx.session.mode = 'select_model'
  await ctx.scene.enter('selectModelWizard')
})

myComposer.hears(
  ['🤖 Цифровое тело аватара', '🤖 Digital Avatar Body'],
  async ctx => {
    console.log('CASE: Цифровое тело аватара')
    ctx.session.mode = 'digital_avatar_body'
    await ctx.scene.enter('digitalAvatarBodyWizard')
  }
)

myComposer.hears(['📸 Нейрофото', '📸 NeuroPhoto'], async ctx => {
  console.log('CASE: Нейрофото')
  ctx.session.mode = 'neuro_photo'
  await ctx.scene.enter('neuroPhotoWizard')
})

myComposer.hears(['🎥 Видео из текста', '🎥 Text to Video'], async ctx => {
  console.log('CASE: Видео из текста')
  ctx.session.mode = 'text_to_video'
  await ctx.scene.enter('textToVideoWizard')
})

myComposer.hears(['🎥 Изображение в видео', '🎥 Image to Video'], async ctx => {
  console.log('CASE: Изображение в видео')
  ctx.session.mode = 'image_to_video'
  await ctx.scene.enter('imageToVideoWizard')
})

myComposer.hears(['🎙️ Текст в голос', '🎙️ Text to Voice'], async ctx => {
  console.log('CASE: Текст в голос')
  ctx.session.mode = 'text_to_speech'
  await ctx.scene.enter('textToSpeechWizard')
})

myComposer.hears(['🎤 Голос для аватара', '🎤 Voice for Avatar'], async ctx => {
  console.log('CASE: Голос для аватара')
  ctx.session.mode = 'voice'
  await ctx.scene.enter('voiceAvatarWizard')
})

myComposer.hears(
  ['🖼️ Изображение из текста', '🖼️ Text to Image'],
  async ctx => {
    console.log('CASE: Изображение из текста')
    ctx.session.mode = 'text_to_image'
    await imageModelMenu(ctx)
  }
)

myComposer.hears(
  ['🔍 Описание из изображения', '🔍 Image to Prompt'],
  async ctx => {
    console.log('CASE: Описание из изображения')
    ctx.session.mode = 'image_to_prompt'
    await ctx.scene.enter('imageToPromptWizard')
  }
)

myComposer.hears(['👥 Пригласить друга', '👥 Invite a friend'], async ctx => {
  console.log('CASE: Пригласить друга')
  ctx.session.mode = 'invite'
  await ctx.scene.enter('inviteCommand')
})

myComposer.hears(['❓ Помощь', '❓ Help'], async ctx => {
  console.log('CASE: Помощь')
  ctx.session.mode = 'help'
  await ctx.scene.enter('neuroQuestCommand')
})

myComposer.hears(['🎮 Начать обучение', '🎮 Start learning'], async ctx => {
  console.log('CASE: Начать обучение')
  ctx.session.mode = 'start_learning'
  await ctx.scene.enter('step0')
})

myComposer.hears(['💎 Пополнить баланс', '💎 Top up balance'], async ctx => {
  console.log('CASE: Пополнить баланс')
  ctx.session.mode = 'top_up_balance'
  await ctx.scene.enter('paymentScene')
})

myComposer.hears(['🤑 Баланс', '🤑 Balance'], async ctx => {
  console.log('CASE: Баланс')
  ctx.session.mode = 'balance'
  await balanceCommand(ctx)
})

myComposer.hears(['🏠 Главное меню', '🏠 Main menu'], async ctx => {
  console.log('CASE: Главное меню')
  ctx.session.mode = 'main_menu'
  await menuCommand(ctx)
})

myComposer.hears(['1️⃣', '2️⃣', '3️⃣', '4️⃣'], async ctx => {
  const text = ctx.message.text
  console.log(`CASE: Нажата кнопка ${text}`)
  const isRu = isRussian(ctx)
  const prompt = ctx.session.prompt
  const userId = ctx.from.id
  const numImages = parseInt(text[0])
  ctx.session.mode = 'text_to_image'
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
      await generateImage(
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

myComposer.hears(['⬆️ Улучшить промпт', '⬆️ Improve prompt'], async ctx => {
  console.log('CASE: Улучшить промпт')

  await ctx.scene.enter('improvePromptWizard')
})

myComposer.hears(['📐 Изменить размер', '📐 Change size'], async ctx => {
  console.log('CASE: Изменить размер')

  await ctx.scene.enter('sizeWizard')
})

myComposer.hears(
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

myComposer.hears(
  ['🎥 Сгенерировать новое видео', '🎥 Generate new video'],
  async ctx => {
    console.log('CASE: Сгенерировать новое видео')
    if (ctx.session.mode === 'image_to_video') {
      await ctx.scene.enter('imageToVideoWizard')
    } else if (ctx.session.mode === 'text_to_video') {
      await ctx.scene.enter('textToVideoWizard')
    } else {
      await ctx.reply(
        'Вы не можете сгенерировать новое видео, так как не выбрали изображение'
      )
    }
  }
)

myComposer.hears(
  Object.values(imageModelPrices).map(model => model.shortName),
  async ctx => {
    console.log('CASE: Выбор модели')
    if (!ctx.message) {
      throw new Error('No message')
    }
    const isRu = isRussian(ctx)
    const model = ctx.message.text
    console.log(model, 'model')
    ctx.session.selectedModel = model

    await ctx.reply(
      isRu ? `Вы выбрали модель: ${model}` : `You selected model: ${model}`,
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    )

    await ctx.scene.enter('textToImageWizard')
  }
)

myComposer.hears(['Отмена', 'Cancel'], async ctx => {
  console.log('CASE: Отмена')
  if (ctx.session.mode === 'image_to_video') {
    await ctx.scene.enter('cancelPredictionsWizard')
  } else {
    const isRu = isRussian(ctx)
    mainMenu(isRu)
  }
})

export default myComposer
