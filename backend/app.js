import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/routes.js'; 
import clienteRoutes from './routes/clienteRoutes.js';
import paqueteRoutes from './routes/paqueteRoutes.js';
import almacenRoutes from './routes/almacenRouter.js';
import inventariosRoutes from './routes/inventariosRoutes.js';
import vehiculosRoutes from './routes/vehiculosRoutes.js';
import conductoresRoutes from './routes/conductoresRoutes.js';
import rutasAsignacionesRoutes from './routes/rutasAsignacionesRoutes.js';
import historialPaqueteRoutes from './routes/historialPaqueteRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const corsConfig = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
};

const PORT = process.env.PORT || 5000;

// Configurar variables de entorno
dotenv.config();
// Habilitar express.json para manejar JSON en las solicitudes
app.use(express.json());

app.use(cors(corsConfig));

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
  });

// Usar las rutas importadas
app.use('/api', userRoutes);
//usar las rutas de cliente
app.use('/api', clienteRoutes);
//usar las rutas de paquete
app.use('/api', paqueteRoutes);
//usar las rutas para almacen
app.use('/api', almacenRoutes);
//usar las rutas para inventarios
app.use('/api', inventariosRoutes);
//usar las rutas para vehiculos
app.use('/api', vehiculosRoutes);
//usar las rutas para conductores
app.use('/api', conductoresRoutes);
//usar las rutas para rutas y asignaciones
app.use('/api', rutasAsignacionesRoutes);
//user las rutas para historial de paquetes
app.use('/api', historialPaqueteRoutes);
//usar las rutas para dashboard
app.use('/api', dashboardRoutes);

// Conectar a la base de datos y sincronizar
connectDB()
    .then(() => {
        console.log('Base de datos conectada y sincronizada.');
        // Iniciar el servidor solo después de que la base de datos se ha conectado y sincronizado
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar y sincronizar la base de datos:', err);
    });
    