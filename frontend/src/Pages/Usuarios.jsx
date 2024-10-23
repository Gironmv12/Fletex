import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, CircleX, FilePen, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const Usuarios = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('administrador');
  const [usuarios, setUsuarios] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        // Editar usuario
        const response = await axios.put(`http://localhost:5000/api/user/${editingUserId}`, {
          nombre,
          email,
          password,
          rol,
        });
        console.log('Usuario editado:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Usuario editado',
          text: 'El usuario ha sido editado exitosamente',
        });
        // Actualizar la lista de usuarios
        setUsuarios(usuarios.map((usuario) => (usuario.id_usuario === editingUserId ? response.data : usuario)));
      } else {
        // Crear usuario
        const response = await axios.post('http://localhost:5000/api/user/create', {
          nombre,
          email,
          password,
          rol,
        });
        console.log('Usuario creado:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'El usuario ha sido creado exitosamente',
        });
        // Actualizar la lista de usuarios
        setUsuarios([...usuarios, response.data]);
      }
      // Limpiar el formulario después de enviar
      setNombre('');
      setEmail('');
      setPassword('');
      setRol('administrador');
      setEditingUserId(null);
    } catch (error) {
      console.error('Error al crear/editar el usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear/editar el usuario',
      });
    }
  };

  const handleEdit = (usuario) => {
    setNombre(usuario.nombre);
    setEmail(usuario.email);
    setPassword(''); // No se debe mostrar la contraseña actual
    setRol(usuario.rol);
    setEditingUserId(usuario.id_usuario);
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
          await axios.delete(`http://localhost:5000/api/user/${id}`);
          Swal.fire({
            icon: 'success',
            title: 'Usuario eliminado',
            text: 'El usuario ha sido eliminado exitosamente',
          });
          // Actualizar la lista de usuarios
          setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id));
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar el usuario',
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="user-content p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Añadir/Editar Usuario</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Gestionar la información y los permisos de los usuarios.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 ">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingrese el nombre"
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Ingrese la contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="rol" className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="administrador">Administrador</option>
              <option value="operador">Operador</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="flex items-center px-4 py-2 bg-white text-[#979AAD] text-sm rounded-md hover:bg-[#e6e6e7] border border-gray-300"
              onClick={() => {
                setNombre('');
                setEmail('');
                setPassword('');
                setRol('administrador');
                setEditingUserId(null);
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
              {editingUserId ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
      {/* Inicio de la tabla */}
      <div className="mt-8 p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Lista de usuarios</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Ver y gestionar todos los usuarios del sistema.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className='bg-gray-100 text-gray-700'>
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Nombre</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Correo</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Rol</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id_usuario}>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{usuario.nombre}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{usuario.email}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{usuario.rol}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                    <button
                      className="text-[#000000] hover:text-blue-800 px-4 "
                      onClick={() => handleEdit(usuario)}
                    >
                      <FilePen className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(usuario.id_usuario)}
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
    </div>
  );
};

export default Usuarios;