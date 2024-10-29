import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Save, XCircle, User, Edit, Trash } from 'lucide-react';
import Swal from 'sweetalert2';

const Conductores = () => {
  const [showModal, setShowModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [licencia, setLicencia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [estado, setEstado] = useState('disponible');
  const [conductores, setConductores] = useState([]);
  const [editingConductorId, setEditingConductorId] = useState(null);

  useEffect(() => {
    fetchConductores();
  }, []);

  const fetchConductores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/conductor/getConductores');
      setConductores(response.data);
    } catch (error) {
      console.error('Error al obtener los conductores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingConductorId) {
        await axios.put(`http://localhost:5000/api/conductor/editConductor/${editingConductorId}`, {
          nombre,
          apellido_paterno: apellidoPaterno,
          apellido_materno: apellidoMaterno,
          licencia,
          telefono,
          direccion,
          fecha_nacimiento: fechaNacimiento,
          estado,
        });
        Swal.fire({
          icon: 'success',
          title: 'Conductor actualizado',
          text: 'El conductor ha sido actualizado exitosamente',
        });
      } else {
        await axios.post('http://localhost:5000/api/conductor/createConductor', {
          nombre,
          apellido_paterno: apellidoPaterno,
          apellido_materno: apellidoMaterno,
          licencia,
          telefono,
          direccion,
          fecha_nacimiento: fechaNacimiento,
          estado,
        });
        Swal.fire({
          icon: 'success',
          title: 'Conductor creado',
          text: 'El conductor ha sido creado exitosamente',
        });
      }
      setShowModal(false);
      fetchConductores();
      // Limpiar el formulario después de enviar
      setNombre('');
      setApellidoPaterno('');
      setApellidoMaterno('');
      setLicencia('');
      setTelefono('');
      setDireccion('');
      setFechaNacimiento('');
      setEstado('disponible');
      setEditingConductorId(null);
    } catch (error) {
      console.error('Error al crear/actualizar el conductor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear/actualizar el conductor',
      });
    }
  };

  const handleEdit = (conductor) => {
    setEditingConductorId(conductor.id_conductor); // Ajusta según el nombre correcto del campo ID
    setNombre(conductor.nombre);
    setApellidoPaterno(conductor.apellido_paterno);
    setApellidoMaterno(conductor.apellido_materno);
    setLicencia(conductor.licencia);
    setTelefono(conductor.telefono);
    setDireccion(conductor.direccion);
    setFechaNacimiento(conductor.fecha_nacimiento);
    setEstado(conductor.estado);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/conductor/deleteConductor/${id}`);
      Swal.fire({
        icon: 'success',
        title: 'Conductor eliminado',
        text: 'El conductor ha sido eliminado exitosamente',
      });
      fetchConductores();
    } catch (error) {
      console.error('Error al eliminar el conductor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el conductor',
      });
    }
  };

  return (
    <div className="mt-6">
      <div className="p-6 bg-white rounded-lg">
        <div className="flex items-center mb-4">
          <User className="w-6 h-6 mr-2" />
          <h1 className="text-2xl font-bold">Conductores Disponibles</h1>
        </div>
        <p className="text-[#6E6E77] mb-6 text-sm">
          Lista de todos los conductores registrados para asignación de rutas.
        </p>
        <button
          className="flex items-center px-4 py-2 text-sm bg-[#2F2F31] text-white rounded-md hover:bg-[#3F3F41]"
          onClick={() => {
            setEditingConductorId(null);
            setNombre('');
            setApellidoPaterno('');
            setApellidoMaterno('');
            setLicencia('');
            setTelefono('');
            setDireccion('');
            setFechaNacimiento('');
            setEstado('disponible');
            setShowModal(true);
          }}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Agregar Conductor
        </button>
        <table className="min-w-full table-auto bg-white mt-4">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">
                Nombre
              </th>
              <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">
                Licencia
              </th>
              <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">
                Teléfono
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
            {conductores.map((conductor) => (
              <tr key={conductor.id_conductor}>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                  {`${conductor.nombre} ${conductor.apellido_paterno} ${conductor.apellido_materno}`}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                  {conductor.licencia}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                  {conductor.telefono}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                  {conductor.estado}
                </td>
                <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                  <button
                    className="text-[#000000] hover:text-blue-800 px-4"
                    onClick={() => handleEdit(conductor)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(conductor.id_conductor)}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingConductorId ? 'Editar Conductor' : 'Agregar Nuevo Conductor'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="apellidoPaterno" className="block text-sm font-medium text-gray-700">
                  Apellido Paterno
                </label>
                <input
                  type="text"
                  id="apellidoPaterno"
                  value={apellidoPaterno}
                  onChange={(e) => setApellidoPaterno(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="apellidoMaterno" className="block text-sm font-medium text-gray-700">
                  Apellido Materno
                </label>
                <input
                  type="text"
                  id="apellidoMaterno"
                  value={apellidoMaterno}
                  onChange={(e) => setApellidoMaterno(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="licencia" className="block text-sm font-medium text-gray-700">
                  Licencia
                </label>
                <input
                  type="text"
                  id="licencia"
                  value={licencia}
                  onChange={(e) => setLicencia(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md"
                />
              </div>
              <div>
                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="fechaNacimiento"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
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
                  <option value="en ruta">En ruta</option>
                  <option value="dado de baja">Dado de baja</option>
                </select>
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
    </div>
  );
};

export default Conductores;