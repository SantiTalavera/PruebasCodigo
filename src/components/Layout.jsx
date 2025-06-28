"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import { mockLots, mockUser } from "../lib/data"
import Header from "./Header"
import Botones from "./Botones"
import FilterBar from "./FilterBar"
import User from "./User"
import LotInfo from "./LotInfo"

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

export default function Layout() {
  // Estado centralizado
  const [lotsData, setLotsData] = useState(mockLots);
  const [filters, setFilters] = useState({
    search: "",
    owner: [],
    location: [],
    status: [],
    subStatus: [],
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedLotId, setSelectedLotId] = useState(null);
  const [showLotInfo, setShowLotInfo] = useState(false);

  // Lógica de filtrado
  const filteredLots = lotsData.filter((lot) => {
    if (filters.search && !lot.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.owner.length > 0 && !filters.owner.includes(lot.owner)) return false;
    if (filters.location.length > 0 && !filters.location.includes(lot.location || "")) return false;
    if (filters.status.length > 0 && !filters.status.includes(lot.status)) return false;
    if (filters.subStatus.length > 0 && !filters.subStatus.includes(lot.subStatus)) return false;
    return true;
  });

  // Funciones para manejar los datos
  const handleStatusChange = (lotId, newStatus) => {
    setLotsData((prev) => prev.map((lot) => (lot.id === lotId ? { ...lot, status: newStatus } : lot)));
  };
  const handleDeleteLot = (lotId) => {
    if (window.confirm("¿Está seguro de eliminar este lote?")) {
      setLotsData((prev) => prev.filter((lot) => lot.id !== lotId));
      alert("Lote eliminado");
    }
  };
   const handleViewDetail = (lotId) => {
    setSelectedLotId(lotId);
    setShowLotInfo(true);
  };
  const handleClearFilters = () => {
    setFilters({ search: "", owner: [], location: [], status: [], subStatus: [] });
  };
  const handleAddRecord = () => {
    alert("Acción Añadir Nuevo Registro");
  };

  const handleApplyPromotion = () => {
    alert("Acción Aplicar Promoción");
  };


  return (
    <div className="min-vh-100 d-flex flex-column bg-white">
      <style>{customStyles}</style>
      <Header onUserClick={() => setShowUserModal(true)} user={mockUser} />
      <Botones />
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        onAddRecord={handleAddRecord}
        onApplyPromotion={handleApplyPromotion}
        onClearFilters={handleClearFilters}
      />
      
      <Outlet context={{ 
        lots: filteredLots, 
        handleStatusChange, 
        handleDeleteLot,
        handleViewDetail 
      }} />

      <User show={showUserModal} onHide={() => setShowUserModal(false)} user={mockUser} />
      <LotInfo show={showLotInfo} onHide={() => setShowLotInfo(false)} selectedLotId={selectedLotId} />
    </div>
  )
}