import {Button, Modal} from 'react-bootstrap';

export const MovieDetailModal = ({show, onClose, movie}) => {
  if (!movie) return null;

  return (
    <>
      <Modal show={show} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div>
              <img  src={`http://localhost:4000${movie.poster}`} alt="poster" className="img-fluid mb-3" />
            </div>
            <div>
              <p><strong>Tipo:</strong> {movie.type === 1 ? 'Película' : 'Serie'}</p>
              <p>{movie.rating} ⭐</p>
              <p><strong>Año de publicación:</strong> {movie.year_published}</p>
              <p><strong>Año de visionado:</strong> {movie.year_watched}</p>

              {movie.type === 1 ? (
                <p><strong>Duración:</strong> {movie.duration}min</p>
              ) : (
                <p><strong>Temporadas:</strong> {movie.seasons}</p>
              )}

              {movie.synopsis && <p><strong>Sinopsis:</strong> {movie.synopsis}</p>}
              {movie.notes && <p><strong>Notas:</strong> {movie.notes}</p>}
              
              
              <p>
                <strong>Estado:</strong> {
                  movie.status === 1 ? 'Vista' :
                  movie.status === 2 ? 'Pendiente' :
                  movie.status === 3 ? 'Viendo' :
                  'Abandonada'
                }
              </p>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
