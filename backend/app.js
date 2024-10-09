import express from 'express';
import { connectDB } from './config/db.js';
import userRoutes from './routes/routes.js'; 
import clienteRoutes from './routes/clienteRoutes.js';

import dotenv from 'dotenv';


const app = express();
const PORT = process.env.PORT || 5000;

// Configurar variables de entorno
dotenv.config();
// Habilitar express.json para manejar JSON en las solicitudes
app.use(express.json());

// Usar las rutas importadas
app.use('/api', userRoutes);
//usar las rutas de cliente
app.use('/api', clienteRoutes);

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