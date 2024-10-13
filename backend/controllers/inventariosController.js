import express from 'express';
import Inventario from '../models/inventariosModel.js';
import Almacen from '../models/almacenesModel.js';
import { ValidationError } from 'sequelize'; // Importar el error de validación correcto

const router = express.Router();

// Obtener todos los inventarios con información del almacén
router.get('/getInventarios', async (req, res) => {
    try {
        console.log('Iniciando la consulta de inventarios...');
        const inventarios = await Inventario.findAll({
            include: {
                model: Almacen,
                as: 'almacen',
                attributes: ['nombre', 'ubicacion']
            }
        });
        console.log('Consulta de inventarios exitosa:', inventarios);
        res.json(inventarios);
    } catch (error) {
        console.error('Error al obtener los inventarios:', error);
        if (error instanceof ValidationError) {
            console.error('Error de validación:', error.errors);
        } else {
            console.error('Error desconocido:', error);
        }
        res.status(500).json({ error: 'Error al obtener los inventarios', details: error.message });
    }
});

export default router;