import { useEffect, useState } from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import './addMovieModal.css';

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
      setSelectedGenres([]); 
    }
  }, [movieToEdit, show]);



  return (
    <>
      <Modal show={show} onHide={onClose} size="lg" centered className="add-movie-modal">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">
            {movieToEdit ? "⚡ Editar Título" : "🍿 Añadir a mi Lista"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 pb-4" >
          <Form onSubmit={handleSubmit} className="custom-form">
            <div className='row'>
              <div className='col-md-8'>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Título</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Ej: Inception"
                    name="title"
                    onChange={handleChange}
                    value={movieData.title}
                    required
                  />
                </Form.Group>
              </div>
              <div className='col-md-4'>
                <Form.Group className="mb-3" controlId="type">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select onChange={handleChange} value={movieData.type} name='type' id='type'>
                    <option>Selecciona una opción</option>
                    <option value="1">🎬 Película</option>
                    <option value="2">📺 Serie</option>
                  </Form.Select>
                </Form.Group>
              </div>
            
              <div className='col-md-4'>
                <Form.Group className="mb-3" controlId="poster">
                  <Form.Label>Poster</Form.Label>
                  <Form.Control 
                    type='file'
                    name="poster"
                    onChange={handleFile}
                    className="file-input"
                  />
                </Form.Group>
              </div>
              <div className='col-md-4'>
                <Form.Group className="mb-3" controlId="year_published">
                  <Form.Label>Año de estreno</Form.Label>
                  <Form.Control 
                    type="number" 
                    placeholder="Añade el título de la película"
                    name="year_published"
                    onChange={handleChange}
                    value={movieData.year_published}
                  />
                </Form.Group>
              </div>
              <div className='col-md-4'>
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
              </div>

              <div className='col-md-6'>
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
              </div>
              <div className='col-md-6'>                     
                {parseInt(movieData.type) === 1 ?  (        
                  <Form.Group className="mb-3" controlId="duration">
                    <Form.Label>Duración (min)</Form.Label>
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
              </div>

              <div className="col-12 mb-3">
                <Form.Group className="mb-3" controlId="genre">
                  <Form.Label className="d-block">Géneros</Form.Label>
                  <div className="genres-selection-grid">
                    {genres.map(genre => (
                      <div key={genre.genre_id} className="genre-chip-item">
                        <input 
                          type="checkbox" 
                          id={`genre-${genre.genre_id}`} 
                          checked={selectedGenres.includes(genre.genre_id)}
                          onChange={() => handleGenreChange(genre.genre_id)}
                        />
                        <label htmlFor={`genre-${genre.genre_id}`}>
                          {genre.genre_name}
                        </label>
                      </div>
                    ))}
                  </div>
                </Form.Group>
              </div>
              <div className="col-12 mb-4">
                <Form.Label className="d-block">Estado</Form.Label>
                <div className="status-selection-grid">
                  {[
                    { id: 1, label: "Vista", class: "status-1" },
                    { id: 2, label: "Pendiente", class: "status-2" },
                    { id: 3, label: "Viendo", class: "status-3" },
                    { id: 4, label: "Abandonada", class: "status-4" }
                  ].map((st) => (
                    <div key={st.id} className="status-chip-item">
                      <input 
                        type="radio" 
                        name="status"
                        id={`status-${st.id}`} 
                        value={st.id}
                        checked={parseInt(movieData.status) === st.id}
                        onChange={(e) => setMovieData({...movieData, status: parseInt(e.target.value)})}
                      />
                      <label htmlFor={`status-${st.id}`} className={st.class}>
                        {st.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className='col-md-6'>
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
              </div>
              <div className='col-md-6'>
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
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="outline-light" onClick={onClose} className="px-4">Cancelar</Button>
              <Button variant="primary" type="submit" className="px-4 fw-bold">{movieToEdit ? "Actualizar" : "Guardar"}</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
