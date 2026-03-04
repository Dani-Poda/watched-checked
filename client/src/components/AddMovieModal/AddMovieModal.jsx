import {Modal, Button} from 'react-bootstrap';

export const AddMovieModal = ({show, onClose, onSave}) => {
  return (
    <>
      <Modal show={show} onHide={onClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Añadir película o serie</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancelar </Button>
          <Button variant="primary" onClick={onSave}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
