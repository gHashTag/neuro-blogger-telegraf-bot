import bot from '@/core/bot'
import { answerAi } from '../../core/openai/requests'
import { getUserModel, getUserData } from '../../core/supabase'
import { MyTextMessageContext } from '../../interfaces'
import { isRussian } from '@/helpers'

export async function handleTextMessage(ctx: MyTextMessageContext) {
  console.log('CASE: handleTextMessage')

  if (ctx.message?.text?.startsWith('/')) {
    console.log('SKIP')
    return
  }

  try {
    const userModel = await getUserModel(ctx.from?.id.toString() || '')
    const userData = await getUserData(ctx.from?.id.toString() || '')

    if (!userData) {
      await ctx.reply(
        ctx.from?.language_code === 'ru'
          ? 'Не удалось получить данные пользователя'
          : 'Failed to get user data'
      )
      return
    }

    if (!ctx.message?.text) {
      await ctx.reply(
        ctx.from?.language_code === 'ru'
          ? 'Не удалось получить текст сообщения'
          : 'Failed to get message text'
      )
      return
    }
    await bot.telegram.sendChatAction(ctx.chat.id, 'typing')

    const response = await answerAi(
      userModel,
      userData,
      ctx.message.text,
      ctx.from?.language_code || 'en'
    )

    if (!response) {
      await ctx.reply(
        ctx.from?.language_code === 'ru'
          ? 'Не удалось получить ответ от GPT. Пожалуйста, попробуйте позже.'
          : 'Failed to get response from GPT. Please try again later.'
      )
      return
    }

    await ctx.reply(response)
    return
  } catch (error) {
    console.error('Error in GPT response:', error)
    await ctx.reply(
      ctx.from?.language_code === 'ru'
        ? 'Произошла ошибка при обработке запроса'
        : 'An error occurred while processing your request'
    )
    throw error
  }
}
