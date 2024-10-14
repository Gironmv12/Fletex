import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/routes.js'; 
import clienteRoutes from './routes/clienteRoutes.js';
import paqueteRoutes from './routes/paqueteRoutes.js';
import almacenRoutes from './routes/almacenRouter.js';
import inventariosRoutes from './routes/inventariosRoutes.js';
import vehiculosRoutes from './routes/vehiculosRoutes.js';

import dotenv from 'dotenv';
import cors from 'cors';


const app = express();

const PORT = process.env.PORT || 5000;

// Configurar variables de entorno
dotenv.config();
// Habilitar express.json para manejar JSON en las solicitudes
app.use(express.json());


app.use(cors());

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

// Conectar a la base de datos y sincronizar
connectDB()
    .then(() => {
        console.log('Base de datos conectada y sincronizada.');
        // Rutas deben estar definidas después de la conexión a la base de datos
        app.use('/api/inventarios', inventariosRoutes);

        // Iniciar el servidor solo después de que la base de datos se ha conectado y sincronizado
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar y sincronizar la base de datos:', err);
    });
    