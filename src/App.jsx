import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Map from "./pages/Map"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout es la ruta "padre". Siempre estará visible. */}
        <Route path="/" element={<Layout />}>
          {/* Estas son las rutas "hijas". Se mostrarán dentro de Layout. */}
          {/* `index` significa que Dashboard es la ruta por defecto para "/" */}
          <Route index element={<Dashboard />} />
          <Route path="map" element={<Map />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}