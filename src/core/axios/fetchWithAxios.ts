import axios, { AxiosRequestConfig } from 'axios'

export async function fetchWithAxios(url: string, options: AxiosRequestConfig) {
  try {
    const response = await axios({
      url,
      method: options.method,
      headers: options.headers,
      data: options.data,
    });
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      statusText: response.statusText,
      json: async () => response.data,
    };
  } catch (error) {
    throw error
  }
}
