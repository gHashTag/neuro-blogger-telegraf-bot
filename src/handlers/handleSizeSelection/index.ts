import { MyContext } from '@/interfaces'
import { setAspectRatio } from '@/core/supabase'
import { isRussian } from '@/helpers/language'

export async function handleSizeSelection(ctx: MyContext, size: string) {
  ctx.session.selectedSize = size
  await setAspectRatio(ctx.from.id, size)
  const isRu = isRussian(ctx)
  await ctx.reply(
    isRu ? `✅ Вы выбрали размер: ${size}` : `✅ You selected size: ${size}`
  )
  const mode = ctx.session.mode
  if (mode === 'neuro_photo') {
    await ctx.scene.enter('neuroPhotoWizard')
  } else if (mode === 'text_to_image') {
    await ctx.scene.enter('textToImageWizard')
  } else {
    console.log('CASE: Неизвестный режим')
  }
}
