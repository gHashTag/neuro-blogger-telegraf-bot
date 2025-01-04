import axios, { AxiosResponse } from 'axios'

import { isDev } from '../helpers'

interface ModelTrainingRequest {
  zipUrl: string
  triggerWord: string
  modelName: string
  telegram_id: string
  is_ru: boolean
}

interface ModelTrainingResponse {
  message: string
  model_id?: string
}

const ngrokUrl =
  'https://6b29-2403-6200-8870-14d1-a945-e097-a2b2-6c1.ngrok-free.app'

export async function createModelTraining(
  requestData: ModelTrainingRequest
): Promise<ModelTrainingResponse> {
  try {
    const url = `${
      isDev ? ngrokUrl : process.env.ELESTIO_URL
    }/generate/create-model-training`

    const response: AxiosResponse<ModelTrainingResponse> = await axios.post(
      url,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('Model training response:', response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data || error.message)
      throw new Error(
        requestData.is_ru
          ? 'Произошла ошибка при создании тренировки модели'
          : 'Error occurred while creating model training'
      )
    }
    console.error('Unexpected error:', error)
    throw error
  }
}
