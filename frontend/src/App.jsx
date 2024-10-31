// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Usuarios from './Pages/Usuarios';
import Clientes from './Pages/Clientes';
import AlmacenesInv from './Pages/AlmacenesInv';
import Paquetes from './Pages/Paquetes';
import RutasAsing from './Pages/RutasAsing';
import OptiRutas from './Pages/OptiRutas';
import VehiculoConduc from './Pages/VehiculoConduc';
import EstadoPaquete from './Pages/EstadoPaquete';
import DashboardLayout from './components/DashboardLayout';
import Reportes from './Pages/Reportes';
import LandingRastreo from './Pages/client/landingRastreo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="almacenesinventarios" element={<AlmacenesInv />} />
          <Route path="paquetes" element={<Paquetes />} />
          <Route path="rutasasingnacion" element={<RutasAsing />} />
          <Route path="optirutas" element={<OptiRutas />} />
          <Route path="vehiculoconductor" element={<VehiculoConduc />} />
          <Route path="estadopaquete" element={<EstadoPaquete />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>
        <Route path="/rastreo" element={<LandingRastreo />} />
      </Routes>
    </Router>
  );
}

export default App;