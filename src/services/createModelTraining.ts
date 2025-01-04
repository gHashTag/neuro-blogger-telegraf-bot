import axios, { AxiosResponse } from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import { isDev } from '../helpers'

interface ModelTrainingRequest {
  filePath: string
  triggerWord: string
  modelName: string
  telegram_id: string
  is_ru: boolean
  steps: number
}

interface ModelTrainingResponse {
  message: string
  model_id?: string
}

export async function createModelTraining(
  requestData: ModelTrainingRequest
): Promise<ModelTrainingResponse> {
  try {
    console.log('requestData', requestData)
    const url = `${
      isDev ? 'http://localhost:3000' : process.env.ELESTIO_URL
    }/generate/create-model-training`

    // Проверяем, что файл существует
    if (!fs.existsSync(requestData.filePath)) {
      throw new Error('Файл не найден: ' + requestData.filePath)
    }

    // Создаем FormData для передачи файла
    const formData = new FormData()
    formData.append('zipUrl', fs.createReadStream(requestData.filePath))
    formData.append('triggerWord', requestData.triggerWord)
    formData.append('modelName', requestData.modelName)
    formData.append('steps', requestData.steps)
    formData.append('telegram_id', requestData.telegram_id)
    formData.append('is_ru', requestData.is_ru.toString())

    const response: AxiosResponse<ModelTrainingResponse> = await axios.post(
      url,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
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
