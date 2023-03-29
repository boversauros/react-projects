import { useState } from 'react'
import './App.css'
import { useMovies } from './hooks/useMovies'

function App () {
  const [query, setQuery] = useState('')
  const { movies, error, searchMovies } = useMovies()

  async function handleSubmit (event) {
    event.preventDefault()
    searchMovies({ query })
  }

  return (
    <>
      <h1>Search Movies</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input type='text' placeholder='Search for a movie...' onChange={e => setQuery(e.target.value)} />
        <button>Search</button>
      </form>
      {error && <p>{error.message}</p>}
      <section className='movies'>
        {movies && movies.Search.map(movie => (
          <article className='movie' key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <div className='movie-info'>
              <h2>{movie.Title}</h2>
              <time>{movie.Year}</time>
            </div>
          </article>))}
      </section>
    </>
  )
}

export default App
