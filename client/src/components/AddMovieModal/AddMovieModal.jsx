import { useEffect, useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const initialValue = {
  title: "",
  type: 1,
  year_published: "",
  year_watched: "",
  synopsis: "",
  rating: 10,
  duration: "",
  seasons: "",
  notes: "",
  status: 1
}

export const AddMovieModal = ({show, onClose, onSave, movieToEdit, genres}) => {
  const [movieData, setMovieData] = useState(movieToEdit || initialValue);
  const [file, setFile] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleChange = (e)=> {
    const {name, value} = e.target;
    setMovieData({...movieData, [name]:value})
  }

  const handleFile = (e)=> {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  const handleGenreChange = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    onSave(movieData, file, selectedGenres)
  }

  useEffect(() => {
    if (movieToEdit) {
      const cleanedData = Object.keys(movieToEdit).reduce((acc, key) => {
        acc[key] = movieToEdit[key] === null ? "" : movieToEdit[key];
        return acc;
      }, {});
      setMovieData(cleanedData);
      setFile(null);
      
      if (movieToEdit.genres && movieToEdit.genres.length > 0) {
        const genreIds = movieToEdit.genres.map(g => g.genre_id);
        setSelectedGenres(genreIds);
      } else {
        setSelectedGenres([]);
      }
    } else {
      setMovieData(initialValue);
      setFile(null);
    }
  }, [movieToEdit, show]);



  return (
    <>
      <Modal show={show} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {movieToEdit ? "Editar película o serie" : "Añadir película o serie"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Título</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Añade el título de la película"
                name="title"
                onChange={handleChange}
                value={movieData.title}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Tipo</Form.Label>
              <Form.Select onChange={handleChange} value={movieData.type} name='type' id='type'>
                <option>Selecciona una opción</option>
                <option value="1">Película</option>
                <option value="2">Serie</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="poster">
              <Form.Label>Poster</Form.Label>
              <Form.Control 
                type='file'
                name="poster"
                onChange={handleFile}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="year_published">
              <Form.Label>Año de publicación</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Añade el título de la película"
                name="year_published"
                onChange={handleChange}
                value={movieData.year_published}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="year_watched">
              <Form.Label>Año de visionado</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Añade el título de la película"
                name="year_watched"
                onChange={handleChange}
                value={movieData.year_watched}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="synopsis">
              <Form.Label>Sinoposis</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                placeholder="Añade la sinopsis"
                name="synopsis"
                onChange={handleChange}
                value={movieData.synopsis}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Select onChange={handleChange} value={movieData.rating} id='rating' name='rating' >
                <option>Puntua</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Form.Select>
            </Form.Group>
            
            {parseInt(movieData.type) === 1 ?  (        <Form.Group className="mb-3" controlId="duration">
                <Form.Label>Duración</Form.Label>
                <Form.Control 
                  type="number" 
                  name="duration"
                  onChange={handleChange}
                  value={movieData.duration}
                />
              </Form.Group>
              ) : (
                <Form.Group className="mb-3" controlId="seasons">
                  <Form.Label>Temporadas</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="seasons"
                    onChange={handleChange}
                    value={movieData.seasons}
                  />
                </Form.Group>
              )
            }

            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Notas</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                placeholder="Añade el título de la película"
                name="notes"
                onChange={handleChange}
                value={movieData.notes}
              />
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="genre">
              <Form.Label>Géneros</Form.Label>
              <div>
                {genres.map(genre => (
                  <Form.Check 
                    key={genre.genre_id}
                    type="checkbox"
                    id={`genre-${genre.genre_id}`}
                    label={genre.genre_name}
                    checked={selectedGenres.includes(genre.genre_id)}
                    onChange={() => handleGenreChange(genre.genre_id)}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Estado</Form.Label>
              <Form.Select onChange={handleChange} value={movieData.status} name="status" id="status">
                <option>Selecciona el estado</option>
                <option value="1">Vista</option>
                <option value="2">Pendiente</option>
                <option value="3">Viendo</option>
                <option value="4">Abandonada</option>
              </Form.Select>
            </Form.Group>
            
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={onClose}>Cancelar</Button>
              <Button variant="primary" type="submit">{movieToEdit ? "Actualizar" : "Guardar"}</Button>
            </div>
          </Form>
        </Modal.Body>

      </Modal>
    </>
  )
}
