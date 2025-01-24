import { Scenes } from 'telegraf'
import { sendGenericErrorMessage } from '@/menu'
import { MyContext } from '../../interfaces'
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
      let newVip = false

      if (isDev) {
        newCount = 1
        newVip = false
      } else {
        const { count, vip } = await getReferalsCount(telegram_id)
        newCount = count
        newVip = vip
      }

      const menu = await mainMenu(isRu, newCount, newVip)

      const url = `https://neuro-blogger-web-u14194.vm.elestio.app/neuro_sage/1/1/1/1/1/${
        newCount + 1
      }`

      const nameStep = isRu
        ? levels[newCount + 1].title_ru
        : levels[newCount + 1].title_en

      if (newCount <= 10) {
        const message = isRu
          ? `🚀 Чтобы разблокировать следующий уровень аватара и получить доступ к функции: <b>${nameStep}</b>, пригласите друга! 🌟\n\n🆔 Уровень вашего аватара: ${newCount} \n\n🤖 Чтобы начать пользоваться ботом нажмите команду /menu\n\n🔓 Хотите разблокировать все функции?\n💳 Оформите подписку, чтобы получить полный доступ!`
          : `🚀 To unlock the next level of the avatar and gain access to new features, invite friend! 🌟\n\n🆔 Level your avatar: ${newCount} invitations \n\n🤖 To start using the bot, click the /menu command\n\n🔓 Want to unlock all features?\n💳 Subscribe to get full access!`

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
    console.log('CASE: menuScene.next')
    if ('callback_query' in ctx.update && 'data' in ctx.update.callback_query) {
      const text = ctx.update.callback_query.data
      console.log('text', text)
      if (text === 'unlock_features') {
        console.log('CASE: 🔓 Разблокировать все функции')
        await ctx.scene.enter('subscriptionScene')
      }
    } else {
      return ctx.scene.leave()
    }
  }
)
