import { MyContext } from '@/interfaces'

interface BuyParams {
  ctx: MyContext
  isRu: boolean
}

export async function handleBuySubscription({ ctx, isRu }: BuyParams) {
  try {
    const subscriptionTitles = {
      neurobase: isRu ? '📚 НейроБаза' : '📚 NeuroBase',
      neuromeeting: isRu ? '🧠 НейроВстреча' : '🧠 NeuroMeeting',
      neuroblogger: isRu ? '🤖 НейроБлогер' : '🤖 NeuroBlogger',
      neuromentor: isRu ? '🦸🏼‍♂️ НейроМентор' : '🦸🏼‍♂️ NeuroMentor',
    }

    const subscriptionDescriptions = {
      neurobase: isRu
        ? 'Самостоятельное обучение по нейросетям с ИИ аватаром.'
        : 'Self-study on neural networks with AI avatar.',
      neuromeeting: isRu
        ? 'Индивидуальная встреча с экспертом.'
        : 'Individual meeting with an expert.',
      neuroblogger: isRu
        ? 'Обучение по нейросетям с ментором.'
        : 'Training on neural networks with a mentor.',
    }

    const subscriptionStarAmounts = {
      neurobase: 7000,
      neuromeeting: 44000,
      neuroblogger: 75000,
    }

    const subscriptionType = ctx.session.subscription
    const amount = subscriptionStarAmounts[subscriptionType]

    const title = subscriptionTitles[subscriptionType] || `${amount} ⭐️`
    const description =
      subscriptionDescriptions[subscriptionType] ||
      (isRu
        ? `💬 Получите ${amount} звезд.\nИспользуйте звезды для различных функций нашего бота и наслаждайтесь новыми возможностями!`
        : `💬 Get ${amount} stars.\nUse stars for various functions of our bot and enjoy new opportunities!`)

    await ctx.replyWithInvoice({
      title,
      description,
      payload: `${amount}_${Date.now()}`,
      currency: 'XTR', // Pass “XTR” for payments in Telegram Stars.
      prices: [
        {
          label: isRu ? 'Цена' : 'Price',
          amount: amount,
        },
      ],
      provider_token: '',
    })

    return
  } catch (error) {
    console.error('Error in handleBuySubscription:', error)
    throw error
  }
}
