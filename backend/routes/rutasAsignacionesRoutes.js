import express from 'express';
import rutasAsignacionesController from '../controllers/rutasAsignacionesController.js';

const routerRutasAsignaciones = express.Router();

// Definir las rutas para las asignaciones
routerRutasAsignaciones.use('/rutas-asignaciones', rutasAsignacionesController);

export default routerRutasAsignaciones;