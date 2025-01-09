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
  handleLevel9,
  handleLevel10,
  handleLevel11,
} from '../../scenes/levelQuestWizard/handlers'

export async function helpCommand(ctx: MyContext) {
  const mode = ctx.session.mode
  if (mode === 'avatar') {
    await handleLevel0(ctx)
    return ctx.scene.leave()
  } else if (mode === 'digital_avatar_body') {
    await handleLevel1(ctx)
    return ctx.scene.leave()
  } else if (mode === 'neuro_photo') {
    await handleLevel2(ctx)
    return ctx.scene.leave()
  } else if (mode === 'image_to_prompt') {
    await handleLevel3(ctx)
    return ctx.scene.leave()
  } else if (mode === 'change_size') {
    await handleLevel4(ctx)
    return ctx.scene.leave()
  } else if (mode === 'voice') {
    await handleLevel5(ctx)
    return ctx.scene.leave()
  } else if (mode === 'text_to_speech') {
    await handleLevel6(ctx)
    return ctx.scene.leave()
  } else if (mode === 'select_model') {
    await handleLevel7(ctx)
    return ctx.scene.leave()
  } else if (mode === 'image_to_video') {
    await handleLevel9(ctx)
    return ctx.scene.leave()
  } else if (mode === 'text_to_image') {
    await handleLevel10(ctx)
    return ctx.scene.leave()
  } else if (mode === 'invite') {
    await handleLevel11(ctx)
    return ctx.scene.leave()
  }
  return ctx.scene.leave()
}
