import Almacen from './almacenesModel.js';
import Usuario from './usuarioModel.js';
import AsignacionPaquete from './asignacionesPaquetesModel.js';
import Paquete from './paquetesModel.js';
import Ruta from './rutasModel.js';
import Vehiculo from './vehiculosModel.js';
import Conductor from './conductoresModel.js';
import Cliente from './clientesModel.js';
import EstadoPaquete from './estadoPaqueteModel.js';
import Inventario from './inventariosModel.js';
import HistorialEstadoPaquete from './historialEstadoPaqueteModel.js';
import DireccionCliente from './direccionesClienteModel.js';

const models = {
    Almacen,
    Usuario,
    AsignacionPaquete,
    Paquete,
    Ruta,
    Vehiculo,
    Conductor,
    Cliente,
    EstadoPaquete,
    Inventario,
    HistorialEstadoPaquete,
    DireccionCliente
};

// exportar
export default models;