import { Scenes } from 'telegraf'
import { sendGenericErrorMessage } from '@/menu'
import { MyContext, Subscription } from '../../interfaces'
import { levels, mainMenu } from '../../menu/mainMenu'
import { getReferalsCountAndUserData } from '@/core/supabase/getReferalsCountAndUserData'
import { isDev, isRussian } from '@/helpers'
import { handleMenu } from './handleMenu'
import { getText } from './getText'
import { sendReplyWithKeyboard } from './sendReplyWithKeyboard'

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
        newSubscription = 'neurobase'
      } else {
        const { count, subscription } = await getReferalsCountAndUserData(
          telegram_id
        )

        newCount = count
        newSubscription = subscription
      }

      const menu = await mainMenu({
        isRu,
        inviteCount: newCount,
        subscription: newSubscription,
      })

      console.log('menu', menu)
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

      const inlineKeyboard = [
        ...(newCount > 1
          ? [
              [
                {
                  text: isRu ? '🚀 Открыть нейроквест' : '🚀 Open neuroquest',
                  web_app: {
                    url,
                  },
                },
              ],
            ]
          : []),
      ]

      console.log('nameStep', nameStep)

      const hasFullAccess = [
        'neurophoto',
        'neurobase',
        'neuromeeting',
        'neuroblogger',
        'neurotester',
      ].includes(newSubscription)

      let message = ''
      if (!hasFullAccess) {
        message = getText(isRu, 'digitalAvatar')
        await sendReplyWithKeyboard(ctx, message, inlineKeyboard, menu)
      } else if (
        nameStep === (isRu ? levels[2].title_ru : levels[2].title_en)
      ) {
        message = getText(isRu, 'neurophoto', newCount)
        await sendReplyWithKeyboard(ctx, message, inlineKeyboard, menu)
      } else if (newCount > 2 && newCount <= 10) {
        message = getText(isRu, 'avatarLevel', newCount)
        await sendReplyWithKeyboard(ctx, message, inlineKeyboard, menu)
        if (newCount > 1) {
          await ctx.reply(getText(isRu, 'inviteLink'), menu)
          const botUsername = ctx.botInfo.username

          const linkText = `<a href="https://t.me/${botUsername}?start=${telegram_id}">https://t.me/${botUsername}?start=${telegram_id}</a>`

          await ctx.reply(linkText, { parse_mode: 'HTML' })
        } else {
          const message = getText(isRu, 'mainMenu')
          await ctx.reply(message, menu)
        }

        return ctx.wizard.next()
      } else {
        const message = getText(isRu, 'mainMenu')
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
      console.log('text 1', text)
      if (text === 'unlock_features') {
        console.log('CASE: 🔓 Разблокировать все функции')
        await ctx.scene.enter('subscriptionScene')
      }
    } else if ('message' in ctx.update && 'text' in ctx.update.message) {
      const text = ctx.update.message.text
      console.log('text 2', text)
      handleMenu(ctx, text)
    } else {
      console.log('CASE: menuScene.next.else', ctx)
      return ctx.scene.leave()
    }
    return ctx.scene.leave()
  }
)
