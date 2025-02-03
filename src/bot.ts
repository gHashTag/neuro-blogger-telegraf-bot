import dotenv from 'dotenv'
dotenv.config()

import { createBots } from './core/bot'

// Создаем ботов
const startBots = async () => {
  try {
    const bots = await createBots() // Ждем завершения создания ботов
    console.log('Bots created:', bots)

    // Здесь вы можете добавить дополнительную логику для работы с ботами, если необходимо
  } catch (error) {
    console.error('Error starting bots:', error)
  }
}

// Запускаем функцию
startBots()
