import express from 'express';
import userController from '../controllers/UserController.js';

const router = express.Router();

// Definir las rutas para el usuario
router.use('/user', userController);


export default router;