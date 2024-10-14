import express from 'express';
import vehiculoController from '../controllers/vehiculoController.js';

const routerVehiculos = express.Router();

routerVehiculos.use('/vehiculos', vehiculoController);

export default routerVehiculos;
