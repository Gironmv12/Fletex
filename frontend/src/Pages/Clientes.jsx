import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, CircleX, FilePen, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const Clientes = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [clientes, setClientes] = useState([]);
  const [editingClienteId, setEditingClienteId] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cliente/getClientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user')); // Obtener el usuario autenticado
    const userId = user ? user.id : null; // Obtener el ID del usuario

    try {
      if (editingClienteId) {
        // Editar cliente
        const response = await axios.put(`http://localhost:5000/api/cliente/${editingClienteId}`, {
          nombre,
          email,
          telefono,
          direccion,
          updated_by: userId
        });
        console.log('Cliente editado:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Cliente editado',
          text: 'El cliente ha sido editado exitosamente',
        });
        // Actualizar la lista de clientes
        setClientes(clientes.map((cliente) => (cliente.id_cliente === editingClienteId ? response.data : cliente)));
      } else {
        // Crear cliente
        const response = await axios.post('http://localhost:5000/api/cliente/createCliente', {
          nombre,
          email,
          telefono,
          direccion,
          created_by: userId,
          updated_by: userId
        });
        console.log('Cliente creado:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Cliente creado',
          text: 'El cliente ha sido creado exitosamente',
        });
        // Actualizar la lista de clientes
        setClientes([...clientes, response.data]);
      }
      // Limpiar el formulario después de enviar
      setNombre('');
      setEmail('');
      setTelefono('');
      setDireccion('');
      setEditingClienteId(null);
    } catch (error) {
      console.error('Error al crear/editar el cliente:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear/editar el cliente',
      });
    }
  };

  const handleEdit = (cliente) => {
    setNombre(cliente.nombre);
    setEmail(cliente.email);
    setTelefono(cliente.telefono);
    setDireccion(cliente.direccion);
    setEditingClienteId(cliente.id_cliente);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/cliente/${id}`);
          Swal.fire({
            icon: 'success',
            title: 'Cliente eliminado',
            text: 'El cliente ha sido eliminado exitosamente',
          });
          // Actualizar la lista de clientes
          setClientes(clientes.filter((cliente) => cliente.id_cliente !== id));
        } catch (error) {
          console.error('Error al eliminar el cliente:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar el cliente',
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="clientes-dashboard p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Añadir/Editar Cliente</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Gestionar la información de los clientes.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingrese el nombre del cliente"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
            <input
              type="email"
              id="email"
              placeholder="Ingrese el correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              id="telefono"
              placeholder="Ingrese el teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              id="direccion"
              placeholder="Ingrese la dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="flex items-center px-4 py-2 bg-white text-[#979AAD] text-sm rounded-md hover:bg-[#e6e6e7] border border-gray-300"
              onClick={() => {
                setNombre('');
                setEmail('');
                setTelefono('');
                setDireccion('');
                setEditingClienteId(null);
              }}
            >
              <CircleX className="w-5 h-5 mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 text-sm bg-[#2F2F31] text-white rounded-md hover:bg-[#3F3F41]"
            >
              <Save className="w-5 h-5 mr-2" />
              {editingClienteId ? 'Guardar Cambios' : 'Crear Cliente'}
            </button>
          </div>
        </form>
      </div>
      {/* Inicio de la tabla */}
      <div className="mt-8 p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Lista de clientes</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Ver y gestionar todos los clientes del sistema.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className='bg-gray-100 text-gray-700'>
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Nombre</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Correo</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Teléfono</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Dirección</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente,) => (
                <tr key={cliente.id_cliente}>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{cliente.nombre}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{cliente.email}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{cliente.telefono}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{cliente.direccion}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                    <button
                      className="text-[#000000] hover:text-blue-800 px-4 "
                      onClick={() => handleEdit(cliente)}
                    >
                      <FilePen className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(cliente.id_cliente)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*CONDUCTORES */}
      
    </div>
  );
};

export default Clientes;