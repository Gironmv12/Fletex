import express from 'express';
import { body, validationResult } from 'express-validator';
import { sequelize } from '../config/db.js';
import Paquete from '../models/paquetesModel.js';
import Inventario from '../models/inventariosModel.js';
import Cliente from '../models/clientesModel.js';
import EstadoPaquete from '../models/estadoPaqueteModel.js';
import Almacen from '../models/almacenesModel.js';
import Usuario from '../models/usuarioModel.js';
import HistorialEstadoPaquete from '../models/historialEstadoPaqueteModel.js'; 

const router = express.Router();

// Crear paquete
router.post('/createPaquete', [
    body('id_cliente').isInt().withMessage('El cliente es requerido'),
    body('direccion_destino').notEmpty().withMessage('La dirección de destino es requerida'),
    body('peso').isFloat().withMessage('El peso es requerido'),
    body('dimensiones').notEmpty().withMessage('Las dimensiones son requeridas'),
    body('id_estado').isInt().withMessage('El estado es requerido'),
    body('direccion_remitente').notEmpty().withMessage('La dirección del remitente es requerida'),
    body('metodo_envio').isIn(['normal', 'express']).withMessage('El método de envío es requerido'),
    body('id_almacen').isInt().withMessage('El almacén es requerido'),
    body('cantidad').isInt({ min: 1 }).withMessage('La cantidad es requerida y debe ser al menos 1')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        id_cliente, direccion_destino, peso, dimensiones, id_estado, descripcion,
        fecha_envio, fecha_entrega, direccion_remitente, metodo_envio, costo,
        metodo_pago, id_almacen, cantidad
    } = req.body;

    const transaction = await sequelize.transaction(); // Iniciar una transacción

    try {
        const codigo_rastreo = `PAQ-${Date.now()}`;

        // Generar la etiqueta de envío automáticamente
        const etiqueta_envio = `
            Código de Rastreo: ${codigo_rastreo}
            Cliente: ${id_cliente}
            Dirección de Destino: ${direccion_destino}
            Peso: ${peso} KG
            Dimensiones: ${dimensiones}
            Estado: ${id_estado}
            Dirección del Remitente: ${direccion_remitente}
            Método de Envío: ${metodo_envio}
        `;

        // Verificar que el cliente existe
        const cliente = await Cliente.findByPk(id_cliente, { transaction });
        if (!cliente) {
            await transaction.rollback();
            return res.status(400).json({ error: 'El cliente especificado no existe' });
        }

        // Verificar que el estado del paquete existe
        const estadoPaquete = await EstadoPaquete.findByPk(id_estado, { transaction });
        if (!estadoPaquete) {
            await transaction.rollback();
            return res.status(400).json({ error: 'El estado del paquete especificado no existe' });
        }

        // Verificar que el almacén existe
        const almacen = await Almacen.findByPk(id_almacen, { transaction });
        if (!almacen) {
            await transaction.rollback();
            return res.status(400).json({ error: 'El almacén especificado no existe' });
        }

        // Crear el registro en inventarios
        const inventario = await Inventario.create({
            id_almacen: id_almacen,
            descripcion: `Paquete ${codigo_rastreo}`,
            cantidad: cantidad // Asigna la cantidad proporcionada
        }, { transaction });

        // Crear el paquete con id_inventario
        const paquete = await Paquete.create({
            id_cliente, direccion_destino, peso, dimensiones, id_estado, descripcion,
            fecha_envio, fecha_entrega, direccion_remitente, metodo_envio, costo,
            metodo_pago, etiqueta_envio, codigo_rastreo,
            id_inventario: inventario.id_inventario // Asignar el id_inventario creado
        }, { transaction });

        await transaction.commit(); // Confirmar la transacción

        res.status(201).json({ paquete, inventario });
    } catch (error) {
        await transaction.rollback(); // Revertir la transacción en caso de error
        console.error('Error al crear el paquete:', error);
        res.status(500).json({ 
            error: 'Error al crear el paquete', 
            details: error.message, 
            stack: error.stack // Esto puede ser útil para depuración
        });
    }
});

