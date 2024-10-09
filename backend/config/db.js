import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,   // Asegúrate de que esté usando el puerto 3308
    dialect: 'mysql',
    logging: false
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
    
    // Sincronizar modelos con la base de datos
    await sequelize.sync({ force: false });  // Cambia a true si necesitas recrear las tablas durante el desarrollo
    console.log('Base de datos sincronizada.');
    
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    throw error; // Esto permite manejar errores en la conexión desde donde llames connectDB()
  }
};

export { sequelize, connectDB };