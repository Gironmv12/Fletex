import express from 'express';
import DashboardController from '../controllers/dashboardController.js';

const routerDashboard = express.Router();

// Definir las rutas para el dashboard
routerDashboard.use('/dashboard', DashboardController);

export default routerDashboard;