const URL_BASE = 'https://www.omdbapi.com/'
const API_KEY = import.meta.env.VITE_API_KEY

export async function fetchMovie (query) {
  if (query === '') return null

  try {
    const url = `${URL_BASE}?apikey=${API_KEY}&s=${query}`
    const response = await fetch(url)
    const data = await response.json()
    if (data.Response === 'False') throw new Error(data.Error)
    return data
  } catch (error) {
    throw new Error(error.message)
  }
}
