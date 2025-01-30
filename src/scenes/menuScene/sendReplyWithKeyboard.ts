import { MyContext } from '@/interfaces'

export const sendReplyWithKeyboard = async (
  ctx: MyContext,
  message: string,
  inlineKeyboard: any,
  menu: any
) => {
  await ctx.reply(message, {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
    parse_mode: 'HTML',
    ...menu,
  })
  return ctx.wizard.next()
}
