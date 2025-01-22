import { Scenes } from 'telegraf'
import { MyContext } from '../../interfaces'
import {
  handleLevel0,
  handleLevel1,
  handleLevel2,
  handleLevel3,
  handleLevel4,
  handleLevel5,
  handleLevel6,
  handleLevel7,
  handleLevel8,
  handleLevel9,
  handleLevel10,
  handleLevel11,
  handleLevel12,
} from '../../scenes/levelQuestWizard/handlers'
import { mainMenu } from '@/menu'
import { isRussian } from '@/helpers'
import { getReferalsCount } from '@/core/supabase'

export const helpScene = new Scenes.BaseScene<MyContext>('helpScene')

helpScene.enter(async ctx => {
  const mode = ctx.session.mode
  const isRu = isRussian(ctx)
  const telegram_id = ctx.from?.id?.toString() || ''
  const inviteCount = (await getReferalsCount(telegram_id)) || 0
  try {
    switch (mode) {
      case 'avatar':
        await handleLevel0(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'digital_avatar_body':
        await handleLevel1(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'neuro_photo':
        await handleLevel2(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'image_to_prompt':
        await handleLevel3(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'change_size':
        await handleLevel4(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'voice':
        await handleLevel5(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'text_to_speech':
        await handleLevel6(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'select_model':
        await handleLevel7(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'chat_with_avatar':
        await handleLevel8(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'image_to_video':
        await handleLevel9(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'text_to_image':
        await handleLevel10(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'text_to_video':
        await handleLevel11(ctx)
        await mainMenu(isRu, inviteCount)
        break
      case 'invite':
        await handleLevel12(ctx)
        await mainMenu(isRu, inviteCount)
        break
      default:
        await ctx.reply(
          'Неизвестный режим. Пожалуйста, выберите корректный режим.'
        )
        await mainMenu(isRu, inviteCount)
        break
    }
  } catch (error) {
    console.error('Error in helpScene:', error)
    await ctx.reply('Произошла ошибка. Пожалуйста, попробуйте снова.')
  }
})
