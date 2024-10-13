import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';
import Inventario from './inventariosModel.js';

class Almacen extends Model {}

Almacen.init({
    id_almacen: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_by: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'usuarios', // Nombre de la tabla referenciada
            key: 'id_usuario' // Clave primaria de la tabla referenciada
        }
    },
    updated_by: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'usuarios', // Nombre de la tabla referenciada
            key: 'id_usuario' // Clave primaria de la tabla referenciada
        }
    }
}, {
    sequelize, 
    modelName: 'Almacen',
    tableName: 'almacenes',
    timestamps: false, 
});
Almacen.associate = function(models) {
    Almacen.hasMany(models.Inventario, { foreignKey: 'id_almacen' });
};

export default Almacen; // Exportar el modelo Almacen para poder ser requerido en otros archivos