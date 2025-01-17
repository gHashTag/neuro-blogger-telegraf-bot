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

export const helpScene = new Scenes.BaseScene<MyContext>('helpScene')

helpScene.enter(async ctx => {
  const mode = ctx.session.mode
  const isRu = isRussian(ctx)
  try {
    switch (mode) {
      case 'avatar':
        await handleLevel0(ctx)
        mainMenu(isRu)
        break
      case 'digital_avatar_body':
        await handleLevel1(ctx)
        mainMenu(isRu)
        break
      case 'neuro_photo':
        await handleLevel2(ctx)
        mainMenu(isRu)
        break
      case 'image_to_prompt':
        await handleLevel3(ctx)
        mainMenu(isRu)
        break
      case 'change_size':
        await handleLevel4(ctx)
        mainMenu(isRu)
        break
      case 'voice':
        await handleLevel5(ctx)
        mainMenu(isRu)
        break
      case 'text_to_speech':
        await handleLevel6(ctx)
        mainMenu(isRu)
        break
      case 'select_model':
        await handleLevel7(ctx)
        mainMenu(isRu)
        break
      case 'chat_with_avatar':
        await handleLevel8(ctx)
        mainMenu(isRu)
        break
      case 'image_to_video':
        await handleLevel9(ctx)
        mainMenu(isRu)
        break
      case 'text_to_image':
        await handleLevel10(ctx)
        mainMenu(isRu)
        break
      case 'text_to_video':
        await handleLevel11(ctx)
        mainMenu(isRu)
        break
      case 'invite':
        await handleLevel12(ctx)
        mainMenu(isRu)
        break
      default:
        await ctx.reply(
          'Неизвестный режим. Пожалуйста, выберите корректный режим.'
        )
        mainMenu(isRu)
        break
    }
  } catch (error) {
    console.error('Error in helpScene:', error)
    await ctx.reply('Произошла ошибка. Пожалуйста, попробуйте снова.')
  }
})
