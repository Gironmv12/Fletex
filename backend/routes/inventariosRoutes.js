import express from 'express';
import inventariosController from '../controllers/inventariosController.js';

const routerInventarios = express.Router();

routerInventarios.use('/inventarios', inventariosController);

export default routerInventarios;