import express from 'express';
import reportesController from '../controllers/reportesController.js';

const routerReportes = express.Router();
// Definir las rutas para el reporte
routerReportes.use('/reporte', reportesController);

export default routerReportes;

