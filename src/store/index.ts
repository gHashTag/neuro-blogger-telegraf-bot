import { MySession } from '../interfaces'

export const defaultSession: () => MySession = () => ({
  selectedModel: '',
  prompt: '',
  selectedSize: '9:16',
  userModel: {
    model_name: '',
    trigger_word: '',
    model_url: 'i/i:i',
  },
  numImages: 1,
  telegram_id: 0,
  mode: 'text_to_image',
  attempts: 0,
  videoModel: '',
  paymentAmount: 0,
  images: [],
  modelName: '',
  targetUserId: 0,
  username: '',
  triggerWord: '',
  steps: 0,
  videoUrl: '',
  imageUrl: '',
  audioUrl: '',
  email: '',
})
