import {Badge, Button, Modal} from 'react-bootstrap';

export const MovieDetailModal = ({show, onClose, movie, onEdit, onDelete}) => {
  if (!movie) return null;

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
      <Modal show={show} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='d-flex'>
            <div className='p-4'>
              <img  src={`http://localhost:4000${movie.poster}`} alt="poster" className="img-fluid mb-3" />
            </div>
            <div>
              <div className='d-flex justify-content-between'>
                <span>{movie.type === 1 ? '🎬 Película' : '📺 Serie'}</span>
                <div className='d-flex'>
                  <span>{movie.rating} ⭐</span>
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
              </div>
              <div className='d-flex justify-content-between my-2'>
                <p><strong>Año de publicación:</strong> {movie.year_published}</p>
                <p><strong>Año de visionado:</strong> {movie.year_watched}</p>
              </div>

              {movie.type === 1 ? (
                <span><strong>Duración:</strong> {movie.duration}min</span>
              ) : (
                <span><strong>Temporadas:</strong> {movie.seasons}</span>
              )}

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

              {movie.synopsis && <p><strong>Sinopsis:</strong> {movie.synopsis}</p>}
              {movie.notes && <p><strong>Notas:</strong> {movie.notes}</p>}
              
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => onEdit(movie)}>Editar</Button>
          <Button variant="danger" onClick={() => onDelete(movie.movie_id)}>Eliminar</Button>
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
