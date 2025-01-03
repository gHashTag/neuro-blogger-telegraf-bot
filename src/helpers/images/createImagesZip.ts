import { createWriteStream } from 'fs'
import path from 'path'
import archiver from 'archiver'
import * as fs from 'fs/promises'
import { BufferType } from '../../interfaces'

export async function createImagesZip(images: BufferType): Promise<string> {
  // Создаем временную директорию для изображений
  const tmpDir = path.join(process.cwd(), 'tmp')
  const timestamp = Date.now()
  const zipPath = path.join(tmpDir, `training_images_${timestamp}.zip`)

  try {
    // Создаем временную директорию, если её нет
    await fs.mkdir(tmpDir, { recursive: true })

    // Создаем ZIP архив
    const output = createWriteStream(zipPath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    archive.pipe(output)

    // Добавляем изображения в архив
    for (const image of images) {
      archive.append(image.buffer, { name: image.filename })
    }

    await archive.finalize()

    return zipPath
  } catch (error) {
    console.error('Error creating ZIP archive:', error)
    throw error
  }
}
