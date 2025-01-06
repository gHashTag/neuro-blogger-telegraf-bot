import express, { Application } from 'express'
import { supabase } from './core/supabase'
import bot from './core/bot'

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not set')
}
// Create a new bot instance

const app = express() as Application
const port = process.env.PORT || 3000

app.use(express.json())

// Test endpoint
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Telegram bot webhook handler
app.use(`/api/index`, bot.webhookCallback('/api/index'))

// Sync Labs webhook handler
app.post('/api/synclabs-webhook', async (req, res) => {
  try {
    const { status, video_url, id } = req.body
    console.log('Webhook received:', req.body)

    if (status === 'completed') {
      const { error } = await supabase
        .from('synclabs_videos')
        .update({
          video_url: video_url,
          status: status,
        })
        .eq('video_id', id)

      if (error) {
        console.error('Error updating video:', error)
        return res.status(500).json({ error: 'Error updating video' })
      }

      console.log('Video successfully updated:', id)
      return res.status(200).json({ message: 'Video successfully processed' })
    } else {
      console.log(`Status ${status} received for video ${id}`)
      return res.status(200).json({ message: 'Status received' })
    }
  } catch (error) {
    console.error('Error processing webhook:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default app
