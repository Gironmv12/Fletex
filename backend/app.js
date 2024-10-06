const express = require('express');
const { connectDB } = require('./config/db'); // Asegúrate de que esta función maneje la conexión y sincronización
const models = require('./models/index'); // Importa todos los modelos

const app = express();
const PORT = process.env.PORT || 5000;

// Habilitar express.json para manejar JSON en las solicitudes
app.use(express.json());

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
    