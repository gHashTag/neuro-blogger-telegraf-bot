import { getReferalsCount } from '@/core/supabase'
import { MyContext } from '../interfaces'
import { mainMenu } from './mainMenu'

export const sendGenerationCancelledMessage = async (
  ctx: MyContext,
  isRu: boolean
) => {
  const message = isRu ? '❌ Генерация отменена' : '❌ Generation cancelled'
  const telegram_id = ctx.from?.id?.toString() || ''
  const inviteCount = (await getReferalsCount(telegram_id)) || 0
  await ctx.reply(message, {
    reply_markup: {
      keyboard: (await mainMenu(isRu, inviteCount)).reply_markup.keyboard,
    },
  })
}
