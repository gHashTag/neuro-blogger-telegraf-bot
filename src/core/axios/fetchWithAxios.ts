import axios from 'axios'

async function fetchWithAxios(url: string) {
  const response = await axios.get(url)
  return response.data
}

export default fetchWithAxios
