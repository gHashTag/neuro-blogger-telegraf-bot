import { openai } from '.';

export const upgradePrompt = async (prompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that upgrades the given prompt for image generation. Return only the upgraded prompt. ',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error in upgradePrompt:', error);
    throw error;
  }
};