// Obtener todos los paquetes
router.get('/getPaquetes', async (req, res) => {
    try {
        const paquetes = await Paquete.findAll();
        res.json(paquetes);
    } catch (error) {
        console.error('Error al obtener los paquetes:', error);
        res.status(500).json({ error: 'Error al obtener los paquetes', details: error.message });
    }
});

// Editar un paquete
router.put('/:id', [
    body('id_cliente').isInt().withMessage('El cliente es requerido'),
    body('direccion_destino').notEmpty().withMessage('La dirección de destino es requerida'),
    body('peso').isFloat().withMessage('El peso es requerido'),
    body('dimensiones').notEmpty().withMessage('Las dimensiones son requeridas'),
    body('id_estado').isInt().withMessage('El estado es requerido'),
    body('direccion_remitente').notEmpty().withMessage('La dirección del remitente es requerida'),
    body('metodo_envio').isIn(['normal', 'express']).withMessage('El método de envío es requerido'),
    body('id_almacen').isInt().withMessage('El almacén es requerido'),
    body('cantidad').isInt({ min: 1 }).withMessage('La cantidad es requerida y debe ser al menos 1')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { id_cliente, direccion_destino, peso, dimensiones, id_estado, descripcion,
        fecha_envio, fecha_entrega, direccion_remitente, metodo_envio, costo,
        metodo_pago, id_inventario } = req.body;

    const transaction = await sequelize.transaction(); // Iniciar una transacción

    try {
        const paquete = await Paquete.findByPk(id, { transaction });
        if (!paquete) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        // Verificar que el cliente existe
        const cliente = await Cliente.findByPk(id_cliente, { transaction });
        if (!cliente) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Cliente no encontrado' });
        }

        // Verificar que el estado del paquete existe
        const estadoPaquete = await EstadoPaquete.findByPk(id_estado, { transaction });
        if (!estadoPaquete) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Estado del paquete no encontrado' });
        }

        // Verificar que el inventario existe
        const inventario = await Inventario.findByPk(id_inventario, { transaction });
        if (!inventario) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Inventario no encontrado' });
        }

        // Actualizar el paquete
        paquete.id_cliente = id_cliente;
        paquete.direccion_destino = direccion_destino;
        paquete.peso = peso;
        paquete.dimensiones = dimensiones;
        paquete.id_estado = id_estado;
        paquete.descripcion = descripcion;
        paquete.fecha_envio = fecha_envio;
        paquete.fecha_entrega = fecha_entrega;
        paquete.direccion_remitente = direccion_remitente;
        paquete.metodo_envio = metodo_envio;
        paquete.costo = costo;
        paquete.metodo_pago = metodo_pago;
        paquete.id_inventario = id_inventario;

        await paquete.save({ transaction });
        await transaction.commit(); // Confirmar la transacción

        res.status(200).json(paquete);
    } catch (error) {
        await transaction.rollback(); // Revertir la transacción en caso de error
        console.error('Error al actualizar el paquete:', error);
        res.status(500).json({ error: 'Error al actualizar el paquete', details: error.message });
    }
});

// Eliminar un paquete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const transaction = await sequelize.transaction(); // Iniciar una transacción

    try {
        const paquete = await Paquete.findByPk(id, { transaction });
        if (!paquete) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }

        // Eliminar registros relacionados en historial_estado_paquete
        await HistorialEstadoPaquete.destroy({
            where: { id_paquete: id },
            transaction
        });

        // Eliminar el paquete
        await paquete.destroy({ transaction });

        await transaction.commit(); // Confirmar la transacción

        res.status(200).json({ message: 'Paquete eliminado exitosamente' });
    } catch (error) {
        await transaction.rollback(); // Revertir la transacción en caso de error
        console.error('Error al eliminar el paquete:', error);
        res.status(500).json({ error: 'Error al eliminar el paquete', details: error.message });
    }
});

// Obtener estados de paquete
router.get('/getEstadosPaquete', async (req, res) => {
    try {
        const estadosPaquete = await EstadoPaquete.findAll();
        res.json(estadosPaquete);
    } catch (error) {
        console.error('Error al obtener los estados de paquete:', error);
        res.status(500).json({ error: 'Error al obtener los estados de paquete', details: error.message });
    }
});

export default router;