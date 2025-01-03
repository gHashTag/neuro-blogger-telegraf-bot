import { supabase } from '.';
import { ModelTraining } from '../../interfaces/supabase.interface';

export const createModelTraining = async (training: ModelTraining) => {
  const { error } = await supabase.from('model_trainings').insert(training);
  if (error)
    throw new Error(
      `Ошибка при создании записи о тренировке: ${error.message}`
    );
};
