import express from 'express';
import { body, validationResult } from 'express-validator';
import Ruta from '../models/rutasModel.js';
import Vehiculo from '../models/vehiculosModel.js';
import Conductor from '../models/conductoresModel.js';
import AsignacionPaquete from '../models/asignacionesPaquetesModel.js';
import Paquete from '../models/paquetesModel.js';
import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';

const router = express.Router();

// Crear una ruta
router.post('/createRuta', [
    body('origen').notEmpty().withMessage('El origen es requerido'),
    body('destino').notEmpty().withMessage('El destino es requerido'),
    body('distancia_km').optional().isDecimal().withMessage('La distancia debe ser un número decimal'),
    body('tiempo_estimado').optional().isString().withMessage('El tiempo estimado debe ser una cadena de texto'),
    body('id_vehiculo').notEmpty().withMessage('El vehículo es requerido'),
    body('id_conductor').notEmpty().withMessage('El conductor es requerido')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origen, destino, distancia_km, tiempo_estimado, id_vehiculo, id_conductor } = req.body;

    try {
        const nuevaRuta = await Ruta.create({
            origen,
            destino,
            distancia_km,
            tiempo_estimado,
            id_vehiculo,
            id_conductor
        });

        res.status(201).json(nuevaRuta);
    } catch (error) {
        console.error('Error al crear la ruta:', error);
        res.status(500).json({ error: 'Error al crear la ruta' });
    }
});
// Asignar paquete a una ruta
router.post('/asignarPaquete', [
    body('id_paquete').isInt().withMessage('El paquete es requerido'),
    body('id_ruta').isInt().withMessage('La ruta es requerida'),
    body('fecha_asignacion').isISO8601().withMessage('La fecha de asignación debe ser una fecha válida'),
    body('estado').isIn(['pendiente', 'en curso', 'completado', 'cancelado']).withMessage('El estado es requerido'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_paquete, id_ruta, fecha_asignacion, estado } = req.body;

    try {
        const asignacion = await AsignacionPaquete.create({
            id_paquete,
            id_ruta,
            fecha_asignacion,
            estado,
        });

        res.status(201).json(asignacion);
    } catch (error) {
        console.error('Error al asignar el paquete:', error);
        res.status(500).json({ error: 'Error al asignar el paquete', details: error.message });
    }
});

// Actualizar fecha completada de un paquete
router.put('/completarAsignacion/:id', [
    body('fecha_completada').isISO8601().withMessage('La fecha completada debe ser una fecha válida')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fecha_completada } = req.body;
    const { id } = req.params;

    try {
        const asignacion = await AsignacionPaquete.findByPk(id);
        if (!asignacion) {
            return res.status(404).json({ error: 'Asignación no encontrada' });
        }

        asignacion.fecha_completada = fecha_completada;
        await asignacion.save();

        res.status(200).json(asignacion);
    } catch (error) {
        console.error('Error al actualizar la fecha completada:', error);
        res.status(500).json({ error: 'Error al actualizar la fecha completada', details: error.message });
    }
});

// Obtener todas las rutas
router.get('/getRutas', async (_, res) => {
    try {
        const rutas = await Ruta.findAll();
        res.json(rutas);
    } catch (error) {
        console.error('Error al obtener las rutas:', error);
        res.status(500).json({ error: 'Error al obtener las rutas' });
    }
});

// Obtener rutas disponibles
router.get('/getRutasDisponibles', async (_, res) => {
    try {
        const rutas = await sequelize.query('CALL obtener_rutas_disponibles()', {
            type: Sequelize.QueryTypes.RAW
        });

        res.json(rutas);
    } catch (error) {
        console.error('Error al obtener las rutas disponibles:', error.message);
        console.error('Detalles del error:', error);

        res.status(500).json({
            error: 'Error al obtener las rutas disponibles',
            message: error.message,
            stack: error.stack
        });
    }
});

router.get('/testRutasVehiculos', async (_, res) => {
    try {
        const rutas = await Ruta.findAll({
            include: [
                {
                    model: AsignacionPaquete,
                    as: 'asignaciones',
                }
            ]
        });
        res.json(rutas);
    } catch (error) {
        console.error('Error al obtener las rutas con vehículos:', error);
        res.status(500).json({ error: 'Error al obtener las rutas con vehículos' });
    }
});

export default router;