import express from 'express';
import clienteController from '../controllers/clienteController.js';

const routerCliente = express.Router();
// Definir las rutas para el cliente
routerCliente.use('/cliente', clienteController);

export default routerCliente;