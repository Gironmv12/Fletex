  import { useState } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import LogoFletex from '../../public/Svg/logoFletexAzul.svg';
  import { LayoutGrid, UsersRound, UserRound, Warehouse, Package, Map, Sparkles, Truck, PackageCheck } from 'lucide-react';
  
  const Sidebar = () => {
    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname);
  
    const handleSelection = (path) => {
      setSelected(path);
    };
  
    const linkClasses = (path) =>
      `flex items-center px-4 py-2 text-base rounded-lg text-sm ${
        selected === path ? 'bg-[#F6F9FF] text-[#3D52D5] font-medium' : 'bg-white text-[#979AAD] hover:bg-[#F6F9FF]'
      }`;
  
    const iconClasses = (path) => (selected === path ? 'text-[#3D52D5]' : 'text-[#979AAD]');
  
    return (
      <div className="w-72 bg-white h-screen fixed flex flex-col items-center py-4">
        {/* Logo */}
        <div className="mb-8">
          <img src={LogoFletex} alt="Logo" className="w-28 h-auto" />
        </div>
        {/* Sidebar menu */}
        <ul className="w-full">
          <li className="mb-3">
            <Link to="/dashboard" className={linkClasses('/dashboard')} onClick={() => handleSelection('/dashboard')}>
              <LayoutGrid className={`w-5 h-5 mr-3 ${iconClasses('/dashboard')}`} strokeWidth={1.5} />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/usuarios" className={linkClasses('/dashboard/usuarios')} onClick={() => handleSelection('/dashboard/usuarios')}>
              <UsersRound className={`w-5 h-5 mr-3 ${iconClasses('/dashboard/usuarios')}`} strokeWidth={1.5} />
              Usuarios
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/clientes" className={linkClasses('/dashboard/clientes')} onClick={() => handleSelection('/dashboard/clientes')}>
              <UserRound className={`w-5 h-5 mr-3 ${iconClasses('/dashboard/clientes')}`} strokeWidth={1.5} />
              Clientes
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/almacenesinventarios" className={linkClasses('/dashboard/almacenesinventarios')} onClick={() => handleSelection('/dashboard/almacenesinventarios')}>
              <Warehouse className={`w-5 h-5 mr-3 ${iconClasses('/dashboard/almacenesinventarios')}`} strokeWidth={1.5} />
              Almacenes e Inventarios
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/paquetes" className={linkClasses('/dashboard/paquetes')} onClick={() => handleSelection('/dashboard/paquetes')}>
              <Package className={`w-5 h-5 mr-3 ${iconClasses('/dashboard/paquetes')}`} strokeWidth={1.5} />
              Paquetes
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/rutasasingnacion" className={linkClasses('/dashboard/rutasasingnacion')} onClick={() => handleSelection('/dashboard/rutasasingnacion')}>
              <Map className={`w-5 h-5 mr-3 ${iconClasses('/dashboard/rutasasingnacion')}`} strokeWidth={1.5} />
              Rutas y Asignación
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/optirutas" className={linkClasses('/dashboard/optirutas')} onClick={() => handleSelection('/dashboard/optirutas')}>
              <Sparkles className={`w-5 h-5 mr-3 ${iconClasses('/dashboard/optirutas')}`} strokeWidth={1.5} />
              Optimización de Rutas
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/vehiculoconductor" className={linkClasses('/dashboard/vehiculoconductor')} onClick={() => handleSelection('/dashboard/vehiculoconductor')}>
              <Truck className={`w-5 h-5 mr-3 ${iconClasses('/dashboard/vehiculoconductor')}`} strokeWidth={1.5} />
              Vehículos y Conductores
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/dashboard/estadopaquete" className={linkClasses('/dashboard/estadopaquete')} onClick={() => handleSelection('/dashboard/estadopaquete')}>
              <PackageCheck className={`w-5 h-5 mr-3 ${iconClasses('/dashboard/estadopaquete')}`} strokeWidth={1.5} />
              Estado de Paquetes
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;