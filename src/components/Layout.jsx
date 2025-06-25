"use client"

import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { mockLots, mockUser } from "../lib/data"
import Header from "./Header"
import Botones from "./Botones"
import FilterBar from "./FilterBar"
import SidePanel from "./SidePanel"
import User from "./User"
import LotInfo from "./LotInfo"

{/* Estilos globales */}
const customStyles = `
  .brand-dark-green { background-color: #0b3d23 !important; border-color: #0b3d23 !important; }
  .brand-pale-green { background-color: #e6efe9 !important; }
  .brand-accent-yellow { background-color: #ffd700 !important; color: #000 !important; }
  .text-brand-dark-green { color: #0b3d23 !important; }
  .border-brand-dark-green { border-color: #0b3d23 !important; }
  .navbar-brand-green { background-color: #0b3d23 !important; }
  .status-dot-disponible { background-color: #28a745; }
  .status-dot-vendido { background-color: #dc3545; }
  .status-dot-reservado { background-color: #ffc107; }
  .status-dot-construccion { background-color: #007bff; }
  .parcel-hover:hover { 
    border: 2px solid #ffd700 !important; 
    background-color: rgba(255, 215, 0, 0.3) !important;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  }
  .table-row-hover:hover { background-color: rgba(230, 239, 233, 0.5) !important; }
  .sticky-top-custom { position: sticky; top: 0; z-index: 1020; }
  .map-container { height: 600px; position: relative; background-color: #e6efe9; }
  .parcel-overlay { 
    position: absolute; 
    width: 48px; 
    height: 48px; 
    border: 2px solid transparent; 
    cursor: pointer; 
    transition: all 0.15s ease;
  }
  .parcel-label {
    position: absolute;
    top: -32px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    opacity: 0;
    transition: all 0.15s ease;
  }
  .parcel-overlay:hover .parcel-label { opacity: 1; }
  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
  }
`

