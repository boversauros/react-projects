import './App.css'
import response from './mocks/search-response.json'
import singleResponse from './mocks/single-response.json'

// const API_KEY = import.meta.env.VITE_API_KEY
function ModalMovie () {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>{singleResponse.Title}</h2>
          <button className='close-modal-btn'>X</button>
        </div>
        <div className='modal-body'>
          <img src={singleResponse.Poster} alt={singleResponse.Title} />
          <div className='movie-info'>
            <p>{singleResponse.Plot}</p>
            <ul>
              <li>
                <strong>Genre:</strong> {singleResponse.Genre}
              </li>
              <li>
                <strong>Released:</strong> {singleResponse.Released}
              </li>
              <li>
                <strong>Rated:</strong> {singleResponse.Rated}
              </li>
              <li>
                <strong>IMDB Rating:</strong> {singleResponse.imdbRating}
              </li>
              <li>
                <strong>Director:</strong> {singleResponse.Director}
              </li>
              <li>
                <strong>Writer:</strong> {singleResponse.Writer}
              </li>
              <li>
                <strong>Actors:</strong> {singleResponse.Actors}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function App () {
  return (
    <>
      <h1>Search Movies</h1>
      <form className='search-form'>
        <input type='text' placeholder='Search for a movie...' />
        <button>Search</button>
      </form>
      <section className='movies'>
        {response.Search.map(movie => (
          <article className='movie' key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <div className='movie-info'>
              <h2>{movie.Title}</h2>
              <time>{movie.Year}</time>
            </div>
            <button className='movie-btn'>More Info</button>
          </article>))}
      </section>
      <ModalMovie />
    </>
  )
}

export default App
