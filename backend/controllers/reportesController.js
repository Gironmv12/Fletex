import express from 'express';
import Paquete from '../models/paquetesModel.js';
import Ruta from '../models/rutasModel.js';
import Almacen from '../models/almacenesModel.js';
import Conductores from '../models/conductoresModel.js';
import Cliente from '../models/clientesModel.js';
import EstadoPaquete from '../models/estadoPaqueteModel.js';
import { sequelize } from '../config/db.js';

const router = express.Router();

router.get('/reporteGeneral', async (req, res) => {
    try {
        const totalPaquetes = await Paquete.count();
        const rutasActivas = await Ruta.count({ where: { estado: 'en uso' } });
        const [paquetesPendientesResults] = await sequelize.query('CALL obtener_paquetes_pendientes()');
        const paquetesPendientes = paquetesPendientesResults.numero_rutas_activas;
        const totalAlmacenes = await Almacen.count();
        const conductores = await Conductores.findAll();
        const clientes = await Cliente.findAll();

        const reporte = {
            totalPaquetes,
            rutasActivas,
            paquetesPendientes,
            totalAlmacenes,
            conductores,
            clientes
        };

        res.json(reporte);
    } catch (error) {
        console.error('Error al generar el reporte general:', error);
        res.status(500).json({ error: 'Error al generar el reporte general' });
    }
});

router.get('/reportePaquetesPorEstado', async (req, res) => {
    try {
        const paquetesPorEstado = await sequelize.query('CALL reportePaquetesPorEstado()');
        res.json(paquetesPorEstado);
    } catch (error) {
        console.error('Error al generar el reporte de paquetes por estado:', error);
        res.status(500).json({ error: 'Error al generar el reporte' });
    }
});

router.get('/reportePaquetePorCliente', async (req, res) => {
    try {
        const paquetesPorCliente = await sequelize.query('CALL reportePaquetesPorCliente()');
        res.json(paquetesPorCliente);

    } catch (error) {
        console.error('Error al generar el reporte de paquetes por cliente:', error);
        res.status(500).json({ error: 'Error al generar el reporte' });
    }
});

// Reporte de Inventario por Almacén
router.get('/reporteInventarioAlmacenes', async (req, res) => {
    try {
        const inventarioAlmacenes = await sequelize.query('CALL reporteInventarioAlmacenes()');
        res.json(inventarioAlmacenes);
    } catch (error) {
        console.error('Error al generar el reporte de inventario por almacén:', error);
        res.status(500).json({ error: 'Error al generar el reporte de inventario por almacén' });
    }
});

// Reporte de Tiempos de Entrega
router.get('/reporteTiemposEntrega', async (req, res) => {
    try {
        const tiemposEntrega = await sequelize.query('CALL reporteTiemposEntrega()');
        res.json(tiemposEntrega);
    } catch (error) {
        console.error('Error al generar el reporte de tiempos de entrega:', error);
        res.status(500).json({ error: 'Error al generar el reporte de tiempos de entrega' });
    }
});

// Reporte de Asignaciones de Paquetes a Rutas
router.get('/reporteAsignacionesPaquetes', async (req, res) => {
    try {
        const asignaciones = await sequelize.query('CALL reporteAsignacionesPaquetes()');
        res.json(asignaciones);
    } catch (error) {
        console.error('Error al generar el reporte de asignaciones de paquetes:', error);
        res.status(500).json({ error: 'Error al generar el reporte de asignaciones de paquetes' });
    }
});

export default router;