import { MyContext } from '../../interfaces'
import {
  handleLevel1,
  handleLevel0,
  handleLevel7,
} from '../../scenes/levelQuestWizard/handlers'

export async function helpCommand(ctx: MyContext) {
  const mode = ctx.session.mode
  if (mode === 'avatar') {
    await handleLevel0(ctx)

    return ctx.scene.leave()
  } else if (mode === 'select_model') {
    await handleLevel7(ctx)
    return ctx.scene.leave()
  } else if (mode === 'digital_avatar_body') {
    await handleLevel1(ctx)
    return ctx.scene.leave()
  }
  return ctx.scene.leave()
}
