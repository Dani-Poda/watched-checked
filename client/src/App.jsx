import { useEffect, useState } from 'react'
import { FloatingAddButton } from "./components/FloatingAddButton/FloatingAddButton";
import { AddMovieModal } from "./components/AddMovieModal/AddMovieModal";
import { moviesAPI, genresAPI } from './services/api';
import { MovieGrid } from './components/MovieGrid/MovieGrid';
import { MovieDetailModal } from './components/MovieDetailModal/MovieDetailModal';
import { Filters } from './components/Filters/Filters';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [movies, setMovies] = useState([])
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState();
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [genres, setGenres] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [searchText, setSearchText] = useState('');

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

  const getFilteredMovies = () => {
    let filtered = [...movies];  // Copiar array

    // Filtrar por tipo
    if (filterType && filterType !== '') {
      filtered = filtered.filter(m => m.type === parseInt(filterType));
    }
    
    // Filtrar por estado
    if (filterStatus && filterStatus !== '') {
      filtered = filtered.filter(m => m.status === parseInt(filterStatus));
    }
    
    // Ordenar
    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.movie_id - a.movie_id);
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => a.movie_id - b.movie_id);
    } else if (sortBy === 'rating-high') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'rating-low') {
      filtered.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'year_published-high') {
      filtered.sort((a, b) => b.year_published - a.year_published);
    }else if (sortBy === 'year_published-low') {
      filtered.sort((a, b) => a.year_published -b.year_published);
    }

    // Buscar por nombre
    if (searchText && searchText !== '') {
      filtered = filtered.filter(m => m.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    
    return filtered;
  }

  const handleClearFilters = () => {
    setSearchText('');
    setFilterType('');
    setFilterStatus('');
    setSortBy('newest');
  }

  return (
    <div className='main-wrapper'>
      <div className="container mt-5">
        <header className="text-center mb-5">
          <h1 className="display-1">Watched & Checked</h1>
          <p className="text-white-50">Tu biblioteca personal de cine</p>
        </header>

        <section className="filter-section p-4 mb-5 shadow-sm">
          <Filters
            onTypeChange={setFilterType}
            onStatusChange={setFilterStatus}
            onSortChange={setSortBy}
            onSearchChange={setSearchText}
            onClearFilters={handleClearFilters}
          />
        </section>

        <MovieGrid movies={getFilteredMovies()} onCardClick={handleCardClick}/>

        <FloatingAddButton onClick={handleAdd} />

        <AddMovieModal
          show={showModal}
          onClose={handleClose}
          onSave={handleSave}
          movieToEdit={movieToEdit}
          genres={genres}
        />


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
    </div>
  )
}

export default App;