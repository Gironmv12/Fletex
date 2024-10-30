import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Truck, CheckCircle, User, Calendar } from 'lucide-react';
import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
  let config = { className: '', icon: null };

  switch (status) {
    case 'entregado':
      config = { className: 'bg-green-100 text-green-700 border-green-200', icon: <CheckCircle className="w-4 h-4" /> };
      break;
    case 'en tránsito':
      config = { className: 'bg-blue-100 text-blue-700 border-blue-200', icon: <Truck className="w-4 h-4" /> };
      break;
    case 'preparado':
      config = { className: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: <Package className="w-4 h-4" /> };
      break;
    default:
      config = { className: 'bg-gray-100 text-gray-700 border-gray-200', icon: <Package className="w-4 h-4" /> };
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

const DateDisplay = ({ label, date }) => {
  const formattedDate = new Date(date).toLocaleDateString();
  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-gray-400" />
      <div className="text-sm">
        <span className="text-gray-500">{label}:</span>{' '}
        <span className="font-medium text-gray-900">{formattedDate}</span>
      </div>
    </div>
  );
};

DateDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

const ShipmentCard = ({ data }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
          <Package className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            <h3 className="font-medium text-gray-900">{data.cliente}</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{data.descripcion}</p>
        </div>
      </div>
      <StatusBadge status={data.estado} />
    </div>
    <div className="space-y-2">
      <DateDisplay label="Fecha de envío" date={data.fecha_envio} />
      <DateDisplay label="Fecha de entrega" date={data.fecha_entrega} />
    </div>
  </div>
);

ShipmentCard.propTypes = {
  data: PropTypes.shape({
    cliente: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    fecha_envio: PropTypes.string.isRequired,
    fecha_entrega: PropTypes.string.isRequired,
  }).isRequired,
};

const ReportDetallesPaquetes = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:5000/api/reporte/reportePaquetePorCliente');
        setShipments(respuesta.data);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    obtenerDatos();
  }, []);

  const enTransito = shipments.filter(shipment => shipment.estado === 'en tránsito').length;
  const preparados = shipments.filter(shipment => shipment.estado === 'preparado').length;
  const entregados = shipments.filter(shipment => shipment.estado === 'entregado').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Envíos</h1>
          <p className="text-gray-600">Seguimiento de paquetes en tiempo real</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{enTransito}</div>
                <div className="text-sm text-gray-600">En Tránsito</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-yellow-100">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{preparados}</div>
                <div className="text-sm text-gray-600">Preparados</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{entregados}</div>
                <div className="text-sm text-gray-600">Entregados</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                en tránsito
              </h2>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                {enTransito} envíos
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {shipments.filter(shipment => shipment.estado === 'en tránsito').map(shipment => (
                <ShipmentCard key={`${shipment.cliente}-${shipment.fecha_envio}`} data={shipment} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                preparado
              </h2>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                {preparados} envíos
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {shipments.filter(shipment => shipment.estado === 'preparado').map(shipment => (
                <ShipmentCard key={`${shipment.cliente}-${shipment.fecha_envio}`} data={shipment} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                entregado
              </h2>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
                {entregados} envíos
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {shipments.filter(shipment => shipment.estado === 'entregado').map(shipment => (
                <ShipmentCard key={`${shipment.cliente}-${shipment.fecha_envio}`} data={shipment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetallesPaquetes;