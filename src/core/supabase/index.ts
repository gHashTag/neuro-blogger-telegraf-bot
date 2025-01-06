import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL is not set')
}

if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('SUPABASE_SERVICE_KEY is not set')
}

// Создаем клиент с service role key
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export * from './checkSubscriptionByTelegramId'

export * from './getAspectRatio'
export * from './getGeneratedImages'
export * from './getHistory'
export * from './getModel'
export * from './getPrompt'
export * from './getUserData'
export * from './incrementGeneratedImages'
export * from './isLimitAi'
export * from './savePrompt'
export * from './setAspectRatio'
export * from './createUser'
export * from './getUid'

export * from './updateUserVoice'
export * from './getUserModel'
export * from './getReferalsCount'
export * from './cleanupOldArchives'
export * from './createModelSupabaseTraining'
export * from './deleteFileFromSupabase'
export * from './ensureSupabaseAuth'
export * from './getLatestUserModel'
export * from './getTelegramIdByUserId'
export * from './getVoiceId'
export * from './saveUserEmail'
export * from './sendPaymentInfo'
export * from './getPaymentsInfoByUsername'
export * from './getPaymentsInfoByTelegramId'
export * from './setHistory'
export * from './setModel'
export * from './updateModelTraining'
export * from './updateUserSoul'
export * from './uploadToSupabase'
export * from './createModelSupabaseTraining'
export * from './getUserByTelegramId'
