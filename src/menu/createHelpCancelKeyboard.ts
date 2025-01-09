import { Markup } from 'telegraf'
import { ReplyKeyboardMarkup } from 'telegraf/typings/core/types/typegram'

export function createHelpCancelKeyboard(
  isRu: boolean
): Markup.Markup<ReplyKeyboardMarkup> {
  return Markup.keyboard([
    [isRu ? 'Справка по команде' : 'Help for the command'],
    [isRu ? 'Отмена' : 'Cancel'],
  ]).resize()
}
