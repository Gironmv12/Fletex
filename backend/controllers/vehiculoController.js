import express from 'express';
import { body, validationResult } from 'express-validator';
import Vehiculo from '../models/vehiculosModel.js';
import Ruta from '../models/rutasModel.js';

const router = express.Router();

// Crear un vehículo
router.post('/createVehiculo', [
    body('placa').notEmpty().withMessage('La placa es requerida'),
    body('marca').notEmpty().withMessage('La marca es requerida'),
    body('modelo').notEmpty().withMessage('El modelo es requerido'),
    body('estado').isIn(['disponible', 'en uso', 'en mantenimiento']).withMessage('El estado es requerido'),
    body('created_by').notEmpty().withMessage('El campo created_by es requerido'),
    body('updated_by').notEmpty().withMessage('El campo updated_by es requerido'),
    body('tipo_vehiculo').isIn(['camión', 'furgoneta', 'automóvil', 'motocicleta']).withMessage('El tipo de vehículo es requerido'),
    body('capacidad_carga').isFloat().withMessage('La capacidad de carga es requerida'),
    body('observaciones').notEmpty().withMessage('Las observaciones son requeridas')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { placa, marca, modelo, estado, created_by, updated_by, tipo_vehiculo, capacidad_carga, observaciones } = req.body;

    try {
        const nuevoVehiculo = await Vehiculo.create({
            placa,
            marca,
            modelo,
            estado,
            created_by,
            updated_by,
            tipo_vehiculo,
            capacidad_carga,
            observaciones
        });

        res.status(201).json(nuevoVehiculo);
    } catch (error) {
        console.error('Error al crear el vehículo:', error);
        res.status(500).json({ error: 'Error al crear el vehículo' });
    }
});

// Obtener todos los vehículos
router.get('/getVehiculos', async (_, res) => {
    try {
        const vehiculos = await Vehiculo.findAll();
        res.json(vehiculos);
    } catch (error) {
        console.error('Error al obtener los vehículos:', error);
        res.status(500).json({ error: 'Error al obtener los vehículos' });
    }
});

//obtener vehiculo solo por id
router.get('/getVehiculo/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const vehiculo = await Vehiculo.findByPk(id);
        if (!vehiculo) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }

        res.json(vehiculo);
    } catch (error) {
        console.error('Error al obtener el vehículo:', error);
        res.status(500).json({ error: 'Error al obtener el vehículo' });
    }
});

// Editar un vehículo
router.put('/editVehiculo/:id',async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { placa, marca, modelo, estado, updated_by, tipo_vehiculo, capacidad_carga, observaciones } = req.body;

    try {
        const vehiculo = await Vehiculo.findByPk(id);
        if (!vehiculo) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }

        vehiculo.placa = placa;
        vehiculo.marca = marca;
        vehiculo.modelo = modelo;
        vehiculo.estado = estado;
        vehiculo.updated_by = updated_by;
        vehiculo.tipo_vehiculo = tipo_vehiculo;
        vehiculo.capacidad_carga = capacidad_carga;
        vehiculo.observaciones = observaciones;

        await vehiculo.save();

        res.json(vehiculo);
    } catch (error) {
        console.error('Error al actualizar el vehículo:', error);
        res.status(500).json({ error: 'Error al actualizar el vehículo' });
    }
});

// Eliminar un vehículo
router.delete('/deleteVehiculo/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const vehiculo = await Vehiculo.findByPk(id);
        if (!vehiculo) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }

        // Verificar que el vehículo tenga el estado 'disponible'
        if (vehiculo.estado !== 'disponible') {
            return res.status(400).json({ error: 'Solo se pueden eliminar vehículos con estado disponible' });
        }

        // Verificar que el vehículo no esté asignado a ninguna ruta
        const rutas = await Ruta.findAll({ where: { id_vehiculo: id } });
        if (rutas.length > 0) {
            return res.status(400).json({ error: 'No se puede eliminar el vehículo porque está asignado a una ruta' });
        }

        await vehiculo.destroy();
        res.json({ message: 'Vehículo eliminado' });
    } catch (error) {
        console.error('Error al eliminar el vehículo:', error);
        res.status(500).json({ error: 'Error al eliminar el vehículo' });
    }
});
export default router;