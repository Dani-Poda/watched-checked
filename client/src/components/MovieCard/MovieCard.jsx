import { Card, Badge } from "react-bootstrap";
import './movieCard.css';
import PlaceholderPoster from '../../assets/images/no_disponible.png';


export const MovieCard = ({ movie, onClick }) => {
  const getGenreClass = (genreName) => {
    if (!genreName) return "genre-default";
    const normalized = genreName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');
    
    return `genre-${normalized}`;
  }

  return (
    <Card className="movie-card" onClick={() => onClick(movie)}>
      <div className="poster-wrapper">
        <div className="score-tag">
          {movie.rating} <span>★</span>
        </div>

        {movie.poster ? (
          <Card.Img className="movie-card-poster" src={`http://localhost:4000${movie.poster}`} />
        ) : (
          <Card.Img className="movie-card-poster-placeholder" src={PlaceholderPoster}/>
        )}
      </div>

      <Card.Body className="movie-card-body">
        {/* Fila superior: Icono y Status */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="type-icon">{movie.type === 1 ? '🎬' : '📺'}</span>
          <Badge className={`status-badge status-${movie.status}`}>
            {movie.status === 1 ? "Vista" :
             movie.status === 2 ? "Pendiente" :
             movie.status === 3 ? "Viendo" :
             "Abandonada"}
          </Badge>
        </div>

        {/* Título fuera del d-flex anterior para que ocupe su propia línea */}
        <Card.Title className="movie-card-title">{movie.title}</Card.Title>

        <div className="movie-card-info">
          <span className="year-text text-white-50">{movie.year_published}</span>
          <div className="genre-container mt-2">
            {movie.genres?.slice(0, 2).map(genre => (
              <span 
                key={genre.genre_id} 
                className={`genre-badge ${getGenreClass(genre.genre_name)}`}
              >
                {genre.genre_name}
              </span>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}