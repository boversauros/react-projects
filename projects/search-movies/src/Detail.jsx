import response from './mocks/single-response.json'

export function Detail ({ params }) {
  return (
    <>
      <h1>{response.Title}</h1>
      <img src={response.Poster} alt={response.Title} />
      <p>{response.Plot}</p>
    </>
  )
}
