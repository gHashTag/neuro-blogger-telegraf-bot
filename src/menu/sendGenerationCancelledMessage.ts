import { MyContext } from '../interfaces'
import { mainMenu } from './mainMenu'

export const sendGenerationCancelledMessage = async (
  ctx: MyContext,
  isRu: boolean
) => {
  const message = isRu ? '❌ Генерация отменена' : '❌ Generation cancelled'
  await ctx.reply(message, {
    reply_markup: {
      keyboard: mainMenu(isRu).reply_markup.keyboard,
    },
  })
}
