import express from 'express';
import { sequelize } from '../config/db.js';
const router = express.Router();

router.get('/:codigo_rastreo', async (req, res) => {
    const { codigo_rastreo } = req.params;

    try {
        const paquete = await sequelize.query(`CALL obtenerInfoPaquete(:codigo_rastreo)`, {
            replacements: { codigo_rastreo }
        });

        if (!paquete || paquete.length === 0) {
            return res.status(404).json({ mensaje: 'Paquete no encontrado' });
        }

        const paqueteInfo = paquete[0];

        const response = {
            id_paquete: paqueteInfo.id_paquete,
            descripcion: paqueteInfo.descripcion,
            peso: paqueteInfo.peso,
            dimensiones: paqueteInfo.dimensiones,
            fecha_envio: paqueteInfo.fecha_envio,
            fecha_entrega: paqueteInfo.fecha_entrega,
            created_at: paqueteInfo.created_at,
            updated_at: paqueteInfo.updated_at,
            direccion_remitente: paqueteInfo.direccion_remitente,
            direccion_destino: paqueteInfo.direccion_destino,
            metodo_envio: paqueteInfo.metodo_envio,
            costo: paqueteInfo.costo,
            metodo_pago: paqueteInfo.metodo_pago,
            etiqueta_envio: paqueteInfo.etiqueta_envio,
            codigo_rastreo: paqueteInfo.codigo_rastreo,
            estado: paqueteInfo.estado,
            cliente: {
                nombre: paqueteInfo.cliente_nombre,
                telefono: paqueteInfo.cliente_telefono,
                email: paqueteInfo.cliente_email,
                direccion: paqueteInfo.cliente_direccion
            }
        };

        res.json(response);
    } catch (error) {
        console.error('Error al obtener la información del paquete:', error);
        res.status(500).json({ mensaje: 'Error al obtener la información del paquete' });
    }
});

export default router;