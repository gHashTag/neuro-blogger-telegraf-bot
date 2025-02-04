import { MyContext, Subscription } from '../../interfaces'
import { sendGenericErrorMessage } from '@/menu'
import { levels, mainMenu } from '../../menu/mainMenu'
import { getReferalsCountAndUserData } from '@/core/supabase/getReferalsCountAndUserData'
import { isDev, isRussian } from '@/helpers'
import { sendReplyWithKeyboard } from './sendReplyWithKeyboard'
import { getText } from './getText'
import { handleMenu } from './handleMenu'

export const handleMenuCommand = async (ctx: MyContext): Promise<void> => {
  console.log('CASE: menuCommand')
  const isRu = isRussian(ctx)
  try {
    const telegram_id = ctx.from?.id?.toString() || ''
    let newCount = 0
    let newSubscription: Subscription = 'stars'

    if (isDev) {
      newCount = 0
      newSubscription = 'neurophoto'
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
                web_app: { url },
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

    switch (true) {
      case !hasFullAccess: {
        console.log('CASE: !hasFullAccess')
        message = getText(isRu, 'digitalAvatar')
        const photo_url =
          'https://yuukfqcsdhkyxegfwlcb.supabase.co/storage/v1/object/public/landingpage/avatars/neuro_sage/neuroblogger.jpg'
        await sendReplyWithKeyboard(
          ctx,
          message,
          inlineKeyboard,
          menu,
          photo_url
        )
        break
      }

      case nameStep === (isRu ? levels[2].title_ru : levels[2].title_en): {
        console.log(
          'CASE: nameStep === (isRu ? levels[2].title_ru : levels[2].title_en)'
        )
        message = getText(isRu, 'neurophoto', newCount)
        await sendReplyWithKeyboard(ctx, message, inlineKeyboard, menu)
        break
      }

      case newCount > 2 && newCount <= 10: {
        console.log('CASE: newCount > 2 && newCount <= 10')
        message = getText(isRu, 'avatarLevel', newCount)

        // Создаем клавиатуру с кнопкой для приглашения
        const inlineKeyboardWithInvite = [
          ...inlineKeyboard,
          [{ text: getText(isRu, 'inviteLink'), callback_data: 'invite' }],
        ]

        // Отправляем сообщение с клавиатурой
        await sendReplyWithKeyboard(
          ctx,
          message,
          inlineKeyboardWithInvite,
          menu
        )
        console.log('ctx.wizard.next()')
        ctx.scene.leave()
        break
      }

      default: {
        console.log('CASE: default')
        const message = getText(isRu, 'mainMenu')
        await ctx.reply(message, menu)
        ctx.scene.leave()
        break
      }
    }
    return
  } catch (error) {
    console.error('Error in menu command:', error)
    await sendGenericErrorMessage(ctx, isRu, error)
    throw error
  }
}

export const handleMenuNext = async (ctx: MyContext): Promise<void> => {
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
