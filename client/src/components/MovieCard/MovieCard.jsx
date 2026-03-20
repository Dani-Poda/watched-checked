import { Card, Badge } from "react-bootstrap";
import './movieCard.css';


export const MovieCard = ({movie, onClick}) => {
  const getGenreClass = (genreName) => {
    const normalized = genreName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');
    
    return `genre-${normalized}`;
  }

  return (
    <>
      <Card 
        className="h-80 movie-card p-1"
        onClick={() => onClick(movie)}
        style={{ cursor: 'pointer' }}
      >
        <div className="d-flex">
          <div>
            {movie.poster ? (
              <Card.Img className="movie-card-poster" src={`http://localhost:4000${movie.poster}`} />
            ) : (
              <div className="movie-card-poster d-flex align-items-center justify-content-center">
                🎬
              </div>
            )}
          </div>

          <Card.Body className="mb-2 movie-card-body">
            <div className="d-flex justify-content-between">
              <div>
                <span>{movie.type === 1 ? '🎬' : '📺'}</span>
                <Badge bg={movie.status === 1 ? "success" :
                          movie.status === 2 ? "warning":
                          movie.status === 3 ? "primary":
                          "secondary"
                }>
                  {movie.status === 1 ? "Vista":
                   movie.status === 2 ? "Pendiente":
                   movie.status === 3 ? "Viendo":
                   "Abandonada"
                  }
                </Badge>
              </div>
              <div>
                <span>{movie.rating}⭐</span>
              </div>
            </div>
            <Card.Title className="movie-card-title my-3">{movie.title}</Card.Title>
            <Card.Text className="d-flex flex-column my-2 movie-card-info">
              <span>{movie.year_published}</span>
              {movie.genres && movie.genres.length > 0 && (
                <div className="mt-2">
                  {movie.genres.map(genre => (
                    <span 
                      key={genre.genre_id} 
                      className={`genre-badge ${getGenreClass(genre.genre_name)}`}
                    >
                      {genre.genre_name}
                    </span>
                  ))}
                </div>
              )}
            </Card.Text>
          </Card.Body>
        </div>
      </Card>
    </>
  )
}
