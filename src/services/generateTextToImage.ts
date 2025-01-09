import axios from 'axios'

import { isDev } from '@/config'
import { MyContext } from '@/interfaces'

export const generateTextToImage = async (
  prompt: string,
  model_type: string,
  num_images: number,
  telegram_id: number,
  isRu: boolean,
  ctx: MyContext
) => {
  try {
    const url = `${
      isDev ? 'http://localhost:3000' : process.env.ELESTIO_URL
    }/generate/text-to-image`

    await axios.post(
      url,
      {
        prompt,
        model: model_type,
        num_images,
        telegram_id,
        username: ctx.from?.username,
        is_ru: isRu,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Ошибка при генерации изображения:', error)
    throw error
  }
}
