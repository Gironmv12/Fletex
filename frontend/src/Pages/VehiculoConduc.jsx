import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Save, XCircle, Truck, Edit, Trash } from 'lucide-react';
import Swal from 'sweetalert2';
import Conductores from '../components/Conductores';

const VehiculoConduc = () => {
  const [showModal, setShowModal] = useState(false);
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [estado, setEstado] = useState('disponible');
  const [tipoVehiculo, setTipoVehiculo] = useState('automóvil');
  const [capacidadCarga, setCapacidadCarga] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [vehiculos, setVehiculos] = useState([]);
  const [editingVehiculoId, setEditingVehiculoId] = useState(null);

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchVehiculos();
  }, []);

  const fetchVehiculos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vehiculos/getVehiculos');
      setVehiculos(response.data);
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
    }
  };

  // Datos para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVehiculos = vehiculos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(vehiculos.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVehiculoId) {
        await axios.put(`http://localhost:5000/api/vehiculos/editVehiculo/${editingVehiculoId}`, {
          placa,
          marca,
          modelo,
          estado,
          tipo_vehiculo: tipoVehiculo,
          capacidad_carga: parseFloat(capacidadCarga),
          observaciones,
        });
        Swal.fire({
          icon: 'success',
          title: 'Vehículo actualizado',
          text: 'El vehículo ha sido actualizado exitosamente',
        });
      } else {
        await axios.post('http://localhost:5000/api/vehiculos/createVehiculo', {
          placa,
          marca,
          modelo,
          estado,
          tipo_vehiculo: tipoVehiculo,
          capacidad_carga: parseFloat(capacidadCarga),
          observaciones,
        });
        Swal.fire({
          icon: 'success',
          title: 'Vehículo creado',
          text: 'El vehículo ha sido creado exitosamente',
        });
      }
      setShowModal(false);
      fetchVehiculos();
      // Limpiar el formulario después de enviar
      setPlaca('');
      setMarca('');
      setModelo('');
      setEstado('disponible');
      setTipoVehiculo('automóvil');
      setCapacidadCarga('');
      setObservaciones('');
      setEditingVehiculoId(null);
    } catch (error) {
      console.error('Error al crear/actualizar el vehículo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear/actualizar el vehículo',
      });
    }
  };

  const handleEdit = (vehiculo) => {
    setEditingVehiculoId(vehiculo.id_vehiculo);
    setPlaca(vehiculo.placa);
    setMarca(vehiculo.marca);
    setModelo(vehiculo.modelo);
    setEstado(vehiculo.estado);
    setTipoVehiculo(vehiculo.tipo_vehiculo);
    setCapacidadCarga(vehiculo.capacidad_carga);
    setObservaciones(vehiculo.observaciones);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehiculos/deleteVehiculo/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'Vehículo eliminado',
        text: 'El vehículo ha sido eliminado exitosamente',
      });
      fetchVehiculos();
    } catch (error) {
      console.error('Error al eliminar el vehículo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el vehículo',
      });
    }
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-lg">
        <div className="flex items-center mb-4">
          <Truck className="w-6 h-6 mr-2" />
          <h1 className="text-2xl font-bold">Vehículos Disponibles</h1>
        </div>
        <p className="text-[#6E6E77] mb-6 text-sm">
          Lista de todos los vehículos disponibles para asignación.
        </p>
        <button
          className="flex items-center px-4 py-2 text-sm bg-[#2F2F31] text-white rounded-md hover:bg-[#3F3F41]"
          onClick={() => {
            setEditingVehiculoId(null);
            setPlaca('');
            setMarca('');
            setModelo('');
            setEstado('disponible');
            setTipoVehiculo('automóvil');
            setCapacidadCarga('');
            setObservaciones('');
            setShowModal(true);
          }}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Agregar Vehículo
        </button>
        <table className="min-w-full table-auto bg-white mt-4">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">
                Placa
              </th>
              <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">
                Capacidad de Carga
              </th>
              <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">
                Estado
              </th>
              <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {currentVehiculos.map((vehiculo) => (
              <tr key={vehiculo.id_vehiculo}>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                  {vehiculo.placa}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                  {vehiculo.capacidad_carga}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                  {vehiculo.estado}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                  <button
                    className="text-[#000000] hover:text-blue-800 px-4"
                    onClick={() => handleEdit(vehiculo)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(vehiculo.id_vehiculo)}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botones de paginación */}
        <div className="flex justify-start mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === 1 ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'
            }`}
          >
            Anterior
          </button>
          <span className="px-4 py-2 mx-1 text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 border rounded ${
              currentPage === totalPages ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingVehiculoId ? 'Editar Vehículo' : 'Agregar Nuevo Vehículo'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="placa" className="block text-sm font-medium text-gray-700">
                  Placa
                </label>
                <input
                  type="text"
                  id="placa"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
                  Marca
                </label>
                <input
                  type="text"
                  id="marca"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">
                  Modelo
                </label>
                <input
                  type="text"
                  id="modelo"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                >
                  <option value="disponible">Disponible</option>
                  <option value="en uso">En uso</option>
                  <option value="en mantenimiento">En mantenimiento</option>
                </select>
              </div>
              <div>
                <label htmlFor="tipoVehiculo" className="block text-sm font-medium text-gray-700">
                  Tipo de Vehículo
                </label>
                <select
                  id="tipoVehiculo"
                  value={tipoVehiculo}
                  onChange={(e) => setTipoVehiculo(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                >
                  <option value="camión">Camión</option>
                  <option value="furgoneta">Furgoneta</option>
                  <option value="automóvil">Automóvil</option>
                  <option value="motocicleta">Motocicleta</option>
                </select>
              </div>
              <div>
                <label htmlFor="capacidadCarga" className="block text-sm font-medium text-gray-700">
                  Capacidad de Carga
                </label>
                <input
                  type="number"
                  id="capacidadCarga"
                  value={capacidadCarga}
                  onChange={(e) => setCapacidadCarga(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700">
                  Observaciones
                </label>
                <input
                  type="text"
                  id="observaciones"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="flex items-center px-4 py-2 bg-white text-[#979AAD] text-sm rounded-md hover:bg-[#e6e6e7] border border-gray-300"
                  onClick={() => setShowModal(false)}
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 text-sm bg-[#2F2F31] text-white rounded-md hover:bg-[#3F3F41]"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Aplicar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONDUCTORES */}
      <Conductores />
    </div>
  );
};

export default VehiculoConduc;