import './floatingAddButton.css'

export const FloatingAddButton = ({onClick}) => {
  return (
    <>
      <button 
        className="floating-add-btn" 
        onClick={onClick}
        title="Añadir nuevo título"
      >
        <span className="plus-icon">+</span>
      </button>
    </>
  )
}
