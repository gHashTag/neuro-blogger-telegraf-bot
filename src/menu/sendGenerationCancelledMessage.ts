import { getReferalsCount } from '@/core/supabase'
import { MyContext } from '../interfaces'
import { mainMenu } from './mainMenu'

export const sendGenerationCancelledMessage = async (
  ctx: MyContext,
  isRu: boolean
) => {
  const message = isRu ? '❌ Генерация отменена' : '❌ Generation cancelled'
  const telegram_id = ctx.from?.id?.toString() || ''
  const { count, vip } = await getReferalsCount(telegram_id)
  await ctx.reply(message, {
    reply_markup: {
      keyboard: (await mainMenu(isRu, count, vip)).reply_markup.keyboard,
    },
  })
}
