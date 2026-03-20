import {Button, Col, Form, Row} from 'react-bootstrap';

export const Filters = ({onTypeChange, onStatusChange, onSortChange, onSearchChange, onClearFilters}) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Busqueda</Form.Label>
        <Form.Control 
          type='text'
          onChange={(e)=> onSearchChange(e.target.value)}
        >
        </Form.Control>
      </Form.Group>

      <Row className='mb-4'>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Select onChange={(e)=> onTypeChange(e.target.value)}>
              <option value=''>Todas</option>
              <option value='1'>Películas</option>
              <option value='2'>Series</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Form.Group>
            <Form.Label>Estado</Form.Label>
            <Form.Select onChange={(e)=> onStatusChange(e.target.value)}>
              <option value=''>Todos</option>
              <option value='1'>Vista</option>
              <option value='2'>Pendiente</option>
              <option value='3'>Viendo</option>
              <option value='4'>Abandonada</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Ordenar por</Form.Label>
            <Form.Select onChange={(e) => onSortChange(e.target.value)}>
              <option value="newest">Vista más reciente</option>
              <option value="oldest">Vista más antigua</option>
              <option value="rating-high">Rating: Mayor a menor</option>
              <option value="rating-low">Rating: Menor a mayor</option>
              <option value="year_published-high">Año: Reciente a antigua</option>
              <option value="year_published-low">Año: Antigua a reciente</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mb-3">
        <Button variant="outline-secondary" size="sm" onClick={onClearFilters}>
          Limpiar filtros
        </Button>
      </div>
    </>
  )
}
