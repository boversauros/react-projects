import { useState } from 'react'
import { fetchMovie } from '../services/fetchMovie'

export function useMovies () {
  const [movies, setMovies] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function searchMovies ({ query }) {
    try {
      setError(null)
      setLoading(true)
      const movies = await fetchMovie(query)
      setMovies(movies)
    } catch (error) {
      setMovies(null)
      setError(error)
    } finally {
      setLoading(false)
    }
  }
  return { movies, error, loading, searchMovies }
}
