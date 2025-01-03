import { MyContext } from '../interfaces'
import bot from '../core/bot'

export const pulse = async (
  ctx: MyContext,
  image: string | null,
  prompt: string,
  command: string
) => {
  try {
    if (process.env.NODE_ENV === 'development') return

    const truncatedPrompt = prompt.length > 800 ? prompt.slice(0, 800) : prompt
    const caption = `@${
      ctx.from?.username || 'Пользователь без username'
    } Telegram ID: ${
      ctx.from?.id
    } сгенерировал изображение с промптом: ${truncatedPrompt} \n\n Команда: ${command}`

    if (image) {
      // Если изображение начинается с data:image/, нужно получить только base64
      let imageToSend = image
      if (image.startsWith('data:image/')) {
        imageToSend = image.split(',')[1]
      }

      // Преобразуем base64 в буфер
      const imageBuffer = Buffer.from(imageToSend, 'base64')

      // Отправляем как InputFile
      await bot.telegram.sendPhoto(
        '-4166575919',
        { source: imageBuffer },
        { caption }
      )
    } else {
      // Отправляем текст, если изображения нет
      const textMessage = `@${
        ctx.from?.username || 'Пользователь без username'
      } Telegram ID: ${
        ctx.from?.id
      } использовал команду: ${command} с промптом: ${truncatedPrompt}`
      await bot.telegram.sendMessage('-4166575919', textMessage)
    }
    return
  } catch (error) {
    console.error('Ошибка при отправке пульса:', error)
    throw new Error('Ошибка при отправке пульса')
  }
}
