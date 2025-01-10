import { supabase } from '.'

export const getUid = async (
  telegram_id: string | number
): Promise<{
  inviter_id: string | null
  inviter_username: string | null
} | null> => {
  try {
    if (!telegram_id) {
      console.warn('No telegram_id provided to getUid')
      return null
    }

    const { data, error } = await supabase
      .from('users')
      .select('user_id, username')
      .eq('telegram_id', telegram_id.toString())

    if (error) {
      console.error('Error getting user_id:', error)
      return null
    }

    return {
      inviter_id: data?.[0]?.user_id || null,
      inviter_username: data?.[0]?.username || null,
    }
  } catch (error) {
    console.error('Error in getUid:', error)
    return null
  }
}
