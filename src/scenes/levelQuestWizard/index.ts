import { Scenes, Markup } from 'telegraf'
import {
  handleLevel0,
  handleLevel1,
  handleLevel10,
  handleLevel11,
  handleLevel2,
  handleLevel3,
  handleLevel4,
  handleLevel5,
  handleLevel6,
  handleLevel7,
  handleLevel8,
  handleLevel9,
  handleQuestComplete,
  handleQuestRules,
} from './handlers'
import { MyContext } from '../../interfaces'
import { isRussian } from '@/helpers'

// Создаем сцены для каждого шага
const createStepScene = (
  stepNumber: number,
  handler: (ctx: MyContext) => Promise<void>,
  nextStepText: string
) => {
  const scene = new Scenes.BaseScene<MyContext>(`step${stepNumber}`)
  scene.enter(async ctx => {
    await handler(ctx)
    const isRu = isRussian(ctx)
    await ctx.reply(
      isRu
        ? `Нажмите "${nextStepText}", чтобы продолжить.`
        : `Click "${nextStepText}", to continue.`,
      Markup.keyboard([[nextStepText], ['➡️ Завершить']]).resize()
    )
  })

  scene.hears(nextStepText, async ctx => {
    await ctx.scene.enter(`step${stepNumber + 1}`)
  })

  scene.hears('➡️ Завершить', async ctx => {
    await ctx.scene.enter('complete')
  })

  return scene
}

// Создаем все шаги
export const step0Scene = createStepScene(0, handleQuestRules, '➡️ Далее шаг 1')
export const step1Scene = createStepScene(1, handleLevel0, '➡️ Далее шаг 2')
export const step2Scene = createStepScene(2, handleLevel1, '➡️ Далее шаг 3')
export const step3Scene = createStepScene(3, handleLevel2, '➡️ Далее шаг 4')
export const step4Scene = createStepScene(4, handleLevel3, '➡️ Далее шаг 5')
export const step5Scene = createStepScene(5, handleLevel4, '➡️ Далее шаг 6')
export const step6Scene = createStepScene(6, handleLevel5, '➡️ Далее шаг 7')
export const step7Scene = createStepScene(7, handleLevel6, '➡️ Далее шаг 8')
export const step8Scene = createStepScene(8, handleLevel7, '➡️ Далее шаг 9')
export const step9Scene = createStepScene(9, handleLevel8, '➡️ Далее шаг 10')
export const step10Scene = createStepScene(10, handleLevel9, '➡️ Далее шаг 11')
export const step11Scene = createStepScene(11, handleLevel10, '➡️ Далее шаг 12')
export const step12Scene = createStepScene(12, handleLevel11, '➡️ Завершить')

// Финальная сцена
export const completeScene = new Scenes.BaseScene<MyContext>('complete')

completeScene.enter(async ctx => {
  await handleQuestComplete(ctx)
  await ctx.scene.leave()
})

// Экспортируем все сцены
export const levelQuestWizard = [
  step0Scene,
  step1Scene,
  step2Scene,
  step3Scene,
  step4Scene,
  step5Scene,
  step6Scene,
  step7Scene,
  step8Scene,
  step9Scene,
  step10Scene,
  step11Scene,
  step12Scene,
  completeScene,
]

export default levelQuestWizard
