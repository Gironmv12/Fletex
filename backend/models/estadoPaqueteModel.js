import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';

class EstadoPaquete extends Model {}

EstadoPaquete.init({
    id_estado: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.ENUM('preparado', 'en tránsito', 'entregado', 'devuelto'),
        allowNull: false
    },
    descripcion: {
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
        allowNull: false
    },
    updated_by: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'EstadoPaquete',
    tableName: 'estado_paquete',
    timestamps: false, // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir las relaciones
EstadoPaquete.associate = (models) => {
    EstadoPaquete.belongsTo(models.Usuario, {
        foreignKey: 'created_by',
        as: 'creador'
    });
    EstadoPaquete.belongsTo(models.Usuario, {
        foreignKey: 'updated_by',
        as: 'actualizador'
    });
    EstadoPaquete.hasMany(models.Paquete, {
        foreignKey: 'id_estado',
        as: 'paquetes'
    });
};

export default EstadoPaquete;