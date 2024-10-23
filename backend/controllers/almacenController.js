import express from 'express';
import { body, validationResult } from 'express-validator';
import Almacen from '../models/almacenesModel.js';
import Inventario from '../models/inventariosModel.js';
import { sequelize } from '../config/db.js';

const router = express.Router();

// Crear un almacén
router.post('/createAlmacen', [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('ubicacion').notEmpty().withMessage('La ubicación es requerida')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, ubicacion } = req.body;

    try {
        const nuevoAlmacen = await Almacen.create({
            nombre,
            ubicacion
        });

        res.status(201).json(nuevoAlmacen);
    } catch (error) {
        console.error('Error al crear el almacén:', error);
        res.status(500).json({ error: 'Error al crear el almacén', details: error.message });
    }
});

// Obtener todos los almacenes
router.get('/getAlmacenes', async (req, res) => {
    try {
        const almacenes = await Almacen.findAll();
        res.json(almacenes);
    } catch (error) {
        console.error('Error al obtener los almacenes:', error);
        res.status(500).json({ error: 'Error al obtener los almacenes', details: error.message });
    }
});

// Editar un almacén
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ubicacion } = req.body;

    try {
        const almacen = await Almacen.findByPk(id);
        if (!almacen) {
            return res.status(404).json({ error: 'Almacén no encontrado' });
        }

        almacen.nombre = nombre;
        almacen.ubicacion = ubicacion;

        await almacen.save();

        res.json(almacen);
    } catch (error) {
        console.error('Error al editar el almacén:', error);
        res.status(500).json({ error: 'Error al editar el almacén', details: error.message });
    }
});

// Eliminar un almacén
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const almacen = await Almacen.findByPk(id);
        if (!almacen) {
            return res.status(404).json({ error: 'Almacén no encontrado' });
        }

        // Verificar si hay inventarios que referencien al almacén
        const inventarios = await Inventario.findAll({ where: { id_almacen: id } });
        if (inventarios.length > 0) {
            return res.status(400).json({ error: 'No se puede eliminar el almacén porque tiene inventarios asociados' });
        }

        await almacen.destroy();

        res.json({ message: 'Almacén eliminado' });
    } catch (error) {
        console.error('Error al eliminar el almacén:', error);
        res.status(500).json({ error: 'Error al eliminar el almacén', details: error.message });
    }
});

// Obtener datos combinados de Almacen e Inventario
router.get('/almacenInventario', async (req, res) => {
    try {
        const results = await sequelize.query('CALL GetAlmacenInventario()');
        res.json(results);  // Envía todos los resultados completos
    } catch (error) {
        console.error('Error al obtener los datos combinados:', error);
        res.status(500).json({ error: 'Error al obtener los datos combinados', details: error.message });
    }
});


export default router;