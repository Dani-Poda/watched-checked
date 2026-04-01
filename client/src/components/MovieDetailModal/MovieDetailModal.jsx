import {Badge, Button, Modal} from 'react-bootstrap';
import './movieDetailModal.css';
import PlaceholderPoster from '../../assets/images/no_disponible.png';

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
      <Modal show={show} onHide={onClose} size="xl" centered className='detail-modal'>
        <Modal.Header closeButton className="border-0 pb-0">
          {/* Título movido aquí o dentro del body para más estilo */}
        </Modal.Header>

        <Modal.Body className="pt-0">
          <div className='row'>
            {/* Columna Izquierda: Póster */}
            <div className='col-md-4 text-center'>
              {movie.poster ? (
                <img className="img-fluid detail-poster shadow-lg" src={`http://localhost:4000${movie.poster}`} />
              ) : (
                <img className="img-fluid detail-poster shadow-lg" src={PlaceholderPoster}/>
              )}

            </div>

            {/* Columna Derecha: Información */}
            <div className='col-md-8 detail-content'>
              <h2 className='detail-title mb-1'>{movie.title}</h2>
              
              <div className='d-flex align-items-center gap-3 mb-4 flex-wrap'>
                <span className="detail-year">{movie.year_published}</span>
                <span className="detail-type-badge">
                  {movie.type === 1 ? '🎬 Película' : '📺 Serie'}
                </span>
                <div className="detail-rating">
                  <span>{movie.rating}</span> <span className="star">★</span>
                </div>
                {/* Usamos la clase global que creamos antes */}
                <Badge className={`status-badge status-${movie.status}`}>
                  {movie.status === 1 ? "Vista" : movie.status === 2 ? "Pendiente" : movie.status === 3 ? "Viendo" : "Abandonada"}
                </Badge>
              </div>

              <div className='info-grid mb-4'>
                <p><strong>Visionado:</strong> {movie.year_watched || '---'}</p>
                <p>
                  <strong>{movie.type === 1 ? 'Duración:' : 'Temporadas:'}</strong> 
                  {movie.type === 1 ? ` ${movie.duration} min` : ` ${movie.seasons}`}
                </p>
              </div>

              {movie.genres && (
                <div className="mb-4 d-flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span key={genre.genre_id} className={`genre-badge ${getGenreClass(genre.genre_name)}`}>
                      {genre.genre_name}
                    </span>
                  ))}
                </div>
              )}

              <div className='detail-text-section'>
                <h6>Sinopsis</h6>
                <p className='detail-synopsis'>{movie.synopsis || "Sin sinopsis disponible."}</p>
                
                {movie.notes && (
                  <>
                    <h6>Mis Notas</h6>
                    <p className='notes-box'>{movie.notes}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0">
          <Button variant="outline-light" onClick={() => onEdit(movie)}>Editar</Button>
          <Button variant="outline-danger" onClick={() => onDelete(movie.movie_id)}>Eliminar</Button>
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
