import { getReferalsCount } from '@/core/supabase'
import { MyContext } from '../interfaces'
import { mainMenu } from './mainMenu'

export const sendGenerationCancelledMessage = async (
  ctx: MyContext,
  isRu: boolean
) => {
  const message = isRu ? '❌ Генерация отменена' : '❌ Generation cancelled'
  const telegram_id = ctx.from?.id?.toString() || ''
  const inviteCount = (await getReferalsCount(telegram_id)) || {
    count: 0,
    vip: false,
  }
  await ctx.reply(message, {
    reply_markup: {
      keyboard: (
        await mainMenu(isRu, inviteCount.count, inviteCount.vip)
      ).reply_markup.keyboard,
    },
  })
}
