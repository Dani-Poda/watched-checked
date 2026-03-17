import { useEffect, useState } from 'react'
import { FloatingAddButton } from "./components/FloatingAddButton/FloatingAddButton";
import { AddMovieModal } from "./components/AddMovieModal/AddMovieModal";
import { moviesAPI, genresAPI } from './services/api';
import { MovieGrid } from './components/MovieGrid/MovieGrid';
import { MovieDetailModal } from './components/MovieDetailModal/MovieDetailModal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState([])
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState();
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [genres, setGenres] = useState([]);

  const handleAdd = () => {
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
    setMovieToEdit(null);
  }

  const handleSave = async (movieData, file, selectedGenres) => {
    try {

      if (movieToEdit) {
        // Modo edición
        await moviesAPI.editMovie(movieData, file, selectedGenres);
        alert('¡Película actualizada!');
      } else {
        // Modo creación
        await moviesAPI.createMovie(movieData, file, selectedGenres);
        alert('¡Película guardada!');
      }

      await fetchMovies();
      setShowModal(false);
      setMovieToEdit(null);
      
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error al guardar la película');
    }
  }

  const handleEdit = async(movie)=> {
      setMovieToEdit(movie);
      setShowDetailModal(false);
      setShowModal(true);
  }

  const fetchMovies = async()=> {
    try {
      const response = await moviesAPI.getAll();
      setMovies(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(()=>{
    fetchMovies();
    fetchGenres();
  },[])

  const handleCardClick = (movie)=> {
    setSelectedMovie(movie);
    setShowDetailModal(true);
  }

  const handleCloseDetail = ()=> {
    setShowDetailModal(false);
  }

  const handleDelete = async(movie_id)=> {
    if (!window.confirm('¿Estás seguro de eliminar esta película?')) {
    return;
  }
    try {
      await moviesAPI.deleteMovie(movie_id);
      alert('Película o serie borrada');
      await fetchMovies();
      setShowDetailModal(false);
    } catch (error) {
      console.log('Error:', error);
      alert('Error al eliminar');
    }
  }

  const fetchGenres = async()=> {
    try {
      const response = await genresAPI.getAll();
      setGenres(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Watched & Checked</h1>

      <FloatingAddButton onClick={handleAdd} />
      <AddMovieModal 
        show={showModal} 
        onClose={handleClose} 
        onSave={handleSave}
        movieToEdit={movieToEdit} 
        genres={genres} 
      />
      <MovieGrid movies={movies} onCardClick={handleCardClick}/>

      {selectedMovie && 
        <MovieDetailModal 
          show={showDetailModal}
          onClose={handleCloseDetail}
          movie= {selectedMovie}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      }
    </div>
  )
}

export default App;