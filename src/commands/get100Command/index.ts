import { MyContext } from '../../interfaces'

import { generateNeuroImage } from '../../services/generateNeuroImage'
import { models } from '../../core/replicate'

async function get100Command(ctx: MyContext) {
  const model_url = models['neuro_coder'].key as `${string}/${string}:${string}`
  console.log(model_url)

  const message =
    "very close-up portrait of a highly fashionable NEUROCODER teacher, who embodies cutting-edge style in a futuristic school setting. He wears a sleek baseball cap with 'NEUROBLOGGER' emblazoned on it, facing forward confidently. Behind him, a digital board prominently displays the text 'NEUROBLOGGER' in bright, luminous letters. His dramatic pose and blue glasses with transparent lenses reflect his creative genius and dynamic personality. His vibrant streetwear ensemble is elevated by a puffy, architecturally designed leather jacket, set against an intricate background adorned with illustrations of birds and flowers. The atmosphere is bathed in soft, natural daylight, with mystical fog gently rolling in the scene. Exclamation marks, dynamic lines, and ASCII symbols infuse an avant-garde, futuristic touch, capturing the essence of a tech-savvy educator. The image is hyper-realistic, featuring intricate details and rich colors, marrying innovation with artistic expression in a vibrant, modern setting. The ethereal light highlights every detail, from the smooth contours of his face to the textured elegance of his attire, creating a masterpiece in 8k quality. The scene is both glamorous and enchanting, with captivating light and shadows enhancing the detailed lines and decorations."

  if (!message || !ctx.from?.id) return

  const generatingMessage = await ctx.reply('Генерация изображения началась...')

  if (!ctx?.chat?.id) {
    await ctx.reply('Ошибка при генерации ')
    return
  }

  await generateNeuroImage(message, model_url, 100, ctx.from.id, ctx)

  await ctx.telegram.deleteMessage(
    ctx.chat?.id || '',
    generatingMessage.message_id
  )
  return
}

export { get100Command }
