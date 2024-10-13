import express from 'express';
import almacenController from '../controllers/almacenController.js';

const routerAlmacen = express.Router();

// Definir las rutas para el almacén
routerAlmacen.use('/almacen', almacenController);

export default routerAlmacen;