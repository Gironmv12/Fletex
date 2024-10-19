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
Paquete.hasMany(HistorialEstadoPaquete, { foreignKey: 'id_paquete', as: 'historiales' });

Vehiculo.belongsTo(Usuario, { foreignKey: 'created_by', as: 'creador' });
Vehiculo.belongsTo(Usuario, { foreignKey: 'updated_by', as: 'actualizador' });
Vehiculo.hasMany(Ruta, { foreignKey: 'id_vehiculo', as: 'rutas' });

Conductor.belongsTo(Usuario, { foreignKey: 'created_by', as: 'creador' });
Conductor.belongsTo(Usuario, { foreignKey: 'updated_by', as: 'actualizador' });
Conductor.hasMany(Ruta, { foreignKey: 'id_conductor', as: 'rutas' });

Ruta.belongsTo(Vehiculo, { foreignKey: 'id_vehiculo', as: 'vehiculo' });
Ruta.belongsTo(Conductor, { foreignKey: 'id_conductor', as: 'conductor' });
Ruta.belongsTo(Usuario, { foreignKey: 'created_by', as: 'creador' });
Ruta.belongsTo(Usuario, { foreignKey: 'updated_by', as: 'actualizador' });
Ruta.hasMany(AsignacionPaquete, { foreignKey: 'id_ruta', as: 'asignaciones' });

AsignacionPaquete.belongsTo(Paquete, { foreignKey: 'id_paquete', as: 'paquete' });
AsignacionPaquete.belongsTo(Ruta, { foreignKey: 'id_ruta', as: 'ruta' });
AsignacionPaquete.belongsTo(Usuario, { foreignKey: 'created_by', as: 'creador' });
AsignacionPaquete.belongsTo(Usuario, { foreignKey: 'updated_by', as: 'actualizador' });

// Registrar las asociaciones
Paquete.associate({ AsignacionPaquete, HistorialEstadoPaquete });
AsignacionPaquete.associate({ Paquete, Ruta, Usuario });
Ruta.associate({ Vehiculo, Conductor, AsignacionPaquete });
Vehiculo.associate({ Ruta });
Conductor.associate({ Ruta });
HistorialEstadoPaquete.associate({ Paquete });
EstadoPaquete.hasMany(Paquete, { foreignKey: 'id_estado', as: 'paquetes' });

// Sincronizar base de datos
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });

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