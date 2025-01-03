import { setHistoryProps } from '../../interfaces/supabase.interface'
import { supabase } from '.'

export const setHistory = async ({
  brand,
  response,
  video_url,
  command,
  type,
  voice_id = '',
  chat_id = '',
  lang = '',
  trigger,
}: setHistoryProps) => {
  // Удаление символов # и *
  const sanitizeResponse = (text: string) => {
    return text.replace(/[#*]/g, '')
  }

  const sanitizedResponse = sanitizeResponse(response)

  const { error } = await supabase.from('clips').insert({
    brand: brand,
    response: sanitizedResponse,
    video_url: video_url,
    command: command,
    type: type,
    voice_id: voice_id,
    chat_id: chat_id,
    lang: lang,
    trigger,
  })

  if (error) {
    console.error('Error setting lifehack history:', error)
    return false
  }

  return true
}
