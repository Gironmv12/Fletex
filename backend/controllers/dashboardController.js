import express from 'express';
import Paquete from '../models/paquetesModel.js';
import Ruta from '../models/rutasModel.js';
import Almacen from '../models/almacenesModel.js';
import { sequelize } from '../config/db.js';

const router = express.Router();

router.get('/totalPaquetes', async (req, res) => {
    try {
        const totalPaquetes = await Paquete.count();
        res.json({ total: totalPaquetes });
    } catch (error) {
        console.error('Error al obtener el total de paquetes:', error);
        res.status(500).json({ error: 'Error al obtener el total de paquetes' });
    }
});

router.get('/rutasActivas', async (req, res) => {
    try {
        const rutasActivas = await Ruta.count({
            where: {
                estado: 'en uso'
            }
        });
        res.json({ total: rutasActivas });
    } catch (error) {
        console.error('Error al obtener el número de rutas activas:', error);
        res.status(500).json({ error: 'Error al obtener el número de rutas activas' });
    }
});

router.get('/paquetesPendientes', async (_, res) => {
    try {
        const [results] = await sequelize.query('CALL obtener_paquetes_pendientes()');
        const paquetesPendientes = results.numero_rutas_activas;
        res.json({ total: paquetesPendientes });
    } catch (error) {
        console.error('Error al obtener el número de paquetes pendientes:', error);
        res.status(500).json({ error: 'Error al obtener el número de paquetes pendientes' });
    }
});

router.get('/totalAlmacenes', async (req, res) => {
    try {
        const totalAlmacenes = await Almacen.count();
        res.json({ total: totalAlmacenes });
    } catch (error) {
        console.error('Error al obtener el número total de almacenes:', error);
        res.status(500).json({ error: 'Error al obtener el número total de almacenes' });
    }
});

router.get('/detallesPaquetes', async (_, res) => {
    try {
        const results = await sequelize.query('CALL obtener_detalles_paquetes()');
        res.json(results);  // Envía directamente los resultados como un array de objetos
    } catch (error) {
        console.error('Error al obtener los detalles de los paquetes:', error);
        res.status(500).json({ error: 'Error al obtener los detalles de los paquetes' });
    }
});

export default router;