"use client"

import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { mockLots, mockUser } from "../lib/data"
import Header from "./Header"
import Botones from "./Botones"
import FilterBar from "./FilterBar"
import User from "../components/User"

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

  const handleUserClick = () => {
    setShowUserModal(true)
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
      {children}
      <User show={showUserModal} onHide={() => setShowUserModal(false)} user={mockUser} />
    </div>
  )
}
