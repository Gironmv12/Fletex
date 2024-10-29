import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Map, PackageCheck, Warehouse } from 'lucide-react';

const Dashboard = () => {
  const [totalPaquetes, setTotalPaquetes] = useState(0);
  const [rutasActivas, setRutasActivas] = useState(0);
  const [paquetesPendientes, setPaquetesPendientes] = useState(0);
  const [totalAlmacenes, setTotalAlmacenes] = useState(0);
  const [detallesPaquetes, setDetallesPaquetes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paquetesResponse = await axios.get('http://localhost:5000/api/dashboard/totalPaquetes');
        setTotalPaquetes(paquetesResponse.data.total);

        const rutasResponse = await axios.get('http://localhost:5000/api/dashboard/rutasActivas');
        setRutasActivas(rutasResponse.data.total);

        const pendientesResponse = await axios.get('http://localhost:5000/api/dashboard/paquetesPendientes');
        setPaquetesPendientes(pendientesResponse.data.total);

        const almacenesResponse = await axios.get('http://localhost:5000/api/dashboard/totalAlmacenes');
        setTotalAlmacenes(almacenesResponse.data.total);

        const detallesResponse = await axios.get('http://localhost:5000/api/dashboard/detallesPaquetes');
        setDetallesPaquetes(detallesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-content p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/2"></div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xs font-medium text-[#4F4F4F]">Total de Paquetes</h2>
                <Package className="w-4 h-4 text-[#000000]" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalPaquetes}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xs font-medium text-[#4F4F4F]">Rutas activas</h2>
                <Map className="w-4 h-4 text-[#000000]" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{rutasActivas}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xs font-medium text-[#4F4F4F]">Paquetes pendientes</h2>
                <PackageCheck className="w-4 h-4 text-[#000000]" />
              </div>
              <p className="text-3xl font-bold text-[#4F4F4F]">{paquetesPendientes}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-xs">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xs font-medium text-[#4F4F4F]">Almacenes</h2>
                <Warehouse className="w-4 h-4 text-[#000000]" />
              </div>
              <p className="text-3xl font-bold text-gray-900">{totalAlmacenes}</p>
            </div>
          </>
        )}
      </div>

      {/* Sección de Tabla paquetes recientes */}
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-1xl font-bold mb-6 text-gray-800">Paquetes Recientes</h2>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            </div>
          ) : (
            <table className="min-w-full table-auto bg-white">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">ID</th>
                  <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Cliente</th>
                  <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Estado</th>
                  <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Origen</th>
                  <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Destino</th>
                </tr>
              </thead>
              <tbody>
                {detallesPaquetes.map((paquete) => (
                  <tr key={paquete.id_paquete} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{paquete.id_paquete}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs ">{paquete.nombre_cliente}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${paquete.estado_paquete === 'entregado'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                        }`}>
                        {paquete.estado_paquete}
                      </span>
                    </td>
                    <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{paquete.direccion_remitente}</td>
                    <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{paquete.direccion_destino}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;