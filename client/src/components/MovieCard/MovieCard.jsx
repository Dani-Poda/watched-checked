import { Card } from "react-bootstrap"


export const MovieCard = ({movie, onClick}) => {
  return (
    <>
      <Card 
        className="h-100"
        onClick={() => onClick(movie)}
        style={{ cursor: 'pointer' }}
      >
        {movie.poster ? (
          <Card.Img variant="top" src={`http://localhost:4000${movie.poster}`} />
        ) : (
          <div style={{height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem'}}>
            🎬
          </div>
        )}
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>
            <span>Tipo: {movie.type === 1 ? 'Película' : 'Serie'}</span>
            <span>Año: {movie.year_published}</span>
            <span>⭐ {movie.rating}/10</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
