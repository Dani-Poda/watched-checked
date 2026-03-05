import { useState } from 'react'
import { FloatingAddButton } from "./components/FloatingAddButton/FloatingAddButton";
import { AddMovieModal } from "./components/AddMovieModal/AddMovieModal";
import { moviesAPI } from './services/api';

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    setShowModal(true);
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleSave = async (movieData, file) => {
    try {
      const response = await moviesAPI.createMovie(movieData, file);
      
      console.log('✅ Película creada:', response.data);
      alert('¡Película guardada exitosamente!');
      setShowModal(false);
      
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error al guardar la película');
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
      />
    </div>
  )
}

export default App;