import { MyContext } from '../interfaces'
import { Markup } from 'telegraf'

export const sendPhotoDescriptionRequest = async (
  ctx: MyContext,
  isRu: boolean
): Promise<void> => {
  const message = isRu
    ? '📸 Опишите на английском, какую фотографию вы хотите сгенерировать.'
    : '📸 Describe what kind of photo you want to generate in English.'

  await ctx.reply(message, {
    reply_markup: Markup.keyboard([
      Markup.button.text(isRu ? 'Отменить генерацию' : 'Cancel generation'),
    ]).reply_markup,
  })
}
