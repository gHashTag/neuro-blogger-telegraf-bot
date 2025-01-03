import { client } from './index'

export const createRender = async ({
  template_id,
  modifications,
}: {
  template_id: string
  modifications: Record<string, string>
}) => {
  try {
    const options = {
      templateId: template_id,
      modifications: modifications,
    }

    const renders = await client.render(options)
    console.log('Completed:', renders)

    return renders
  } catch (error) {
    console.error('Error creating render:', error)
    throw error
  }
}
