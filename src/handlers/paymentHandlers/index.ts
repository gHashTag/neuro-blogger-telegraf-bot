import { Context } from 'telegraf'
import { isRussian } from '@/helpers'
import { getUid, incrementBalance, setPayments } from '@/core/supabase'
import { handleBuy } from '@/handlers'

export async function handlePaymentPolicyInfo(ctx: Context) {
  const isRu = ctx.from?.language_code === 'ru'
  await ctx.answerCbQuery() // Закрыть уведомление о нажатии кнопки
  await ctx.reply(
    isRu
      ? `💳 Оплата производится через систему Robokassa\n\n📦 Услуги предоставляются онлайн через вебинары, боты и консультации.\n\n🔄 Возврат средств возможен в течение 14 дней с момента оплаты при условии, что услуга не была оказана.\n\nИП Камская Гея Викторовна\nИНН: 711613594921\nОГРН/ОГРНИП: 317715400010572\n\n📝 Политика обработки персональных данных: Мы соблюдаем требования ФЗ "О персональных данных" от 27.07.2006 N 152-ФЗ.`
      : `💳 Payment is processed through the Robokassa system\n\n📦 Services are provided online through webinars, bots, and consultations.\n\n🔄 Refunds are possible within 14 days of payment if the service was not provided.\n\nIP Kamskaya Geya Viktorovna\nINN: 711613594921\nOGRN/OGRNIP: 317715400010572\n\n📝 Personal data processing policy: We comply with the requirements of the Federal Law "On Personal Data" dated 27.07.2006 N 152-FZ.`
  )
}

export async function handleTopUp(ctx) {
  const data = ctx.match[0]
  console.log('data', data)
  const isRu = ctx.from?.language_code === 'ru'
  await handleBuy({ ctx, data, isRu })
}

export async function handlePreCheckoutQuery(ctx: Context) {
  await ctx.answerPreCheckoutQuery(true)
}

export async function handleSuccessfulPayment(ctx) {
  if (!ctx.chat) {
    console.error('Update does not belong to a chat')
    return
  }
  const isRu = isRussian(ctx)

  // Рассчитайте количество звезд, которые пользователь получит
  const stars = ctx.message.successful_payment.total_amount

  if (!ctx.from?.id) throw new Error('No telegram id')
  const { inviter_id } = await getUid(ctx.from.id.toString())
  if (!inviter_id) throw new Error('No user_id')

  // Увеличиваем баланс пользователя на количество звезд
  await incrementBalance({ telegram_id: ctx.from.id.toString(), amount: stars })

  await ctx.reply(
    isRu
      ? `💫 Ваш баланс пополнен на ${stars}⭐️ звезд!`
      : `💫 Your balance has been replenished by ${stars}⭐️ stars!`
  )

  const Email = ctx.from.email
  const OutSum = stars
  const user_id = ctx.from.id

  await setPayments({
    user_id,
    OutSum,
    currency: 'STARS',
    stars,
    email: Email,
    payment_method: 'Telegram',
  })
  await ctx.telegram.sendMessage(
    '-1001978334539',
    `💫 Пользователь @${ctx.from.username} (ID: ${ctx.from.id}) пополнил баланс на ${stars} звезд!`
  )
}
