import { useState, useEffect } from 'react';
import axios from 'axios';

import { House, Package, ScrollText, Compass, PackageSearch } from 'lucide-react';

import Paquetes from '../components/reports/Paquetes';
import ReportAsignaciones from '../components/reports/ReportAsignaciones';
import ReportDetallesPaquetes from '../components/reports/ReportDetallesPaquetes';
import ReportInventario from '../components/reports/ReportInventario';

const tabs = [
  { name: 'General', icon: House },
  { name: 'Paquetes', icon: Package },
  { name: 'Inventario', icon: ScrollText },
  { name: 'Asignaciones', icon: Compass },
  { name: 'Detalles de Paquetes', icon: PackageSearch },
];

const Reportes = () => {
  const [tab, setTab] = useState('General');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (tab === 'General') {
      const obtenerDatos = async () => {
        try {
          const respuesta = await axios.get('http://localhost:5000/api/reporte/reporteGeneral');
          setData(respuesta.data);
        } catch (error) {
          console.error('Error al obtener los datos del reporte general', error);
        }
      };
      obtenerDatos();
    }
  }, [tab]);

  return (
    <div className="p-2">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
          {tabs.map((tabItem) => (
            <li key={tabItem.name} className="mr-2">
              <button
                onClick={() => setTab(tabItem.name)}
                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                  tab === tabItem.name
                    ? 'text-[#3D52D5] border-[#3D52D5] active'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                }`}
              >
                <tabItem.icon
                  className={`w-4 h-4 mr-2 ${
                    tab === tabItem.name ? 'text-[#3D52D5]' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {tabItem.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Contenido */}
      {tab === 'General' && data && (
        <div className='mt-5'>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
              <h3 className="text-xs font-medium text-[#4F4F4F]">Total de Paquetes</h3>
              <p className="text-3xl font-bold text-gray-900">{data.totalPaquetes}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
              <h3 className="text-xs font-medium text-[#4F4F4F]">Rutas Activas</h3>
              <p className="text-3xl font-bold text-gray-900">{data.rutasActivas}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
              <h3 className="text-xs font-medium text-[#4F4F4F]">Paquetes Pendientes</h3>
              <p className="text-3xl font-bold text-gray-900">{data.paquetesPendientes}</p>
            </div>
          </div>

          {/* Grid de tablas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Clientes */}
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Clientes</h3>
              <table className="min-w-full table-auto bg-white">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Nombre</th>
                    <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Correo</th>
                    <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Teléfono</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.clientes.map((cliente) => (
                    <tr key={cliente.id_cliente}>
                      <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{cliente.nombre}</td>
                      <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{cliente.email}</td>
                      <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{cliente.telefono}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Conductores */}
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Conductores</h3>
              <table className="min-w-full table-auto bg-white">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Nombre</th>
                    <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Licencia</th>
                    <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.conductores.map((conductor) => (
                    <tr key={conductor.id_conductor}>
                      <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{`${conductor.nombre} ${conductor.apellido_paterno} ${conductor.apellido_materno}`}</td>
                      <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{conductor.licencia}</td>
                      <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{conductor.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Otras pestañas */}
      {tab === 'Paquetes' && (
        <div>
          <Paquetes />
        </div>
      )}
      {tab === 'Inventario' && (
        <div>
          <ReportInventario />
        </div>
      )}
      {tab === 'Asignaciones' && (
        <div>
          <ReportAsignaciones />
        </div>
      )}
      {tab === 'Detalles de Paquetes' && (
        <div>
          <ReportDetallesPaquetes />
        </div>
      )}
    </div>
  );
};

export default Reportes;