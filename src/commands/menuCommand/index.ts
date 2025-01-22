import { sendGenericErrorMessage } from '@/menu'
import { MyContext } from '../../interfaces'
import { mainMenu } from '../../menu/mainMenu'
import { getReferalsCount } from '@/core/supabase/getReferalsCount'
import { isDev } from '@/config'

export async function menuCommand(ctx: MyContext) {
  console.log('CASE: menuCommand')
  const isRu = ctx.from?.language_code === 'ru'
  try {
    console.log('CASE: menu')
    const telegram_id = ctx.from?.id?.toString() || ''
    const inviteCount = await getReferalsCount(telegram_id)

    const menu = await mainMenu(isRu, inviteCount)
    const message = isRu
      ? '🏠 Главное меню\nВыберите нужный раздел 👇'
      : '🏠 Main menu\nChoose the section 👇'
    await ctx.reply(message, menu)
    const url = `https://neuro-blogger-web-u14194.vm.elestio.app/neuro_sage/1/1/1/1/1/${
      inviteCount + 1
    }`
    console.log('url', url)

    if (inviteCount <= 10) {
      await ctx.reply(
        isRu
          ? `🚀 Чтобы разблокировать следующий уровень аватара и получить доступ к новым нейро функциям, пригласите друзей! 🌟\n\n🆔 Уровень вашего аватара: ${inviteCount} \n\n🤖 Чтобы начать пользоваться ботом нажмите команду /menu`
          : `🚀 To unlock the next level of the avatar and gain access to new features, invite friends! 🌟\n\n🆔 Level your avatar: ${inviteCount} invitations \n\n🤖 To start using the bot, click the /menu command`,
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: isRu ? 'Открыть' : 'Open',
                  web_app: {
                    url,
                  },
                },
              ],
            ],
          },
        }
      )
      // await ctx.reply(isRu ? `Ссылка для приглашения 👇🏻` : `Invite link 👇🏻`, {
      //   parse_mode: 'HTML',
      // })
      // const botUsername = ctx.botInfo.username
      // const telegram_id = ctx.from?.id?.toString() || ''

      // const linkText = `<a href="https://t.me/${botUsername}?start=${telegram_id}">https://t.me/${botUsername}?start=${telegram_id}</a>`

      // await ctx.reply(linkText, { parse_mode: 'HTML' })
    }
    return
  } catch (error) {
    console.error('Error in menu command:', error)
    await sendGenericErrorMessage(ctx, isRu, error)
    throw error
  }
}
