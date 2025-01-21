import { Markup, Scenes } from 'telegraf'
import { MyContext } from '@/interfaces'
import { handleBuyRobokassa } from '@/handlers/handleBuyRobokassa'
import { isRussian } from '@/helpers'

import { handleSelectStars } from '@/handlers/handleSelectStars'

export const paymentScene = new Scenes.BaseScene<MyContext>('paymentScene')

paymentScene.enter(async ctx => {
  const isRu = isRussian(ctx)
  try {
    const message = isRu ? 'Как вы хотите оплатить?' : 'How do you want to pay?'

    const keyboard = Markup.keyboard([
      Markup.button.text(isRu ? '⭐️ Звездами' : '⭐️ Stars'),
      {
        text: isRu ? 'Что такое звезды❓' : 'What are stars❓',
        web_app: {
          url: `https://telegram.org/blog/telegram-stars/${
            isRu ? 'ru' : 'en'
          }?ln=a`,
        },
      },
      Markup.button.text(isRu ? '💳 Рублями' : '💳 In rubles'),
      Markup.button.text(isRu ? '🏠 Главное меню' : '🏠 Main menu'),
    ]).resize()

    // Отправка сообщения с клавиатурой
    await ctx.reply(message, {
      reply_markup: keyboard.reply_markup,
    })
  } catch (error) {
    console.error('Error in paymentScene.enter:', error)
    await ctx.reply(
      isRu
        ? 'Произошла ошибка. Пожалуйста, попробуйте снова.'
        : 'An error occurred. Please try again.'
    )
  }
})

paymentScene.hears(['⭐️ Звездами', '⭐️ Stars'], async ctx => {
  console.log('CASE: ⭐️ Звездами', ctx.match)
  const isRu = isRussian(ctx)
  await handleSelectStars({ ctx, isRu })
  await ctx.scene.leave() // Завершение сцены после выбора
})

paymentScene.hears(['💳 Рублями', '💳 In rubles'], async ctx => {
  console.log('CASE: 💳 Рублями', ctx.match)
  await ctx.scene.enter('emailWizard')
})
