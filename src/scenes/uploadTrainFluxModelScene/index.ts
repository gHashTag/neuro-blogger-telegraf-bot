import { Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import * as fs from 'fs/promises'
import { createImagesZip } from '../../helpers/images/createImagesZip'
import { ensureSupabaseAuth } from '../../core/supabase'
import { uploadToSupabase } from '../../core/supabase/uploadToSupabase'
import { createModelTraining } from '../../services'
import { isRussian } from '@/helpers/language'

export const uploadTrainFluxModelScene = new Scenes.BaseScene<MyContext>(
  'uploadTrainFluxModelScene'
)

uploadTrainFluxModelScene.enter(async ctx => {
  const isRu = isRussian(ctx)
  console.log('Scene: ZIP')
  try {
    await ctx.reply(isRu ? '⏳ Создаю архив...' : '⏳ Creating archive...')
    const zipPath = await createImagesZip(ctx.session.images)
    console.log('ZIP created at:', zipPath)

    await ensureSupabaseAuth()

    await ctx.reply(isRu ? '⏳ Загружаю архив...' : '⏳ Uploading archive...')
    // const zipUrl = await uploadToSupabase(
    //   zipPath,
    //   ctx.session.targetUserId.toString(),
    //   ctx.session.modelName,
    //   ctx.session.triggerWord
    // )
    // console.log('ZIP uploaded to:', zipUrl)

    const triggerWord = `${ctx.session.username.toLocaleUpperCase()}`
    if (!triggerWord) {
      await ctx.reply(
        isRu ? '❌ Некорректный trigger word' : '❌ Invalid trigger word'
      )
      return ctx.scene.leave()
    }

    await ctx.reply(
      isRu ? '⏳ Начинаю обучение модели...' : '⏳ Starting model training...'
    )
    await ctx.reply(
      isRu
        ? `✅ Обучение начато!\n\nВаша модель будет натренирована через 3-6 часов. После завершения вы сможете проверить её работу, используя Нейрофото в главном меню.`
        : `✅ Training started!\n\nYour model will be trained in 3-6 hours. Once completed, you can check its performance using the Neurophoto in the main menu.`
    )

    await createModelTraining({
      zipUrl: zipPath,
      triggerWord,
      modelName: ctx.session.modelName,
      telegram_id: ctx.session.targetUserId.toString(),
      is_ru: isRu,
    })

    // await fs.unlink(zipPath).catch(console.error)
  } catch (error) {
    console.error('Error in uploadTrainFluxModelScene:', error)
    await ctx.reply(
      isRu
        ? '❌ Произошла ошибка. Пожалуйста, попробуйте еще раз.'
        : '❌ An error occurred. Please try again.'
    )
  } finally {
    await ctx.scene.leave()
  }
})

export default uploadTrainFluxModelScene
