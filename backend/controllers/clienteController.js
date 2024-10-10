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

//crear controlador para obtener todos los clientes
router.get('/getClientes', async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        console.error('Error al obtener los clientes:', error); // Agregar más detalles al mensaje de error
        res.status(500).json({ error: 'Error al obtener los clientes', details: error.message });
    }
});

//obtener un cliente por id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        res.json(cliente);
    } catch (error) {
        console.error('Error al obtener el cliente:', error); // Agregar más detalles al mensaje de error
        res.status(500).json({ error: 'Error al obtener el cliente', details: error.message });
    }
});


// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email, direccion, updated_by } = req.body; // Incluir updated_by

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        cliente.nombre = nombre;
        cliente.telefono = telefono;
        cliente.email = email;
        cliente.direccion = direccion;
        cliente.updated_by = updated_by; // Incluir updated_by

        await cliente.save();
        res.status(200).json(cliente);
    } catch (error) {
        console.error('Error al actualizar el cliente:', error); // Agregar más detalles al mensaje de error
        res.status(500).json({ error: 'Error al actualizar el cliente', details: error.message });
    }
});

//eliminar un cliente por id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        await cliente.destroy();
        res.status(200).json({ message: 'Cliente borrado exitosamente' }); // Respuesta indicando éxito
    } catch (error) {
        console.error('Error al eliminar el cliente:', error); // Agregar más detalles al mensaje de error
        res.status(500).json({ error: 'Error al eliminar el cliente', details: error.message });
    }
});

export default router; // Exportar el routergir