import express from 'express';
import rastreoController from '../controllers/rastreoController.js';

const routerRastreo = express.Router();

// Definir las rutas para el rastreo
routerRastreo.use('/rastreo', rastreoController);

export default routerRastreo;

