import { supabase } from '.'
import { ModelTraining } from '../../interfaces/supabase.interface'

export async function getLatestUserModel(
  userId: number
): Promise<ModelTraining | null> {
  const { data, error } = await supabase
    .from('model_trainings')
    .select('model_name, trigger_word, model_url')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  console.log(data, 'getLatestUserModel')
  if (error) {
    console.error('Error getting user model:', error)
    return null
  }

  return data as ModelTraining
}
