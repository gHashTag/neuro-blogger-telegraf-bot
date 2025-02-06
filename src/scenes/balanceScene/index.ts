import { MyContext } from '@/interfaces'
import { Scenes } from 'telegraf'
import { getUserBalance } from '@/core/supabase'

export const balanceScene = new Scenes.WizardScene<MyContext>(
  'balanceScene',
  async (ctx: MyContext) => {
    try {
      console.log('CASE: balanceScene')
      const isRu = ctx.from?.language_code === 'ru'

      const balance = await getUserBalance(ctx.from?.id || 0)

      await ctx.reply(
        isRu
          ? `💰✨ <b>Ваш баланс:</b> ${balance} ⭐️`
          : `💰✨ <b>Your balance:</b> ${balance} ⭐️`,
        { parse_mode: 'HTML' }
      )
      await ctx.scene.enter('menuScene')
    } catch (error) {
      console.error('Error sending balance:', error)
      throw error
    }
  }
)
