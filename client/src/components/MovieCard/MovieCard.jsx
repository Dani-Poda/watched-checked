import { Card } from "react-bootstrap"


export const MovieCard = ({movie}) => {
  return (
    <>
      <Card className="h-100">
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
            <div>Tipo: {movie.type === 1 ? 'Película' : 'Serie'}</div>
            <div>Año: {movie.year_published}</div>
            <div>⭐ {movie.rating}/10</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
