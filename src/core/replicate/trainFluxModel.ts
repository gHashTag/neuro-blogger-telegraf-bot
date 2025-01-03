import { replicate } from '.';
import {
  createModelTraining,
  updateModelTraining,
  ModelTrainingUpdate,
} from '../supabase';
interface TrainingInput {
  steps: number;
  lora_rank: number;
  optimizer: string;
  batch_size: number;
  resolution: string;
  autocaption: boolean;
  input_images: string;
  trigger_word: string;
  learning_rate: number;
  wandb_project: string;
  wandb_save_interval: number;
  caption_dropout_rate: number;
  cache_latents_to_disk: boolean;
  wandb_sample_interval: number;
}

interface ApiError extends Error {
  response?: {
    status: number;
  };
}

interface TrainingResponse {
  id: string;
  status: string;
  urls: {
    get: string;
  };
  error?: string;
}

export async function trainFluxModel(
  zipUrl: string,
  triggerWord: string,
  modelName: string,
  userId: string
): Promise<string> {
  let currentTraining: TrainingResponse | null = null;

  try {
    if (!process.env.REPLICATE_USERNAME) {
      throw new Error('REPLICATE_USERNAME is not set');
    }

    const destination: `${string}/${string}` = `${process.env.REPLICATE_USERNAME}/${modelName}`;
    console.log('Training configuration:', {
      username: process.env.REPLICATE_USERNAME,
      modelName,
      destination,
      triggerWord,
      zipUrl,
    });

    // Сначала создаем модель
    try {
      const model = await replicate.models.create(
        process.env.REPLICATE_USERNAME, // owner
        modelName, // model_name
        {
          // options
          description: `LoRA model trained with trigger word: ${triggerWord}`,
          visibility: 'public',
          hardware: 'gpu-t4',
        }
      );
      console.log('Model created:', model);
    } catch (error) {
      // Игнорируем ошибку если модель уже существует
      const apiError = error as ApiError;
      if (apiError.response?.status !== 409) {
        // Добавляем более подробное логирование ошибки
        if (apiError.response?.status === 400) {
          console.error('Model creation validation error:', error);
          throw new Error(
            'Ошибка валидации при создании модели. Проверьте параметры конфигурации.'
          );
        }
        throw error;
      }
      console.log('Model already exists, continuing with training...');
    }

    // Создаем запись о тренировке
    await createModelTraining({
      user_id: userId,
      model_name: modelName,
      trigger_word: triggerWord,
      zip_url: zipUrl,
    });

    // Создаем тренировку в Replicate
    currentTraining = await replicate.trainings.create(
      'ostris',
      'flux-dev-lora-trainer',
      'e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497',
      {
        destination,
        input: {
          steps: 5000,
          lora_rank: 20,
          optimizer: 'adamw8bit',
          batch_size: 1,
          resolution: '512,768,1024',
          autocaption: true,
          input_images: zipUrl,
          trigger_word: triggerWord,
          learning_rate: 0.0004,
          wandb_project: 'flux_train_replicate',
        } as TrainingInput,
      }
    );

    // Обновляем запись с ID тренировки
    await updateModelTraining(userId, modelName, {
      replicate_training_id: currentTraining.id,
    });

    // Ждем завершения тренировки
    let status = currentTraining.status;
    while (status !== 'succeeded' && status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 10000));
      const updatedTraining = await replicate.trainings.get(currentTraining.id);
      status = updatedTraining.status;
      console.log(`Training status: ${status}`);

      // Добавляем логирование деталей тренировки
      if (updatedTraining.error) {
        console.error('Training error details from Replicate:', {
          error: updatedTraining.error,
          status: updatedTraining.status,
          id: updatedTraining.id,
        });
      }

      // Обновляем статус в базе
      await updateModelTraining(userId, modelName, { status });
    }

    if (status === 'failed') {
      // Получаем детали ошибки
      const failedTraining = await replicate.trainings.get(currentTraining.id);
      console.error('Training failed details:', {
        error: failedTraining.error,
        status: failedTraining.status,
        id: failedTraining.id,
        urls: failedTraining.urls,
      });

      await updateModelTraining(userId, modelName, {
        status: 'failed',
        error: failedTraining.error || 'Unknown error',
      } as ModelTrainingUpdate);

      throw new Error(
        `Training failed: ${failedTraining.error || 'Unknown error'}`
      );
    }

    // Обновляем URL модели
    await updateModelTraining(userId, modelName, {
      status: 'completed',
      model_url: currentTraining.urls.get,
    });

    return currentTraining.urls.get;
  } catch (error) {
    console.error('Training error details:', {
      error,
      username: process.env.REPLICATE_USERNAME,
      modelName,
      triggerWord,
      trainingId: currentTraining?.id,
    });

    if ((error as ApiError).response?.status === 404) {
      throw new Error(
        `Ошибка при создании или доступе к модели. Проверьте REPLICATE_USERNAME (${process.env.REPLICATE_USERNAME}) и права доступа.`
      );
    }
    throw error;
  }
}
