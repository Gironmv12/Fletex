import express from 'express';
import PaqueteController from '../controllers/paqueteController.js';

const routerPaquete = express.Router();
// Definir las rutas para el paquete
routerPaquete.use('/paquete', PaqueteController);

export default routerPaquete; // Exportar el router por defecto