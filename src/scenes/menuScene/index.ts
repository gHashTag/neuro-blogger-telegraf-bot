import { composeWizardScene } from '../sceneFactory'
import { handleMenuCommand, handleMenuNext } from './menuSteps'

export const menuScene = composeWizardScene(handleMenuCommand, handleMenuNext)
