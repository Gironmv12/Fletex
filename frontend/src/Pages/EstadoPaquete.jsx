import { useState } from 'react';
import axios from 'axios';
import { CircleX, Search } from 'lucide-react';
import Swal from 'sweetalert2';

const HistorialPaquete = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState('');
  const [responsable, setResponsable] = useState('');
  const [historial, setHistorial] = useState([]);

  const handleBuscar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/historial-paquete/getHistorialPaquete', {
        params: {
          fechaInicio,
          fechaFin,
          estado,
          responsable,
        },
      });
      setHistorial(response.data);
    } catch (error) {
      console.error('Error al obtener el historial de paquetes:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al obtener el historial de paquetes',
      });
    }
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">📦 Historial del Paquete</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">
          Consulta el historial de estado de los paquetes. Puedes buscar por rango de fechas, filtrar por estado y buscar por responsable.
        </p>
        <form onSubmit={handleBuscar} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Buscar por Rango de Fechas</label>
            <div className="mt-1 flex space-x-4">
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                className="block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none sm:text-sm"
              />
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Filtrar por estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] bg-white rounded-md focus:outline-none sm:text-sm"
            >
              <option value="">Todos</option>
              <option value="pendiente">Pendiente</option>
              <option value="en curso">En curso</option>
              <option value="completado">Completado</option>
              <opcion value="cancelado">Cancelado</opcion>
              {/* Agrega más opciones si es necesario */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Buscar por responsable</label>
            <input
              type="text"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              placeholder="Nombre del responsable"
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="flex items-center px-4 py-2 bg-white text-[#979AAD] text-sm rounded-md hover:bg-[#e6e6e7] border border-gray-300"
              onClick={() => {
                setFechaInicio('');
                setFechaFin('');
                setEstado('');
                setResponsable('');
                setHistorial([]);
              }}
            >
              <CircleX className="w-5 h-5 mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 text-sm bg-[#2F2F31] text-white rounded-md hover:bg-[#3F3F41]"
            >
              <Search className="w-5 h-5 mr-2" />
              Buscar
            </button>
          </div>
        </form>
      </div>
      {/* Inicio de la tabla */}
      <div className="mt-8 p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Resultados</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Ver los resultados de la búsqueda.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Código de Paquete</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Descripción</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Estado</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Fecha de Asignación</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Responsable</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item) => (
                <tr key={item.id_paquete}>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{item.id_paquete}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{item.descripcion}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{item.estado}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                    {new Date(item.fecha_asignacion).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                    {`${item.nombre} ${item.apellido_paterno}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistorialPaquete;