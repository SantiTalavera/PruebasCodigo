"use client"

import { useState } from "react"
import { Container } from "react-bootstrap"
import { mockLots } from "../lib/data"
// **1.** Importa el hook
import { useSidePanel } from "../components/Layout"

export default function Map() {
  const [hoveredParcel, setHoveredParcel] = useState(null)

  // **2.** Obtén la función de abrir el panel
  const { openLotPanel } = useSidePanel()

  return (
    <>
      <style>{/* customStyles … */}</style>
      <Container fluid className="py-4">
        <div className="map-container">
          <img
            src="https://lafederalaclub.com/.../Plano.jpg"
            alt="Mapa"
            className="img-fluid w-100 h-100"
          />
          {mockLots.slice(0, 4).map((lot, idx) => (
            <div
              key={lot.id}
              className="parcel-overlay"
              style={{ top: `${25 + idx * 15}%`, left: `${30 + idx * 10}%` }}
              onMouseEnter={() => setHoveredParcel(lot.id)}
              onMouseLeave={() => setHoveredParcel(null)}
              // **3.** Llama al contexto para abrir el panel
              onClick={() => openLotPanel(lot.id)}
            >
              <div className="parcel-label">{lot.id}</div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}
