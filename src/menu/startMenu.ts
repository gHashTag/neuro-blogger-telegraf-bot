import { MyContext } from '../interfaces'
import { Markup } from 'telegraf'
import { levels } from './mainMenu'

export async function startMenu(ctx: MyContext, isRu: boolean) {
  await ctx.reply(
    isRu ? 'Выберите действие в меню:' : 'Choose an action in the menu:',
    Markup.keyboard([
      [
        Markup.button.text(isRu ? levels[102].title_ru : levels[102].title_en),
        Markup.button.text(isRu ? levels[103].title_ru : levels[103].title_en),
      ],
      [
        Markup.button.text(isRu ? levels[0].title_ru : levels[0].title_en),
        Markup.button.text(isRu ? levels[100].title_ru : levels[100].title_en),
        Markup.button.text(isRu ? levels[101].title_ru : levels[101].title_en),
      ],
    ]).resize()
  )
}