export default function Layout({ children }) {
  {/* controlan el panel lateral de detalles de lote */}
  const [selectedLotId, setSelectedLotId] = useState(null)
  const [showSidePanel, setShowSidePanel] = useState(false)
  {/* abren los modales de perfil y cuenta */}
  const [showUserModal, setShowUserModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  {/* manejan el modal de creación/edición de lote. */}
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [editingLot, setEditingLot] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  {/* almacena los valores actuales de búsqueda y filtros */}
  const [filters, setFilters] = useState({
    search: "",
    owner: [],
    location: [],
    status: [],
    subStatus: [],
  })
  {/* lista mutable de lotes */}
  const [lotsData, setLotsData] = useState(mockLots)

  const navigate = useNavigate()
  const location = useLocation()

  const currentLot = lotsData.find((lot) => lot.id === selectedLotId) || null


  const getStatusDotClass = (status) => {
    switch (status) {
      case "Disponible":
        return "status-dot-disponible"
      case "Vendido":
        return "status-dot-vendido"
      case "Reservado":
        return "status-dot-reservado"
      case "En Construccion":
        return "status-dot-construccion"
      default:
        return "bg-secondary"
    }
  }

  const getSubStatusVariant = (subStatus) => {
    switch (subStatus) {
      case "En promoción":
        return "warning"
      case "Reservado":
        return "warning"
      case "Vendido":
        return "danger"
      default:
        return "success"
    }
  }

  {/* Funciones auxiliaries para mannipular los const definidos al principio de la funcion layout 
      Todos los handlers son para abrir los modales correspondientes    
    */}
  const handleParcelClick = (lotId) => {
    setSelectedLotId(lotId)
    setShowSidePanel(true)
  }

  const handleCloseSidePanel = () => {
    setShowSidePanel(false)
    setSelectedLotId(null)
  }

  const handleUserClick = () => {
    setShowUserModal(true)
  }

  const handleViewDetail = (lotId) => {
    setSelectedLotId(lotId)
    setEditingLot(lotsData.find((lot) => lot.id === lotId))
    setShowDetailModal(true)
    setShowSidePanel(false)
  }

  const handleSaveLot = () => {
    if (editingLot) {
      setLotsData((prev) => prev.map((lot) => (lot.id === editingLot.id ? editingLot : lot)))
      setIsEditing(false)
      alert("Lote guardado exitosamente")
    }
  }

  const handleDeleteLot = (lotId) => {
    if (window.confirm("¿Está seguro de eliminar este lote?")) {
      setLotsData((prev) => prev.filter((lot) => lot.id !== lotId))
      alert("Lote eliminado")
    }
  }

  const filteredLots = lotsData.filter((lot) => {
    if (filters.search && !lot.id.toLowerCase().includes(filters.search.toLowerCase())) return false
    if (filters.owner.length > 0 && !filters.owner.includes(lot.owner)) return false
    if (filters.location.length > 0 && !filters.location.includes(lot.location || "")) return false
    if (filters.status.length > 0 && !filters.status.includes(lot.status)) return false
    if (filters.subStatus.length > 0 && !filters.subStatus.includes(lot.subStatus)) return false
    return true
  })

  const clearFilters = () => {
    setFilters({
      search: "",
      owner: [],
      location: [],
      status: [],
      subStatus: [],
    })
  }

  const toggleFilter = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }))
  }

  const handleAddRecord = () => {
    alert("Acción Añadir Nuevo Registro")
  }

  const handleApplyPromotion = () => {
    alert("Acción Aplicar Promoción")
  }

  const handleClearFilters = () => {
    setFilters({
      search: "",
      owner: [],
      location: [],
      status: [],
      subStatus: [],
    })
  }

  {/* Renderizado */}
  return (
    <div className="min-vh-100 d-flex flex-column bg-white">
      <style>{customStyles}</style>
      <Header onUserClick={handleUserClick} user={mockUser} /> {/* Cuando hace click se abre l modal de usuario con los datos del usuario cargados (user=mockuser) */}
      <Botones />
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        onAddRecord={handleAddRecord}
        onApplyPromotion={handleApplyPromotion}
        onClearFilters={handleClearFilters}
      />

      <main className="flex-grow-1">
      {/*  {location.pathname === "/lotes" && (
          <Container className="py-4">
            <Card>
              <Card.Body className="p-0">
                <Table hover responsive>
                  <thead className="table-light">
                    <tr>
                      <th width="50"></th>
                      <th>ID</th>
                      <th>Estado</th>
                      <th>Sub-Estado</th>
                      <th>Propietario</th>
                      <th>Ubicación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLots.map((lot) => (
                      <tr key={lot.id} className="table-row-hover">
                        <td>
                          <div className={`status-dot ${getStatusDotClass(lot.status)}`}></div>
                        </td>
                        <td>
                          <Badge bg="light" text="dark">
                            {lot.id}
                          </Badge>
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle variant="outline-secondary" size="sm">
                              {lot.status}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {["Disponible", "Vendido", "Reservado", "En Construccion"].map((status) => (
                                <Dropdown.Item
                                  key={status}
                                  onClick={() => {
                                    setLotsData((prev) => prev.map((l) => (l.id === lot.id ? { ...l, status } : l)))
                                  }}
                                >
                                  {status}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td>
                          <Badge bg={getSubStatusVariant(lot.subStatus)}>{lot.subStatus}</Badge>
                        </td>
                        <td>
                          <Badge variant="outline-success">{lot.owner}</Badge>
                        </td>
                        <td>
                          <small className="text-muted">{lot.location}</small>
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => alert(`Registrar venta ${lot.id}`)}
                            >
                              Registrar venta
                            </Button>
                            <Button variant="outline-primary" size="sm" onClick={() => handleViewDetail(lot.id)}>
                              <i className="bi bi-eye"></i>
                            </Button>
                            <Button variant="outline-warning" size="sm" onClick={() => alert(`Editar ${lot.id}`)}>
                              <i className="bi bi-pencil"></i>
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDeleteLot(lot.id)}>
                              <i className="bi bi-trash"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {filteredLots.length === 0 && (
                  <div className="text-center py-5">
                    <p className="text-muted">No se encontraron lotes que coincidan con los filtros aplicados.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Container>
        )}

        {location.pathname === "/map" && (
          <Container fluid className="py-4">
            <div className="map-container rounded">
              <img
                src="https://lafederalaclub.com/contenidos/uploads/2025/04/Plano-con-Vendidos.jpg"
                alt="Mapa del Club de Campo La Federala"
                className="img-fluid w-100 h-100"
                style={{ objectFit: "contain" }}
              /> */}
              {/* Clickable Parcels */}{/*
              {mockLots.slice(0, 4).map((lot, index) => (
                <div
                  key={lot.id}
                  className="parcel-overlay parcel-hover"
                  style={{
                    top: `${25 + index * 15}%`,
                    left: `${30 + index * 10}%`,
                  }}
                  onClick={() => handleParcelClick(lot.id)}
                >
                  <div className="parcel-label">{lot.id}</div>
                </div>
              ))}
            </div>
          </Container>
        )}
        */}

        {React.cloneElement(children, {
          filters,
          selectedLotId,
          onParcelClick: handleParcelClick,
          onSelectLot: setSelectedLotId,
        })}
      </main>

      <SidePanel
        show={showSidePanel}
        onHide={handleCloseSidePanel}
        selectedLotId={selectedLotId}
        onViewDetail={setSelectedLotId} 
      />



      {/* Side Panel for Map */}
      {/*}
      <Offcanvas show={showSidePanel} onHide={() => setShowSidePanel(false)} placement="end" style={{ width: "400px" }}>
        <Offcanvas.Header closeButton className="brand-pale-green">
          <Offcanvas.Title className="text-brand-dark-green">Lote #{currentLot?.id}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {currentLot && (
            <>
              {/* Image Carousel */}{/*
              <Carousel className="mb-4">
                {(currentLot.images || []).map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image || "/placeholder.svg"}
                      alt={`Imagen ${index + 1} de Lote ${currentLot.id}`}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              {/* Data Fields */}{/*
              <div className="mb-4">
                <Row className="g-3">
                  <Col xs={6}>
                    <Card className="brand-pale-green">
                      <Card.Body className="p-3">
                        <small className="text-muted text-uppercase">ID</small>
                        <div className="fw-bold text-brand-dark-green">{currentLot.id}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={6}>
                    <Card className="brand-pale-green">
                      <Card.Body className="p-3">
                        <small className="text-muted text-uppercase">Estado</small>
                        <div className="fw-bold text-brand-dark-green">{currentLot.status}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12}>
                    <Card className="brand-pale-green">
                      <Card.Body className="p-3">
                        <small className="text-muted text-uppercase">Propietario</small>
                        <div className="fw-bold text-brand-dark-green">{currentLot.owner}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={6}>
                    <Card className="brand-pale-green">
                      <Card.Body className="p-3">
                        <small className="text-muted text-uppercase">Superficie</small>
                        <div className="fw-bold text-brand-dark-green">{currentLot.surface || "N/A"}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={6}>
                    <Card className="brand-pale-green">
                      <Card.Body className="p-3">
                        <small className="text-muted text-uppercase">Precio</small>
                        <div className="fw-bold text-brand-dark-green">{currentLot.price || "N/A"}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>

              {/* Action Buttons */}{/*
              <div className="d-grid gap-2">
                <Row>
                  <Col xs={6}>
                    <Button
                      variant="outline-success"
                      className="w-100"
                      onClick={() => alert(`Reservar ${currentLot.id}`)}
                    >
                      Reservar
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button className="brand-dark-green w-100" onClick={() => alert(`Editar ${currentLot.id}`)}>
                      Editar
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Button
                      variant="outline-secondary"
                      className="w-100"
                      onClick={() => alert(`Ver cuenta ${currentLot.id}`)}
                    >
                      Ver cuenta
                    </Button>
                  </Col>
                  <Col xs={6}>
                    <Button
                      variant="link"
                      className="text-brand-dark-green w-100"
                      onClick={() => handleViewDetail(currentLot.id)}
                    >
                      Ver detalle completo
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
      */}

      <LotInfo
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        selectedLotId={selectedLotId}
      />

      <User show={showUserModal} onHide={() => setShowUserModal(false)} user={mockUser} />
    </div>
  )
}
