import { supabaseAdmin } from '.'
import { cleanupOldArchives } from './cleanupOldArchives'
import { createModelTraining } from '../../services'

export async function uploadToSupabase(
  zipPath: string,
  userId: string,
  triggerWord: string,
  modelName: string
): Promise<string> {
  try {
    const timestamp = Date.now()
    const filename = `training_images_${timestamp}.zip`
    const filePath = `training/${userId}/${filename}`

    const { data, error } = await supabaseAdmin.storage
      .from('ai-training')
      .upload(filePath, zipPath)

    if (error) {
      console.error('Error uploading to Supabase:', error)
      throw error
    }

    console.log('File uploaded:', data)
    const { data: publicUrl } = supabaseAdmin.storage
      .from('ai-training')
      .getPublicUrl(filePath)

    console.log('Public URL:', publicUrl)

    await createModelTraining({
      filePath: publicUrl.publicUrl,
      triggerWord,
      modelName,
      telegram_id: userId,
      is_ru: true,
      steps: 1000,
    })
    // Очищаем старые архивы
    await cleanupOldArchives(userId)

    return publicUrl.publicUrl
  } catch (error) {
    console.error('Error in uploadToSupabase:', error)
    throw error
  }
}
