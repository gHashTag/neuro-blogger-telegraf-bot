import { Markup, Scenes } from 'telegraf'
import { MyContext } from '@/interfaces'
import { handleBuyRobokassa } from '@/handlers/handleBuyRobokassa'
import { isRussian } from '@/helpers'

import { handleSelectStars } from '@/handlers/handleSelectStars'

export const paymentScene = new Scenes.BaseScene<MyContext>('paymentScene')

paymentScene.enter(async ctx => {
  const isRu = isRussian(ctx)
  await ctx.reply(
    isRu ? 'Как вы хотите оплатить?' : 'How do you want to pay?',
    Markup.keyboard([
      Markup.button.text(isRu ? '⭐️ Звездами' : '⭐️ Stars'),
      Markup.button.text(isRu ? '💳 Рублями' : '💳 In rubles'),
      Markup.button.text(isRu ? '🏠 Главное меню' : '🏠 Main menu'),
    ]).resize()
  )
})

paymentScene.hears(['⭐️ Звездами', '⭐️ Stars'], async ctx => {
  console.log('CASE: ⭐️ Звездами', ctx.match)
  const isRu = isRussian(ctx)
  await handleSelectStars({ ctx, isRu })
  await ctx.scene.leave() // Завершение сцены после выбора
})

paymentScene.hears(['💳 Рублями', '💳 In rubles'], async ctx => {
  console.log('CASE: 💳 Рублями', ctx.match)
  const isRu = isRussian(ctx)
  await handleBuyRobokassa({ ctx, isRu })
  await ctx.scene.leave() // Завершение сцены после выбора
})
