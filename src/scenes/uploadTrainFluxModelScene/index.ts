import { Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import { createImagesZip } from '../../helpers/images/createImagesZip'
import { ensureSupabaseAuth } from '../../core/supabase'
import * as fs from 'fs/promises'
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
      filePath: zipPath,
      triggerWord,
      modelName: ctx.session.modelName,
      steps: ctx.session.steps,
      telegram_id: ctx.session.targetUserId.toString(),
      is_ru: isRu,
    })

    await fs.unlink(zipPath).catch(console.error)
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
