import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../utils/auth';
import { ChevronDown, LogOut, Settings } from 'lucide-react';
import Porfile from '../../public/Svg/porfile.svg';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getTitle = (pathname) => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard/usuarios':
        return 'Usuarios';
      case '/dashboard/clientes':
        return 'Clientes';
      case '/dashboard/almacenesinventarios':
        return 'Almacenes e Inventarios';
      case '/dashboard/paquetes':
        return 'Paquetes';
      case '/dashboard/rutasasingnacion':
        return 'Rutas y Asignación';
      case '/dashboard/optirutas':
        return 'Optimización de Rutas';
      case '/dashboard/vehiculoconductor':
        return 'Vehículos y Conductores';
      case '/dashboard/estadopaquete':
        return 'Estado de Paquetes';
      case '/dashboard/reportes':
        return 'Reportes';
      default:
        return 'Dashboard';
    }
  };

  const title = getTitle(location.pathname);

  return (
    <div className="flex items-center justify-between bg-[#FFFF] p-4 h-24 sticky top-0">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex items-center space-x-4">
        <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={Porfile}
              alt="User"
              className="w-9 h-9 rounded-full"
            />
            <ChevronDown className="w-5 h-5 text-gray-600 ml-2" />
          </div>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95, rotate: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.95, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-4 px-4">
              <div className="flex items-center px-4 py-2">
                <img
                  src={Porfile}
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user?.nombre || 'Guest'}</p>
                  <p className="text-sm text-gray-600">{user.rol}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-[#3D52D5] bg-[#F6F9FF] hover:bg-[#e2e8f0] rounded-lg text-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;