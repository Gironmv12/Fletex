import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, ArrowRight, Check, Truck, Clock } from 'lucide-react';
import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
  let config = { className: '', icon: null };

  switch (status) {
    case 'entregado':
      config = { className: 'bg-green-100 text-green-700 border-green-200', icon: <Check className="w-4 h-4" /> };
      break;
    case 'en tránsito':
      config = { className: 'bg-blue-100 text-blue-700 border-blue-200', icon: <Truck className="w-4 h-4" /> };
      break;
    case 'preparado':
      config = { className: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock className="w-4 h-4" /> };
      break;
    default:
      config = { className: 'bg-gray-100 text-gray-700 border-gray-200', icon: <Clock className="w-4 h-4" /> };
  }

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${config.className} text-sm font-medium capitalize`}>
      {config.icon}
      {status}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

const RouteIndicator = ({ origin, destination }) => (
  <div className="flex items-center gap-3 text-sm">
    <div className="px-3 py-1.5 bg-gray-100 rounded-lg font-medium text-gray-700 truncate max-w-[180px]">
      {origin}
    </div>
    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
    <div className="px-3 py-1.5 bg-gray-100 rounded-lg font-medium text-gray-700 truncate max-w-[180px]">
      {destination}
    </div>
  </div>
);

RouteIndicator.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

const PackageCard = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-100">
          <Package className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Paquete #{data.id_paquete}</h3>
          <p className="text-sm text-gray-500">Ruta #{data.id_ruta}</p>
        </div>
      </div>
      <StatusBadge status={data.estado_paquete} />
    </div>
    <p className="text-gray-700 mb-4 line-clamp-2">{data.descripcion_paquete}</p>
    <RouteIndicator origin={data.origen} destination={data.destino} />
  </div>
);

PackageCard.propTypes = {
  data: PropTypes.shape({
    id_paquete: PropTypes.number.isRequired,
    id_ruta: PropTypes.number.isRequired,
    descripcion_paquete: PropTypes.string.isRequired,
    estado_paquete: PropTypes.string.isRequired,
    origen: PropTypes.string.isRequired,
    destino: PropTypes.string.isRequired,
  }).isRequired,
};

const ReportAsignaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const statusOrder = ['preparado', 'en tránsito', 'entregado'];

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:5000/api/reporte/reporteAsignacionesPaquetes');
        setAsignaciones(respuesta.data);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    obtenerDatos();
  }, []);

  const groupedPackages = asignaciones.reduce((acc, pkg) => {
    if (!acc[pkg.estado_paquete]) {
      acc[pkg.estado_paquete] = [];
    }
    acc[pkg.estado_paquete].push(pkg);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Seguimiento de Paquetes</h1>
          <p className="text-gray-600">Monitoreo de envíos y rutas en tiempo real</p>
        </div>

        <div className="space-y-8">
          {statusOrder.map((status) => {
            const packagesInStatus = groupedPackages[status] || [];
            if (packagesInStatus.length === 0) return null;

            return (
              <div key={status} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 capitalize">
                  {status} ({packagesInStatus.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packagesInStatus.map((pkg) => (
                    <PackageCard key={`${pkg.id_ruta}-${pkg.id_paquete}`} data={pkg} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReportAsignaciones;