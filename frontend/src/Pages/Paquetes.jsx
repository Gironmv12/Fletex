import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Save, CircleX, FilePen, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion } from "framer-motion";

const Paquetes = () => {
  const [clientes, setClientes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [formData, setFormData] = useState({
    id_cliente: '',
    direccion_destino: '',
    peso: '',
    dimensiones: '',
    id_estado: '',
    descripcion: '',
    fecha_envio: '',
    fecha_entrega: '',
    direccion_remitente: '',
    metodo_envio: 'normal',
    costo: '',
    metodo_pago: 'tarjeta_credito',
    id_almacen: '',
    cantidad: '',
  });
  const [editingPaqueteId, setEditingPaqueteId] = useState(null);
  const [selectedPaquete, setSelectedPaquete] = useState(null); // Estado para almacenar el paquete seleccionado
  const modalRef = useRef();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cliente/getClientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al obtener los clientes:', error);
      }
    };

    const fetchEstados = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/paquete/getEstadosPaquete');
        setEstados(response.data);
      } catch (error) {
        console.error('Error al obtener los estados:', error);
      }
    };

    const fetchAlmacenes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/almacen/getAlmacenes');
        setAlmacenes(response.data);
      } catch (error) {
        console.error('Error al obtener los almacenes:', error);
      }
    };

    const fetchPaquetes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/paquete/getPaquetes');
        setPaquetes(response.data);
      } catch (error) {
        console.error('Error al obtener los paquetes:', error);
      }
    };

    fetchClientes();
    fetchEstados();
    fetchAlmacenes();
    fetchPaquetes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;

    try {
      if (editingPaqueteId) {
        // Editar paquete
        const response = await axios.put(`http://localhost:5000/api/paquete/${editingPaqueteId}`, {
          ...formData,
          // Eliminar updated_by de aquí
          peso: parseFloat(formData.peso), // Asegúrate de que sea un número
          costo: parseFloat(formData.costo), // Asegúrate de que sea un número
          cantidad: parseInt(formData.cantidad, 10),
        });
        console.log('Paquete editado:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Paquete editado',
          text: 'El paquete ha sido editado exitosamente',
        });
        // Actualizar la lista de paquetes
        setPaquetes(paquetes.map((paquete) => (paquete.id_paquete === editingPaqueteId ? response.data : paquete)));
      } else {
        // Crear paquete
        const response = await axios.post('http://localhost:5000/api/paquete/createPaquete', {
          ...formData,
          created_by: userId, // Esto se puede dejar si es necesario
          // updated_by: userId, // Eliminar esto también si no es necesario
        });
        console.log('Paquete creado:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Paquete creado',
          text: 'El paquete ha sido creado exitosamente',
        });
        // Actualizar la lista de paquetes
        setPaquetes([...paquetes, response.data]);
      }
      // Limpiar el formulario después de enviar
      setFormData({
        id_cliente: '',
        direccion_destino: '',
        peso: '',
        dimensiones: '',
        id_estado: '',
        descripcion: '',
        fecha_envio: '',
        fecha_entrega: '',
        direccion_remitente: '',
        metodo_envio: 'normal',
        costo: '',
        metodo_pago: 'tarjeta_credito',
        id_almacen: '',
        cantidad: '',
      });
      setEditingPaqueteId(null);
    } catch (error) {
      console.error('Error al crear/editar el paquete:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear/editar el paquete',
      });
    }
  };

  /*const handleEdit = (paquete) => {
    setFormData({
      id_cliente: paquete.id_cliente,
      direccion_destino: paquete.direccion_destino,
      peso: paquete.peso,
      dimensiones: paquete.dimensiones,
      id_estado: paquete.id_estado,
      descripcion: paquete.descripcion,
      fecha_envio: paquete.fecha_envio,
      fecha_entrega: paquete.fecha_entrega,
      direccion_remitente: paquete.direccion_remitente,
      metodo_envio: paquete.metodo_envio,
      costo: paquete.costo,
      metodo_pago: paquete.metodo_pago,
      id_almacen: paquete.id_almacen,
      cantidad: paquete.cantidad,
    });
    setEditingPaqueteId(paquete.id_paquete);
  };*/

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id_cliente: '',
      direccion_destino: '',
      peso: '',
      dimensiones: '',
      id_estado: '',
      descripcion: '',
      fecha_envio: '',
      fecha_entrega: '',
      direccion_remitente: '',
      metodo_envio: 'normal',
      costo: '',
      metodo_pago: 'tarjeta_credito',
      id_almacen: '',
      cantidad: '',
    });
    setEditingPaqueteId(null);
  };

  const handleViewDetails = (paquete) => {
    setSelectedPaquete(paquete);
  };

  return (
    <div>
      <div className="paquetes-dashboard p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Crear Paquete</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Agregar un nuevo paquete al sistema</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="id_cliente" className="block text-sm font-medium text-gray-700">Cliente</label>
            <select
              id="id_cliente"
              name="id_cliente"
              value={formData.id_cliente}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecciona el cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id_cliente} value={cliente.id_cliente}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="direccion_destino" className="block text-sm font-medium text-gray-700">Destino de Envío</label>
            <input
              type="text"
              id="direccion_destino"
              name="direccion_destino"
              placeholder="Ingrese la dirección del envío"
              value={formData.direccion_destino}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso</label>
            <input
              type="text"
              id="peso"
              name="peso"
              placeholder="Ingrese el peso en KG"
              value={formData.peso}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="dimensiones" className="block text-sm font-medium text-gray-700">Dimensiones</label>
            <input
              type="text"
              id="dimensiones"
              name="dimensiones"
              placeholder="Ingrese las dimensiones"
              value={formData.dimensiones}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="id_estado" className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              id="id_estado"
              name="id_estado"
              value={formData.id_estado}
              onChange={handleChange}
              className="text-black mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecciona el estado</option>
              {estados.map((estado) => (
                <option key={estado.id_estado} value={estado.id_estado}>
                  {estado.estado}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              placeholder="Una breve descripción sobre el artículo"
              value={formData.descripcion}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="fecha_envio" className="block text-sm font-medium text-gray-700">Fecha de Envío</label>
            <input
              type="date"
              id="fecha_envio"
              name="fecha_envio"
              value={formData.fecha_envio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="fecha_entrega" className="block text-sm font-medium text-gray-700">Fecha de Entrega</label>
            <input
              type="date"
              id="fecha_entrega"
              name="fecha_entrega"
              value={formData.fecha_entrega}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="direccion_remitente" className="block text-sm font-medium text-gray-700">Dirección del Remitente</label>
            <input
              type="text"
              id="direccion_remitente"
              name="direccion_remitente"
              placeholder="Ingrese la dirección del remitente"
              value={formData.direccion_remitente}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="metodo_envio" className="block text-sm font-medium text-gray-700">Método de Envío</label>
            <select
              id="metodo_envio"
              name="metodo_envio"
              value={formData.metodo_envio}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="normal">Normal</option>
              <option value="express">Express</option>
            </select>
          </div>
          <div>
            <label htmlFor="costo" className="block text-sm font-medium text-gray-700">Costo</label>
            <input
              type="text"
              id="costo"
              name="costo"
              placeholder="Ingrese el costo"
              value={formData.costo}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="metodo_pago" className="block text-sm font-medium text-gray-700">Método de Pago</label>
            <select
              id="metodo_pago"
              name="metodo_pago"
              value={formData.metodo_pago}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="tarjeta_credito">Tarjeta de Crédito</option>
              <option value="transferencia">Transferencia</option>
              <option value="efectivo">Efectivo</option>
            </select>
          </div>
          <div>
            <label htmlFor="id_almacen" className="block text-sm font-medium text-gray-700">Almacén</label>
            <select
              id="id_almacen"
              name="id_almacen"
              value={formData.id_almacen}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecciona el almacén</option>
              {almacenes.map((almacen) => (
                <option key={almacen.id_almacen} value={almacen.id_almacen}>
                  {almacen.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700">Cantidad</label>
            <input
              type="text"
              id="cantidad"
              name="cantidad"
              placeholder="Ingrese la cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="flex items-center px-4 py-2 bg-white text-[#979AAD] text-sm rounded-md hover:bg-[#e6e6e7] border border-gray-300"
              onClick={handleCancel}
            >
              <CircleX className="w-5 h-5 mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 text-sm bg-[#2F2F31] text-white rounded-md hover:bg-[#3F3F41]"
            >
              <Save className="w-5 h-5 mr-2" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      {/* Inicio de la tabla */}
      <div className="mt-8 p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Lista de Paquetes</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Ver y gestionar todos los paquetes del sistema.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white">
            <thead className='bg-gray-100 text-gray-700'>
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Código</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Cliente</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Destino</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Estado</th>
                <th className="py-3 px-6 text-left font-semibold text-sm border-b border-gray-200">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paquetes.map((paquete) => (
                <tr key={paquete.id_paquete}>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{paquete.codigo_rastreo}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                    {clientes.find((cliente) => cliente.id_cliente === paquete.id_cliente)?.nombre}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">{paquete.direccion_destino}</td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                    {estados.find((estado) => estado.id_estado === paquete.id_estado)?.estado}
                  </td>
                  <td className="py-3 px-6 border-b border-gray-200 text-gray-800 text-xs">
                    <button
                      className="text-[#000000] hover:text-blue-800 px-4 "
                      onClick={() => handleViewDetails(paquete)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      disabled={true} // Desactivado por defecto
                      className="text-[#000000] cursor-not-allowed opacity-50 px-4"
                    >
                      <FilePen className="w-5 h-5" />
                    </button>
                    <button
                      disabled={true} // Desactivado por defecto
                      className="text-red-600 cursor-not-allowed opacity-50"
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
      {/* Modal para ver detalles */}
      {selectedPaquete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <motion.div initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white p-6 rounded-lg"
            ref={modalRef}>
            <h2 className="text-xl font-bold mb-4">Detalles del Paquete</h2>
            <p><strong>Código de Rastreo:</strong> {selectedPaquete.codigo_rastreo}</p>
            <p><strong>Cliente:</strong> {clientes.find(cliente => cliente.id_cliente === selectedPaquete.id_cliente)?.nombre}</p>
            <p><strong>Destino:</strong> {selectedPaquete.direccion_destino}</p>
            <p><strong>Peso:</strong> {selectedPaquete.peso} KG</p>
            <p><strong>Dimensiones:</strong> {selectedPaquete.dimensiones}</p>
            <p><strong>Estado:</strong> {estados.find(estado => estado.id_estado === selectedPaquete.id_estado)?.estado}</p>
            <p><strong>Descripción:</strong> {selectedPaquete.descripcion}</p>
            <p><strong>Fecha de Envío:</strong> {selectedPaquete.fecha_envio}</p>
            <p><strong>Fecha de Entrega:</strong> {selectedPaquete.fecha_entrega}</p>
            <p><strong>Dirección del Remitente:</strong> {selectedPaquete.direccion_remitente}</p>
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-md"
              onClick={() => setSelectedPaquete(null)} // Cerrar el modal
            >
              Cerrar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Paquetes;