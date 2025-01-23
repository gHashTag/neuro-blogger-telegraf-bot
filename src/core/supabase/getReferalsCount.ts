import { supabase } from '.'

export const getReferalsCount = async (
  telegram_id: string
): Promise<{ count: number; vip: boolean }> => {
  try {
    // Сначала получаем UUID пользователя
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_id, vip')
      .eq('telegram_id', telegram_id.toString())
      .single()

    if (userError) {
      console.error('Ошибка при получении user_id:', userError)
      return { count: 0, vip: false }
    }

    // Теперь ищем рефералов по UUID
    const { data, error } = await supabase
      .from('users')
      .select('inviter')
      .eq('inviter', userData.user_id)

    if (error) {
      console.error('Ошибка при получении рефералов:', error)
      return { count: 0, vip: false }
    }

    return {
      count: data?.length || 0,
      vip: userData.vip,
    }
  } catch (error) {
    console.error('Ошибка в getReferalsCount:', error)
    return {
      count: 0,
      vip: false,
    }
  }
}
