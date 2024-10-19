import express from 'express';
import conductoresController from '../controllers/conductoresController.js';

const routerConductor = express.Router();
// Definir las rutas para el conductor
routerConductor.use('/conductor', conductoresController);

export default routerConductor;