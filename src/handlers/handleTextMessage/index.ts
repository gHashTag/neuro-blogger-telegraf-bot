import bot from '@/core/bot'
import { answerAi } from '../../core/openai/requests'
import { getUserModel, getUserData } from '../../core/supabase'
import { MyTextMessageContext } from '../../interfaces'
import { Markup } from 'telegraf'

export async function handleTextMessage(ctx: MyTextMessageContext) {
  console.log('CASE: handleTextMessage')
  const userLanguage = ctx.from?.language_code || 'ru'
  console.log('User language:', userLanguage)

  if (ctx.message?.text?.startsWith('/')) {
    console.log('SKIP')
    return
  }
  console.log('handleTextMessage ctx', ctx)

  try {
    const userId = ctx.from?.id.toString() || ''
    console.log('User ID:', userId)

    let userModel = await getUserModel(userId)
    let userData = await getUserData(userId)

    // Если пользователь не найден, используем данные из контекста
    if (!userData) {
      console.log('User not found, using context data:', userId)
      userData = {
        username: ctx.from?.username || '',
        first_name: ctx.from?.first_name || '',
        last_name: ctx.from?.last_name || '',
        company: '',
        position: '',
        designation: '',
        language_code: userLanguage,
      }
      userModel = 'gpt-4o'
    }

    if (!ctx.message?.text) {
      console.log('No message text found')
      await ctx.reply(
        userLanguage === 'ru'
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
      userLanguage
    )
    console.log('AI response:', response)

    if (!response) {
      await ctx.reply(
        userLanguage === 'ru'
          ? 'Не удалось получить ответ от GPT. Пожалуйста, попробуйте позже.'
          : 'Failed to get response from GPT. Please try again later.'
      )
      return
    }

    await ctx.reply(response, Markup.removeKeyboard())
    return
  } catch (error) {
    console.error('Error in GPT response:', error)
    await ctx.reply(
      userLanguage === 'ru'
        ? 'Произошла ошибка при обработке запроса'
        : 'An error occurred while processing your request'
    )
    throw error
  }
}
