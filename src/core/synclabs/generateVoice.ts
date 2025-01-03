import axios from 'axios';

export const generateVoice = async (text: string, voiceId: string) => {
  if (!process.env.SYNCLABS_API_KEY)
    throw new Error('SYNCLABS_API_KEY is not set');
  try {
    const response = await axios.post(
      'https://api.synclabs.so/speak',
      {
        name: 'https://vhuydaxyqogmpjizeokl.supabase.co/storage/v1/object/public/melimi/1006101665_1724945540234.mp4',
        transcript: text,
        voiceId: voiceId,
        webhookUrl: `${process.env.BASE_URL}/api/create-audio`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.SYNCLABS_API_KEY,
        },
      }
    );

    if (response.status !== 201) {
      throw new Error('Ошибка при генерации голоса');
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Ошибка при генерации голоса');
  }
};
