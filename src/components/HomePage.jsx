import { Container, Row, Col, Card } from "react-bootstrap"

export default function HomePage() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <Card>
            <Card.Body className="text-center py-5">
              <h1 className="text-success mb-4">Bienvenido al Sistema de Gestión</h1>
              <p className="lead text-muted">Club de Campo La Federala - Sistema de Administración de Propiedades</p>
              <p className="text-muted">
                Utilice la navegación superior para acceder a las diferentes secciones del sistema.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
