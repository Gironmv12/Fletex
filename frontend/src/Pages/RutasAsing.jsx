import { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, CircleX } from 'lucide-react';
import Swal from 'sweetalert2';

const CrearRuta = () => {
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [distanciaKm, setDistanciaKm] = useState('');
  const [tiempoEstimado, setTiempoEstimado] = useState('');
  const [idVehiculo, setIdVehiculo] = useState('');
  const [idConductor, setIdConductor] = useState('');
  const [vehiculos, setVehiculos] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [paquetes, setPaquetes] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [idPaquete, setIdPaquete] = useState('');
  const [idRuta, setIdRuta] = useState('');
  const [fechaAsignacion, setFechaAsignacion] = useState('');
  const [estadoPaquete, setEstadoPaquete] = useState('');

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vehiculos/getVehiculos');
        setVehiculos(response.data);
      } catch (error) {
        console.error('Error al obtener los vehículos:', error);
      }
    };

    const fetchConductores = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/conductor/getConductores');
        setConductores(response.data);
      } catch (error) {
        console.error('Error al obtener los conductores:', error);
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

    const fetchRutas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rutas-asignaciones/getRutas');
        setRutas(response.data);
      } catch (error) {
        console.error('Error al obtener las rutas:', error);
      }
    };

    fetchVehiculos();
    fetchConductores();
    fetchPaquetes();
    fetchRutas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir distancia_km a número decimal
    const distanciaKmDecimal = parseFloat(distanciaKm);

    try {
      const response = await axios.post('http://localhost:5000/api/rutas-asignaciones/createRuta', {
        origen,
        destino,
        distancia_km: distanciaKmDecimal,
        tiempo_estimado: tiempoEstimado,
        id_vehiculo: idVehiculo,
        id_conductor: idConductor,
      });
      console.log('Ruta creada:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Ruta creada',
        text: 'La ruta ha sido creada exitosamente',
      });
      // Limpiar el formulario después de enviar
      handleCancel();
    } catch (error) {
      console.error('Error al crear la ruta:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear la ruta',
      });
    }
  };

  const handleCancel = () => {
    setOrigen('');
    setDestino('');
    setDistanciaKm('');
    setTiempoEstimado('');
    setIdVehiculo('');
    setIdConductor('');
  };

  const handleAsignarPaquete = async (e) => {
    e.preventDefault();

    // Validar datos antes de enviar
    if (!idPaquete || !idRuta || !fechaAsignacion || !estadoPaquete) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    const data = {
      id_paquete: idPaquete,
      id_ruta: idRuta,
      fecha_asignacion: fechaAsignacion,
      estado: estadoPaquete, // Asegúrate de que este valor sea uno de los permitidos
    };

    console.log('Datos a enviar:', data);

    try {
      const response = await axios.post('http://localhost:5000/api/rutas-asignaciones/asignarPaquete', data);
      console.log('Paquete asignado:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Paquete asignado',
        text: 'El paquete ha sido asignado exitosamente',
      });
      // Limpiar el formulario después de enviar
      handleCancelAsignacion();
    } catch (error) {
      console.error('Error al asignar el paquete:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al asignar el paquete',
      });
    }
  };

  const handleCancelAsignacion = () => {
    setIdPaquete('');
    setIdRuta('');
    setFechaAsignacion('');
    setEstadoPaquete('');
  };

  return (
    <div>
      <div className="crear-ruta-dashboard p-6 bg-white rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Crear una ruta</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Asigne una ruta a una ruta disponible.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="origen" className="block text-sm font-medium text-gray-700">Origen</label>
            <input
              type="text"
              id="origen"
              placeholder="Ingrese el origen"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="destino" className="block text-sm font-medium text-gray-700">Destino</label>
            <input
              type="text"
              id="destino"
              placeholder="Ingrese el destino"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="distanciaKm" className="block text-sm font-medium text-gray-700">Distancia (km)</label>
            <input
              type="text"
              id="distanciaKm"
              placeholder="Ingrese la distancia"
              value={distanciaKm}
              onChange={(e) => setDistanciaKm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="tiempoEstimado" className="block text-sm font-medium text-gray-700">Tiempo estimado</label>
            <input
              type="text"
              id="tiempoEstimado"
              placeholder="Ingrese el tiempo estimado"
              value={tiempoEstimado}
              onChange={(e) => setTiempoEstimado(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="idVehiculo" className="block text-sm font-medium text-gray-700">Vehículo</label>
            <select
              id="idVehiculo"
              value={idVehiculo}
              onChange={(e) => setIdVehiculo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un vehículo</option>
              {vehiculos.map((vehiculo) => (
                <option key={vehiculo.id_vehiculo} value={vehiculo.id_vehiculo}>
                  {vehiculo.placa} - {vehiculo.marca} {vehiculo.modelo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="idConductor" className="block text-sm font-medium text-gray-700">Conductor</label>
            <select
              id="idConductor"
              value={idConductor}
              onChange={(e) => setIdConductor(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un conductor</option>
              {conductores.map((conductor) => (
                <option key={conductor.id_conductor} value={conductor.id_conductor}>
                  {conductor.nombre} {conductor.apellido_paterno} {conductor.apellido_materno}
                </option>
              ))}
            </select>
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
              Crear Ruta
            </button>
          </div>
        </form>
      </div>
      {/*FORMULARIO DE Asignar paquete a la ruta */}
      <div className="asignar-paquete-dashboard p-6 bg-white rounded-lg mt-8">
        <h1 className="text-2xl font-bold mb-4">Asignar paquete a la ruta</h1>
        <p className="text-[#6E6E77] mb-6 text-sm">Asigne un paquete a una ruta disponible.</p>
        <form onSubmit={handleAsignarPaquete} className="space-y-4">
          <div>
            <label htmlFor="idPaquete" className="block text-sm font-medium text-gray-700">Paquete</label>
            <select
              id="idPaquete"
              value={idPaquete}
              onChange={(e) => setIdPaquete(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un paquete</option>
              {paquetes.map((paquete) => (
                <option key={paquete.id_paquete} value={paquete.id_paquete}>
                  {paquete.codigo_rastreo} - {paquete.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="idRuta" className="block text-sm font-medium text-gray-700">Ruta</label>
            <select
              id="idRuta"
              value={idRuta}
              onChange={(e) => setIdRuta(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione una ruta</option>
              {rutas.map((ruta) => (
                <option key={ruta.id_ruta} value={ruta.id_ruta}>
                  {ruta.origen} - {ruta.destino}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="fechaAsignacion" className="block text-sm font-medium text-gray-700">Fecha de asignación</label>
            <input
              type="date"
              id="fechaAsignacion"
              value={fechaAsignacion}
              onChange={(e) => setFechaAsignacion(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="estadoPaquete" className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              id="estadoPaquete"
              value={estadoPaquete}
              onChange={(e) => setEstadoPaquete(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccione un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en curso">En curso</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="flex items-center px-4 py-2 bg-white text-[#979AAD] text-sm rounded-md hover:bg-[#e6e6e7] border border-gray-300"
              onClick={handleCancelAsignacion}
            >
              <CircleX className="w-5 h-5 mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 text-sm bg-[#2F2F31] text-white rounded-md hover:bg-[#3F3F41]"
            >
              <Save className="w-5 h-5 mr-2" />
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearRuta;