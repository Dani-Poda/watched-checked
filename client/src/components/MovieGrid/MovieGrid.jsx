import { MovieCard } from '../MovieCard/MovieCard';

export const MovieGrid = ({movies, onCardClick}) => {
  return (
    <div className='row g-4 justify-content-center'>
      {movies.map (movie => (
        <div key={movie.movie_id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <MovieCard movie={movie} onClick={onCardClick}/>
        </div>
      ))}
    </div>
  )
}
