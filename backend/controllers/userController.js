import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import Usuario from '../models/usuarioModel.js';

const router = express.Router();

// Crear un usuario
router.post('/create', [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').isIn(['administrador', 'operador']).withMessage('El rol debe ser administrador u operador')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password, rol } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({ nombre, email, password: hashedPassword, rol });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});
// Ruta de inicio de sesión
router.post('/login', [
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').notEmpty().withMessage('La contraseña es requerida')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id: usuario.id_usuario, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { nombre: usuario.nombre, email: usuario.email, rol: usuario.rol } });
    } catch (error) {
        console.error('Error al iniciar sesión:', error); // Agregar más detalles al mensaje de error
        res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
    }
});

// Obtener todos los usuarios (ruta protegida)
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Obtener un usuario por ID (sin ruta protegida)
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// Actualizar un usuario por ID (sin ruta protegida)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        usuario.nombre = nombre;
        usuario.email = email;
        usuario.rol = rol;

        await usuario.save();
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

// Eliminar un usuario por ID (sin ruta protegida)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await usuario.destroy();
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});


export default router;