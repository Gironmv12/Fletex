import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Save, CircleX, Eye, Trash2 } from 'lucide-react';
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const AlmacenesInv = () => {
  const [nombreAlmacen, setNombreAlmacen] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [almacenes, setAlmacenes] = useState([]);
  const [selectedAlmacen, setSelectedAlmacen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const fetchAlmacenes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/almacen/almacenInventario');
        setAlmacenes(response.data);
      } catch (error) {
        console.error('Error al obtener los almacenes:', error);
      }
    };

    fetchAlmacenes();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    try {
      const response = await axios.post('http://localhost:5000/api/almacen/createAlmacen', {
        nombre: nombreAlmacen,
        ubicacion,
        created_by: userId,
        updated_by: userId
      });
      Swal.fire({
        icon: 'success',
        title: 'Almacén creado',
        text: 'El almacén ha sido creado exitosamente',
      });
      setAlmacenes([...almacenes, response.data]);
      setNombreAlmacen('');
      setUbicacion('');
    } catch (error) {
      console.error('Error al crear el almacén:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear el almacén',
      });
    }
  };

  const handleView = (almacen) => {
    setSelectedAlmacen(almacen);
    setIsModalOpen(true);
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
          await axios.delete(`http://localhost:5000/api/almacen/${id}`);
          Swal.fire({
            icon: 'success',
            title: 'Almacén eliminado',
            text: 'El almacén ha sido eliminado exitosamente',
          });
          setAlmacenes(almacenes.filter((almacen) => almacen.id !== id));
        } catch (error) {
          console.error('Error al eliminar el almacén:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al eliminar el almacén',
          });
        }
      }
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlmacen(null);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  return (
    <div>
      <div className="almacenes-dashboard p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Añadir Almacén</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Gestionar la información del almacén.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nombreAlmacen" className="block text-sm font-medium text-gray-700">Nombre del Almacén</label>
            <input
              type="text"
              id="nombreAlmacen"
              placeholder="Ingrese el nombre del almacén"
              value={nombreAlmacen}
              onChange={(e) => setNombreAlmacen(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">Localización</label>
            <input
              type="text"
              id="ubicacion"
              placeholder="Ingrese la ubicación"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="flex items-center px-4 py-2 bg-white text-[#979AAD] text-sm rounded-md hover:bg-[#e6e6e7] border border-gray-300"
              onClick={() => {
                setNombreAlmacen('');
                setUbicacion('');
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
              Crear Almacén
            </button>
          </div>
        </form>
      </div>
      <div className="mt-8 p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Lista de Inventario</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Ver y gestionar todo el inventario.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className='bg-gray-100 text-gray-700'>
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Almacén</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Localización</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Descripción</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Cantidad</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {almacenes.map((almacen) => (
                <tr key={almacen.id}>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{almacen.nombre_almacen}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{almacen.localizacion}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{almacen.descripcion}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{almacen.cantidad}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                    <button
                      className="text-[#000000] hover:text-blue-800 px-4 "
                      onClick={() => handleView(almacen)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(almacen.id)}
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
      {isModalOpen && selectedAlmacen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClickOutside}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-6 rounded-lg"
            ref={modalRef}
          >
            <h2 className="text-xl font-bold mb-4">Detalles del Almacén</h2>
            <p><strong>Nombre:</strong> {selectedAlmacen.nombre_almacen}</p>
            <p><strong>Localización:</strong> {selectedAlmacen.localizacion}</p>
            <p><strong>Descripción:</strong> {selectedAlmacen.descripcion}</p>
            <p><strong>Cantidad:</strong> {selectedAlmacen.cantidad}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#2F2F31] text-white rounded-md hover:bg-[#3F3F41]"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AlmacenesInv;