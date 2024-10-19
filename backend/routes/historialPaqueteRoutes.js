import express from 'express';
import HistorialEstadoPaqueteController from '../controllers//historialPaqueteController.js';

const routerHistorialPaquete = express.Router();
// Definir las rutas para el historial de paquetes
routerHistorialPaquete.use('/historial-paquete', HistorialEstadoPaqueteController);

export default routerHistorialPaquete;