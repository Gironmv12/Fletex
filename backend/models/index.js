const Almacen = require('./almacenesModel');
const Usuario = require('./usuarioModel');
const AsignacionPaquete = require('./asignacionesPaquetesModel');
const Paquete = require('./paquetesModel');
const Ruta = require('./rutasModel');
const Vehiculo = require('./vehiculosModel');
const Conductor = require('./conductoresModel');
const Cliente = require('./clientesModel');
const EstadoPaquete = require('./estadoPaqueteModel');
const Inventario = require('./inventariosModel');
const HistorialEstadoPaquete = require('./historialEstadoPaqueteModel');
const DireccionCliente = require('./direccionesClienteModel');

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
module.exports = models;