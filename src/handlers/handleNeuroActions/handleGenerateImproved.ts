import { generateNeuroImage } from '../../services/generateNeuroImage'

import { MyContext } from '../../interfaces'
import { sendPromptImprovementMessage } from '@/menu/sendPromptImprovementMessage'
import { sendGenerationErrorMessage } from '@/menu'

export async function handleGenerateNeuroImproved(
  ctx: MyContext,
  data: string,
  isRu: boolean
) {
  try {
    if (!ctx || !ctx.from) {
      throw new Error('Context or user not found')
    }

    const model_url = ctx.session.userModel
      .model_url as `${string}/${string}:${string}`

    if (!model_url) {
      console.log('No prompt data found')
      await ctx.reply(
        isRu
          ? 'Не удалось найти информацию о промпте'
          : 'Could not find prompt information'
      )
      return
    }

    await sendPromptImprovementMessage(ctx, isRu)

    console.log('Generating neuro image...')

    await generateNeuroImage(ctx.session.prompt, model_url, 1, ctx.from.id, ctx)
    return
  } catch (error) {
    console.error('Error in generate_improved_ handler:', error)
    await sendGenerationErrorMessage(ctx, isRu)
  }
}
