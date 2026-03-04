import './floatingAddButton.css'

export const FloatingAddButton = ({onClick}) => {
  return (
    <>
      <button className="addButton btn btn-primary rounded-circle" onClick={onClick}>+</button>
    </>
  )
}
