import { Scenes } from 'telegraf'
import { sendGenericErrorMessage } from '@/menu'
import { MyContext, Subscription } from '../../interfaces'
import { levels, mainMenu } from '../../menu/mainMenu'
import { getReferalsCount } from '@/core/supabase/getReferalsCount'
import { isDev, isRussian } from '@/helpers'
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram'

export const menuScene = new Scenes.WizardScene<MyContext>(
  'menuScene',
  async ctx => {
    console.log('CASE: menuCommand')
    const isRu = isRussian(ctx)
    try {
      console.log('CASE: menu')
      const telegram_id = ctx.from?.id?.toString() || ''
      let newCount = 0
      let newSubscription: Subscription = 'stars'

      if (isDev) {
        newCount = 0
        newSubscription = 'stars'
      } else {
        const { count, subscription } = await getReferalsCount(telegram_id)
        console.log('count', count)
        console.log('subscription', subscription)
        newCount = count
        newSubscription = subscription
      }

      const menu = await mainMenu(isRu, newCount, newSubscription)

      const url = `https://neuro-blogger-web-u14194.vm.elestio.app/neuro_sage/1/1/1/1/1/${
        newCount + 1
      }`

      const nextLevel = levels[newCount + 1]
      const nameStep = nextLevel
        ? isRu
          ? nextLevel.title_ru
          : nextLevel.title_en
        : isRu
        ? 'Неизвестный уровень'
        : 'Unknown level'

      console.log('nameStep', nameStep)

      if (newCount <= 10) {
        const message = isRu
          ? `🚀 Чтобы разблокировать следующий уровень аватара и получить доступ к функции: <b>${nameStep}</b>, пригласите друга! 🌟\n\n🆔 Уровень вашего аватара: ${
              newCount + 1
            } \n\n🤖 Чтобы начать пользоваться ботом нажмите команду /menu\n\n🔓 Хотите разблокировать все функции?\n💳 Оформите подписку, чтобы получить полный доступ!`
          : `🚀 To unlock the next level of the avatar and gain access to new features, invite friend! 🌟\n\n🆔 Level your avatar: ${
              newCount + 1
            } invitations \n\n🤖 To start using the bot, click the /menu command\n\n🔓 Want to unlock all features?\n💳 Subscribe to get full access!`

        const inlineKeyboard = [
          [
            {
              text: isRu ? '🚀 Открыть нейроквест' : '🚀 Open neuroquest',
              web_app: {
                url,
              },
            },
          ],
          [
            {
              text: isRu
                ? '🔓 Разблокировать все функции'
                : '🔓 Unlock all features',
              callback_data: 'unlock_features',
            },
          ],
        ]

        // Отправка сообщения с клавиатурой
        await ctx.reply(message, {
          reply_markup: {
            inline_keyboard: inlineKeyboard as InlineKeyboardButton[][],
          },
          parse_mode: 'HTML',
        })

        await ctx.reply(
          isRu
            ? `Ссылка для приглашения друзей 👇🏻`
            : `Invite link for friends 👇🏻`,
          menu
        )
        const botUsername = ctx.botInfo.username

        const linkText = `<a href="https://t.me/${botUsername}?start=${telegram_id}">https://t.me/${botUsername}?start=${telegram_id}</a>`

        await ctx.reply(linkText, { parse_mode: 'HTML' })
        return ctx.wizard.next()
      } else {
        const message = isRu
          ? '🏠 Главное меню\nВыберите нужный раздел 👇'
          : '🏠 Main menu\nChoose the section 👇'
        await ctx.reply(message, menu)
        return ctx.wizard.next()
      }
    } catch (error) {
      console.error('Error in menu command:', error)
      await sendGenericErrorMessage(ctx, isRu, error)
      throw error
    }
  },
  async ctx => {
    console.log('CASE 1: menuScene.next')
    if ('callback_query' in ctx.update && 'data' in ctx.update.callback_query) {
      const text = ctx.update.callback_query.data
      console.log('text', text)
      if (text === 'unlock_features') {
        console.log('CASE: 🔓 Разблокировать все функции')
        await ctx.scene.enter('subscriptionScene')
      }
    } else if ('message' in ctx.update && 'text' in ctx.update.message) {
      const text = ctx.update.message.text
      console.log('text', text)
      handleMenu(ctx, text)
    } else {
      console.log('CASE: menuScene.next.else', ctx)
      return ctx.scene.leave()
    }
    return ctx.scene.leave()
  }
)

const handleMenu = async (ctx: MyContext, text: string) => {
  const isRu = isRussian(ctx)
  if (text === (isRu ? levels[103].title_ru : levels[103].title_en)) {
    console.log('CASE: 💵 Оформление подписки')
    await ctx.scene.enter('subscriptionScene')
  } else if (text === (isRu ? levels[2].title_ru : levels[2].title_en)) {
    console.log('CASE: 💭 Чат с аватаром')
    await ctx.scene.enter('chatWithAvatarWizard')
  } else if (text === (isRu ? levels[3].title_ru : levels[3].title_en)) {
    console.log('CASE: 🤖 Выбор модели ИИ')
    await ctx.scene.enter('selectModelWizard')
  } else if (text === (isRu ? levels[4].title_ru : levels[4].title_en)) {
    console.log('CASE: 🤖 Цифровое тело')
    await ctx.scene.enter('digitalAvatarBodyWizard')
  } else if (text === (isRu ? levels[5].title_ru : levels[5].title_en)) {
    console.log('CASE: 📸 Нейрофото')
    await ctx.scene.enter('neuroPhotoWizard')
  } else if (text === (isRu ? levels[6].title_ru : levels[6].title_en)) {
    console.log('CASE: 🔍 Промпт из фото')
    await ctx.scene.enter('promptFromPhotoWizard')
  } else if (text === (isRu ? levels[7].title_ru : levels[7].title_en)) {
    console.log('CASE: 🎤 Голос аватара')
    await ctx.scene.enter('voiceAvatarWizard')
  } else if (text === (isRu ? levels[8].title_ru : levels[8].title_en)) {
    console.log('CASE: 🎙️ Текст в голос')
    await ctx.scene.enter('textToSpeechWizard')
  } else if (text === (isRu ? levels[9].title_ru : levels[9].title_en)) {
    console.log('CASE: 🎥 Фото в видео')
    await ctx.scene.enter('imageToVideoWizard')
  } else if (text === (isRu ? levels[10].title_ru : levels[10].title_en)) {
    console.log('CASE: �� Видео из текста')
    await ctx.scene.enter('textToVideoWizard')
  } else if (text === (isRu ? levels[11].title_ru : levels[11].title_en)) {
    console.log('CASE: 🖼️ Текст в фото')
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
  }
}
