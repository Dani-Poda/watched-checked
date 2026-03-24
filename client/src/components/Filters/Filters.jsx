import {Button, Col, Form, InputGroup, Row} from 'react-bootstrap';
import './filters.css';

export const Filters = ({onTypeChange, onStatusChange, onSortChange, onSearchChange, onClearFilters}) => {
  return (
    <>
      <div className='filters-wrapper'>
        <div className='filters-container'>
          <Row className='align-items-end g-3'>
            <Col lg={4} md={12}>
              <Form.Group>
                <Form.Label className="filter-label">Busqueda</Form.Label>
                <InputGroup>
                  <InputGroup.Text className='search-icon'>🔍</InputGroup.Text>
                  <Form.Control
                    type='text'
                    placeholder="Buscar por título..."
                    onChange={(e)=> onSearchChange(e.target.value)}
                    className="search-input"
                  >
                  </Form.Control>
                </InputGroup>
              </Form.Group>
            </Col>
            
            <Col lg={2} md={4}>
              <Form.Group>
                <Form.Label className='filter-label'>Tipo</Form.Label>
                <Form.Select onChange={(e)=> onTypeChange(e.target.value)} className='filter-select'>
                  <option value=''>Todas</option>
                  <option value='1'>Películas</option>
                  <option value='2'>Series</option>
                </Form.Select>
              </Form.Group>
            </Col>
        
            <Col log={2} md={4}>
              <Form.Group>
                <Form.Label className="filter-label">Estado</Form.Label>
                <Form.Select onChange={(e)=> onStatusChange(e.target.value)} className="filter-select">
                  <option value=''>Todos</option>
                  <option value='1'>Vista</option>
                  <option value='2'>Pendiente</option>
                  <option value='3'>Viendo</option>
                  <option value='4'>Abandonada</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col lg={3} md={4}>
              <Form.Group>
                <Form.Label className="filter-label">Ordenar</Form.Label>
                <Form.Select onChange={(e) => onSortChange(e.target.value)} className="filter-select">
                  <option value="newest">📅 Agregada: Recientes</option>
                  <option value="oldest">📅 Agregada: Antiguas</option>
                  <option value="rating-high">⭐ Rating: Mejor puntuadas</option>
                  <option value="rating-low">⭐ Rating: Peor puntuadas</option>
                  <option value="year_published-high">🎬 Estreno: Más actuales</option>
                  <option value="year_published-low">🎬 Estreno: Más antiguas</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col lg={1} md={12} className="d-flex justify-content-end">
              <Button variant="link" title="Limpiar filtros" onClick={onClearFilters} className='clear-btn text-decoration-none'>
                🧹
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}
