import { supabase } from '.'
import { ModelTraining } from '../../interfaces/supabase.interface'

export const createModelSupabaseTraining = async (training: ModelTraining) => {
  try {
    const { error } = await supabase.from('model_trainings').insert(training)
    if (error)
      throw new Error(
        `Ошибка при создании записи о тренировке: ${error.message}`
      )
  } catch (error) {
    console.error('Error creating model training:', error)
    throw error
  }
}
