import express from 'express';
import { body, validationResult } from 'express-validator';
import Conductores from '../models/conductoresModel.js';

const router = express.Router();

//crear un coductor
router.post('/createConductor', [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('apellido_paterno').notEmpty().withMessage('El apellido paterno es requerido'),
    body('apellido_materno').notEmpty().withMessage('El apellido materno es requerido'),
    body('licencia').notEmpty().withMessage('La licencia es requerida'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser una cadena de texto'),
    body('direccion').optional().isString().withMessage('La dirección debe ser una cadena de texto'),
    body('fecha_nacimiento').optional().isDate().withMessage('La fecha de nacimiento debe ser una fecha válida'),
    body('estado').optional().isIn(['disponible', 'en ruta', 'dado de baja']).withMessage('El estado debe ser válido'),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, apellido_paterno, apellido_materno, licencia, telefono, direccion, fecha_nacimiento, estado } = req.body;

    try{
        const nuevoConductor = await Conductores.create({
            nombre,
            apellido_paterno,
            apellido_materno,
            licencia,
            telefono,
            direccion,
            fecha_nacimiento,
            estado
        });
        res.status(201).json(nuevoConductor);

    }catch(error) {
        console.error('Error al crear el conductor:', error);
        res.status(500).json({ error: 'Error al crear el conductor', details: error.message });
    }
});

//obtener todos los conductores
router.get('/getConductores', async (_, res) => {
    try {
        const conductores = await Conductores.findAll();
        res.json(conductores);
    } catch (error) {
        console.error('Error al obtener los conductores:', error);
        res.status(500).json({ error: 'Error al obtener los conductores', details: error.message });
    }
});

//obtener conductor solo por id
router.get('/getConductor/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const conductor = await Conductores.findByPk(id);
        if (!conductor) {
            return res.status(404).json({ error: 'Conductor no encontrado' });
        }

        res.json(conductor);
    } catch (error) {
        console.error('Error al obtener el conductor:', error);
        res.status(500).json({ error: 'Error al obtener el conductor', details: error.message });
    }
});

//editar un conductor
router.put('/editConductor/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido_paterno, apellido_materno, licencia, telefono, direccion, fecha_nacimiento, estado } = req.body;

    try{
        const conductor = await Conductores.findByPk(id);
        if(!conductor) {
            return res.status(404).json({ error: 'Conductor no encontrado' });
        }

        conductor.nombre = nombre;
        conductor.apellido_paterno = apellido_paterno;
        conductor.apellido_materno = apellido_materno;
        conductor.licencia = licencia;
        conductor.telefono = telefono;
        conductor.direccion = direccion;
        conductor.fecha_nacimiento = fecha_nacimiento;
        conductor.estado = estado;

        await conductor.save();
        res.status(200).json(conductor);

    }catch(error) {
        console.error('Error al editar el conductor:', error);
        res.status(500).json({ error: 'Error al editar el conductor', details: error.message });
    }
})

//eliminar un conductor
router.delete('/deleteConductor/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const conductor = await Conductores.findByPk(id);
        if(!conductor) {
            return res.status(404).json({ error: 'Conductor no encontrado' });
        }

        await conductor.destroy();
        res.status(200).json({ message: 'Conductor eliminado correctamente' });

    }catch(error) {
        console.error('Error al eliminar el conductor:', error);
        res.status(500).json({ error: 'Error al eliminar el conductor', details: error.message });
    }
});

export default router;