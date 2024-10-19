import express from 'express';
import Paquete from '../models/paquetesModel.js';
import Ruta from '../models/rutasModel.js';
import Almacen from '../models/almacenesModel.js';
import { sequelize } from '../config/db.js';

const router = express.Router();

router.get('/totalPaquetes', async (req, res) => {
    try {
        const totalPaquetes = await Paquete.count();
        res.json({ totalPaquetes });
    } catch (error) {
        console.error('Error al obtener el total de paquetes:', error);
        res.status(500).json({ error: 'Error al obtener el total de paquetes' });
    }
});

//obtener el numero de rutas activas
router.get('/rutasActivas', async (req, res) => {
    try {
        const rutasActivas = await Ruta.count({
            where: {
                estado: 'en uso'
            }
        });
        res.json({ rutasActivas });
    } catch (error) {
        console.error('Error al obtener el número de rutas activas:', error);
        res.status(500).json({ error: 'Error al obtener el número de rutas activas' });
    }
});

// Obtener el número de paquetes pendientes
router.get('/paquetesPendientes', async (_, res) => {
    try {
        const [results] = await sequelize.query('CALL obtener_paquetes_pendientes()');
        const numeroRutasActivas = results.numero_rutas_activas;
        res.json({ paquetesPendientes: numeroRutasActivas });
    } catch (error) {
        console.error('Error al obtener el número de paquetes pendientes:', error);
        res.status(500).json({ error: 'Error al obtener el número de paquetes pendientes' });
    }
});


// Obtener el número total de almacenes
router.get('/totalAlmacenes', async (req, res) => {
    try {
        const totalAlmacenes = await Almacen.count();
        res.json({ totalAlmacenes });
    } catch (error) {
        console.error('Error al obtener el número total de almacenes:', error);
        res.status(500).json({ error: 'Error al obtener el número total de almacenes' });
    }
});

// Obtener detalles de los paquetes
router.get('/detallesPaquetes', async (_, res) => {
    try {
        const results = await sequelize.query('CALL obtener_detalles_paquetes()');
        res.json(results);  // Envía directamente los resultados como un array de objetos
    } catch (error) {
        console.error('Error al obtener los detalles de los paquetes:', error);
        res.status(500).json({ error: 'Error al obtener los detalles de los paquetes' });
    }
});
;


export default router;