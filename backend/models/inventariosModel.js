import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';
import Almacen from './almacenesModel.js';

class Inventario extends Model {}

Inventario.init({
    id_inventario: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_almacen: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: true
    },
    updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Inventario',
    tableName: 'inventarios',
    timestamps: false, // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir las asociaciones después de la inicialización
Inventario.belongsTo(Almacen, { foreignKey: 'id_almacen', as: 'almacen' });

export default Inventario; // Exportar el modelo Inventario para poder ser requerido en otros archivos