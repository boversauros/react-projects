import response from './mocks/search-response.json'

export function Home () {
  return (
    <>
      <h1>Search Movies</h1>
      <form className='search-form'>
        <input type='text' placeholder='Search for a movie...' />
        <button>Search</button>
      </form>
      <section className='movies'>
        {response.Search.map(movie => (
          <a href='#' className='movie' key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <div className='movie-info'>
              <h2>{movie.Title}</h2>
              <time>{movie.Year}</time>
            </div>
          </a>))}
      </section>
    </>
  )
}
