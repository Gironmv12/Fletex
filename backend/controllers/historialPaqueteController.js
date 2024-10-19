import express from 'express';
import { sequelize } from '../config/db.js';

const router = express.Router();

// Obtener el historial de estado de paquetes
router.get('/getHistorialPaquete', async (req, res) => {
    const { fechaInicio, fechaFin, estado, responsable } = req.query;

    try {
        const historial = await sequelize.query(
            'CALL obtener_historial_estado_paquetes(:fechaInicio, :fechaFin, :estado, :responsable)',
            {
                replacements: {
                    fechaInicio: fechaInicio || null,
                    fechaFin: fechaFin || null,
                    estado: estado || null,
                    responsable: responsable || null
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.json(historial);
    } catch (error) {
        console.error('Error al obtener el historial de estado de paquetes:', error);
        res.status(500).json({ error: 'Error al obtener el historial de estado de paquetes' });
    }
});

export default router;