import express from 'express';
import { body, validationResult } from 'express-validator';
import Almacen from '../models/almacenesModel.js';
import Inventario from '../models/inventariosModel.js';

const router = express.Router();

// Crear un almacén
router.post('/createAlmacen', [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('ubicacion').notEmpty().withMessage('La ubicación es requerida'),
    body('created_by').isInt().withMessage('El ID del creador es requerido'),
    body('updated_by').isInt().withMessage('El ID del actualizador es requerido')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, ubicacion, created_by, updated_by } = req.body;

    try {
        const nuevoAlmacen = await Almacen.create({
            nombre,
            ubicacion,
            created_by,
            updated_by
        });

        res.status(201).json(nuevoAlmacen);
    } catch (error) {
        console.error('Error al crear el almacén:', error);
        res.status(500).json({ error: 'Error al crear el almacén', details: error.message });
    }
});

//obtener todos lo alamacenes
router.get('/getAlmacenes', async (req, res) => {
    try {
        const almacenes = await Almacen.findAll();
        res.json(almacenes);
    } catch (error) {
        console.error('Error al obtener los almacenes:', error);
        res.status(500).json({ error: 'Error al obtener los almacenes', details: error.message });
    }
});

//editar un almacen
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ubicacion, updated_by } = req.body;

    try {
        const almacen = await Almacen.findByPk(id);
        if (!almacen) {
            return res.status(404).json({ error: 'Almacén no encontrado' });
        }

        almacen.nombre = nombre;
        almacen.ubicacion = ubicacion;
        almacen.updated_by = updated_by;

        await almacen.save();

        res.json(almacen);
    } catch (error) {
        console.error('Error al editar el almacén:', error);
        res.status(500).json({ error: 'Error al editar el almacén', details: error.message });
    }
});

//eliminar un alamacen
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
export default router;