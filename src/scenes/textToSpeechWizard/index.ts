import { Markup, Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import { getVoiceId } from '../../core/supabase'
import {
  textToSpeechCost,
  sendBalanceMessage,
  sendInsufficientStarsMessage,
  getUserBalance,
} from '../../core/telegramStars'
import { generateTextToSpeech } from '../../services/generateTextToSpeech'
import { isRussian } from '@/helpers'

export const textToSpeechWizard = new Scenes.WizardScene<MyContext>(
  'textToSpeechWizard',
  async ctx => {
    const isRu = isRussian(ctx)
    if (!ctx.from) {
      await ctx.reply(
        isRu ? 'Ошибка идентификации пользователя' : 'User identification error'
      )
      return ctx.scene.leave()
    }

    const currentBalance = await getUserBalance(ctx.from.id)
    const price = textToSpeechCost
    if (currentBalance < price) {
      await sendInsufficientStarsMessage(ctx, isRu)
      return ctx.scene.leave()
    }

    await sendBalanceMessage(currentBalance, price, ctx, isRu)

    await ctx.reply(
      isRu
        ? '🎙️ Отправьте текст, для преобразования его в голос'
        : '🎙️ Send text, to convert it to voice',
      Markup.keyboard([
        [Markup.button.text(isRu ? 'Отменить' : 'Cancel')],
      ]).resize()
    )

    return ctx.wizard.next()
  },
  async ctx => {
    const isRu = isRussian(ctx)
    const message = ctx.message

    if (!message || !('text' in message)) {
      await ctx.reply(
        isRu ? '✍️ Пожалуйста, отправьте текст' : '✍️ Please send text'
      )
      return
    }

    if (message.text === (isRu ? 'Отменить' : 'Cancel')) {
      await ctx.reply(isRu ? '❌ Операция отменена' : '❌ Operation cancelled')
      return ctx.scene.leave()
    }

    try {
      const voice_id = await getVoiceId(ctx.from.id.toString())
      console.log('voice_id', voice_id)
      if (!voice_id) {
        await ctx.reply(
          isRu
            ? '🎯 Для корректной работы обучите аватар используя 🎤 Голос для аватара в главном меню'
            : '🎯 For correct operation, train the avatar using 🎤 Voice for avatar in the main menu'
        )
        return ctx.scene.leave()
      }

      await generateTextToSpeech(
        message.text,
        voice_id,
        ctx.from.id,
        ctx.from.username || '',
        isRu
      )
    } catch (error) {
      console.error('Error in textToSpeechWizard:', error)
      await ctx.reply(
        isRu
          ? 'Произошла ошибка при создании голосового аватара'
          : 'Error occurred while creating voice avatar'
      )
    }

    return ctx.scene.leave()
  }
)

export default textToSpeechWizard