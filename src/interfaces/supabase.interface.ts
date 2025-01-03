export interface ModelTraining {
  user_id: string
  model_name: string
  trigger_word: string
  zip_url: string
  model_url?: string
  replicate_training_id?: string
  status?: string
  error?: string
}

export interface CreateUserData {
  username: string
  telegram_id: string
  first_name?: string | null
  last_name?: string | null
  is_bot?: boolean
  language_code?: string
  photo_url?: string | null
  chat_id?: number | null
  mode?: string
  model?: string
  count?: number
  limit?: number
  aspect_ratio?: string
  balance?: number
  inviter?: string | null
}

export interface Payment {
  id: string
  amount: number
  date: string
}

export type setHistoryProps = {
  brand: string
  response: string
  video_url: string
  command: string
  type: string
  voice_id: string
  chat_id: string
  lang: string
  trigger: string
}
