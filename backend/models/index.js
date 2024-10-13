import { sequelize } from '../config/db.js'; // Asegúrate de que la ruta sea correcta
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

// Inicializar modelos
Almacen.init({}, { sequelize });
Usuario.init({}, { sequelize });
AsignacionPaquete.init({}, { sequelize });
Paquete.init({}, { sequelize });
Ruta.init({}, { sequelize });
Vehiculo.init({}, { sequelize });
Conductor.init({}, { sequelize });
Cliente.init({}, { sequelize });
EstadoPaquete.init({}, { sequelize });
Inventario.init({}, { sequelize });
HistorialEstadoPaquete.init({}, { sequelize });
DireccionCliente.init({}, { sequelize });

// Definir relaciones entre modelos después de la inicialización
Almacen.hasMany(Inventario, { foreignKey: 'id_almacen', as: 'inventarios' });
Inventario.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });

Inventario.belongsTo(Usuario, { foreignKey: 'created_by', as: 'creador' });
Inventario.belongsTo(Usuario, { foreignKey: 'updated_by', as: 'actualizador' });

Inventario.hasMany(Paquete, { foreignKey: 'id_inventario', as: 'paquetes' });
Paquete.belongsTo(Inventario, { foreignKey: 'id_inventario', as: 'inventario' });

Paquete.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });
Paquete.belongsTo(EstadoPaquete, { foreignKey: 'id_estado', as: 'estado' });
Paquete.belongsTo(Usuario, { foreignKey: 'created_by', as: 'creador' });
Paquete.belongsTo(Usuario, { foreignKey: 'updated_by', as: 'actualizador' });
Paquete.hasMany(AsignacionPaquete, { foreignKey: 'id_paquete', as: 'asignaciones' });

// Agregar otras asociaciones según sea necesario
// ...

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

// Exportar los modelos
export default models;