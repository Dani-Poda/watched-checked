import { FloatingAddButton } from "./components/FloatingAddButton/FloatingAddButton";
import { AddMovieModal } from "./components/AddMovieModal/AddMovieModal";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleAdd = () => {
    setShowModal(true);
  }

  const handleClose = ()=>{
    setShowModal(false);
  }

  const handleSave = (movieData, file) => {
    console.log('Datos película:', movieData)
    console.log('Archivo:', file)
    setShowModal(false)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Watched & Checked</h1>

      <FloatingAddButton onClick={handleAdd} />
      <AddMovieModal show={showModal} onClose={handleClose} onSave={handleSave}/>
    </div>
  )
}

export default App;