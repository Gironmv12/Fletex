import express from 'express';
import { body, validationResult } from 'express-validator';
import Cliente from '../models/clientesModel.js';

const router = express.Router(); // Crear una instancia de express.Router()

// Crear cliente
router.post('/createCliente', [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('telefono').notEmpty().withMessage('El telefono es requerido'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('direccion').notEmpty().withMessage('La direccion es requerida'),
    body('created_by').notEmpty().withMessage('El campo created_by es requerido'), // Validar el campo created_by
    body('updated_by').notEmpty().withMessage('El campo updated_by es requerido')  // Validar el campo updated_by
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, telefono, email, direccion, created_by, updated_by } = req.body; // Incluir updated_by

    try {
        const cliente = await Cliente.create({ nombre, telefono, email, direccion, created_by, updated_by });
        res.status(201).json(cliente);
    } catch (error) {
        console.error('Error al crear el cliente:', error); // Agregar más detalles al mensaje de error
        res.status(500).json({ error: 'Error al crear el cliente', details: error.message });
    }
});

export default router; // Exportar el router