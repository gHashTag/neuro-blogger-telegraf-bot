import { Scenes } from 'telegraf'

import { menuCommand } from '@/commands/menuCommand'
import { MyContext } from '@/interfaces'

export const menuScene = new Scenes.WizardScene<MyContext>(
  'menuScene',
  menuCommand
)
