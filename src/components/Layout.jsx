import React, { useState } from "react"
import { mockUser } from "../lib/data"
import Header from "./Header"
import Botones from "./Botones"
import FilterBar from "./FilterBar"
import User from "../components/User"


export default function Layout({ children }) {
  const [showUserModal, setShowUserModal] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    owner: [],
    location: [],
    status: [],
    subStatus: [],
  })

  const handleUserClick = () => {
    setShowUserModal(true)
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
      <Header onUserClick={handleUserClick} user={mockUser} />
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
