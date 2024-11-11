// src/Pages/LandingRastreo.jsx
import { useState } from 'react';
import axios from 'axios';
import { Package, Send, HelpCircle, MapPin, Calendar, Clock, User, Scale, Box, CreditCard, CheckCircle } from 'lucide-react';

const LandingRastreo = () => {
  const [codigoRastreo, setCodigoRastreo] = useState('');
  const [paquete, setPaquete] = useState(null);
  const [error, setError] = useState('');

  const handleRastreo = async () => {
    try {
      const respuesta = await axios.get(`http://localhost:5000/api/rastreo/${codigoRastreo}`);
      setPaquete(respuesta.data);
      setError('');
    } catch (error) {
      setError('El código de rastreo no es válido', error);
      setPaquete(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const statusConfig = {
    'preparado': { className: 'border-yellow-200 text-yellow-700', icon: <Package className="w-4 h-4" /> },
    'en tránsito': { className: 'border-blue-200 text-blue-700', icon: <Clock className="w-4 h-4" /> },
    'entregado': { className: 'border-green-200 text-green-700', icon: <CheckCircle className="w-4 h-4" /> },
    'devuelto': { className: 'border-red-200 text-red-700', icon: <Package className="w-4 h-4" /> }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-16 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8">
          Rastreo de paquetes
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-6 h-6" />
            <h2 className="text-xl font-semibold">
              Historial del Paquete
            </h2>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            Introduce tu código de rastreo
          </p>

          <input 
            type="text"
            placeholder="Ejemplo: BC12345"
            value={codigoRastreo}
            onChange={(e) => setCodigoRastreo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md mb-4"
          />

          <button 
            onClick={handleRastreo}
            className="w-full bg-gray-900 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
          >
            Rastrear paquete
            <Send className="w-4 h-4" />
          </button>

          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

          <p className="text-sm text-gray-500 mt-4">
            Ingresa el código de rastreo para conocer el estado de tu paquete.
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <HelpCircle className="w-4 h-4" />
            Soporte
          </a>
        </div>
      </div>

      {paquete && (
        <div className="min-h-screen bg-gradient-to-br py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Seguimiento de Paquete</h1>
              <p className="text-gray-600">Detalles completos del envío</p>
            </div>
            <div className="max-w-4xl mx-auto p-6 space-y-8">
              {/* Header Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-indigo-100">
                      <Package className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Número de rastreo</div>
                      <div className="font-semibold text-gray-900">{paquete.codigo_rastreo}</div>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig[paquete.estado].className}`}>
                    {statusConfig[paquete.estado].icon}
                    <span className="font-medium capitalize">{paquete.estado}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Progress */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Ruta del envío</h2>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div className="text-sm">
                        <div className="text-gray-500">Origen</div>
                        <div className="font-medium text-gray-900">{paquete.direccion_remitente}</div>
                      </div>
                    </div>
                    <div className="h-16 border-l-2 border-dashed border-gray-200 ml-2" />
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div className="text-sm">
                        <div className="text-gray-500">Destino</div>
                        <div className="font-medium text-gray-900">{paquete.direccion_destino}</div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-32 bg-gray-100" />
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div className="text-sm">
                          <div className="text-gray-500">Fecha de envío</div>
                          <div className="font-medium text-gray-900">
                            {formatDate(paquete.fecha_envio)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div className="text-sm">
                          <div className="text-gray-500">Entrega estimada</div>
                          <div className="font-medium text-gray-900">
                            {formatDate(paquete.fecha_entrega)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del cliente</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-400" />
                      <div className="text-sm">
                        <div className="text-gray-500">Nombre</div>
                        <div className="font-medium text-gray-900">{paquete.cliente.nombre}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm ml-8">
                        <div className="text-gray-500">Email</div>
                        <div className="font-medium text-gray-900">{paquete.cliente.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm ml-8">
                        <div className="text-gray-500">Teléfono</div>
                        <div className="font-medium text-gray-900">{paquete.cliente.telefono}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Details */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalles del paquete</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Scale className="w-5 h-5 text-gray-400" />
                      <div className="text-sm">
                        <div className="text-gray-500">Peso</div>
                        <div className="font-medium text-gray-900">{paquete.peso} KG </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Box className="w-5 h-5 text-gray-400" />
                      <div className="text-sm">
                        <div className="text-gray-500">Dimensiones</div>
                        <div className="font-medium text-gray-900">{paquete.dimensiones}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                      <div className="text-sm">
                        <div className="text-gray-500">Método de pago</div>
                        <div className="font-medium text-gray-900">
                          {paquete.metodo_pago} - {paquete.costo} 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingRastreo;