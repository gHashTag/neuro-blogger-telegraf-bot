import { clientRunway } from './';

export async function imageToVideo(
  promptImage: string,
  promptText: string
): Promise<string> {
  try {
    // Создаем задачу для генерации видео из изображения
    const imageToVideoTask = await clientRunway.imageToVideo.create({
      model: 'gen3a_turbo',
      promptImage: promptImage,
      promptText: promptText,
    });

    const taskId = imageToVideoTask.id;
    console.log(`Задача создана с ID: ${taskId}`);

    // Ожидаем завершения задачи
    let task;
    do {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Ждем 10 секунд перед повторной проверкой
      task = await clientRunway.tasks.retrieve(taskId);
      console.log(`Статус задачи: ${task.status}`);
    } while (!['SUCCEEDED', 'FAILED'].includes(task.status));

    if (task.status === 'SUCCEEDED') {
      console.log('Задача успешно завершена:', task.output);
      return task.output;
    } else {
      console.error('Задача завершилась с ошибкой.');
      throw new Error('Задача завершилась с ошибкой.');
    }
  } catch (error) {
    console.error('Ошибка при создании видео из изображения:', error);
    throw error;
  }
}
