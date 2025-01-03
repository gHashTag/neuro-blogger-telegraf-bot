import { supabase } from '.';
import * as fs from 'fs/promises';
import { cleanupOldArchives } from './cleanupOldArchives';

export async function uploadToSupabase(
  zipPath: string,
  userId: string
): Promise<string> {
  try {
    const zipBuffer = await fs.readFile(zipPath);
    const timestamp = Date.now();
    const filename = `training_images_${timestamp}.zip`;
    const filePath = `training/${userId}/${filename}`;

    const { error } = await supabase.storage
      .from('ai-training')
      .upload(filePath, zipBuffer, {
        contentType: 'application/zip',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading to Supabase:', error);
      if (error.message.includes('row-level security policy')) {
        throw new Error(
          'Ошибка доступа к хранилищу. Пожалуйста, обратитесь к администратору.'
        );
      }
      throw error;
    }

    const { data: publicUrl } = supabase.storage
      .from('ai-training')
      .getPublicUrl(filePath);

    // Очищаем старые архивы
    await cleanupOldArchives(userId);

    return publicUrl.publicUrl;
  } catch (error) {
    console.error('Error in uploadToSupabase:', error);
    throw error;
  }
}
