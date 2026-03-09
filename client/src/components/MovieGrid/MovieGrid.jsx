import { MovieCard } from '../MovieCard/MovieCard';

export const MovieGrid = ({movies, onCardClick}) => {
  return (
    <div className='row'>
      {movies.map (movie => (
        <div key={movie.movie_id} className="col-md-4 mb-4">
          <MovieCard movie={movie} onClick={onCardClick}/>
        </div>
      ))}
    </div>
  )
}
