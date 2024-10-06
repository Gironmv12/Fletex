const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db'); 

class HistorialEstadoPaquete extends Model {}
HistorialEstadoPaquete.init({
    id_historial: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_paquete: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    estado_anterior: {
        type: DataTypes.ENUM('preparado', 'en tránsito', 'entregado', 'devuelto'),
        allowNull: true
    },
    estado_nuevo: {
        type: DataTypes.ENUM('preparado', 'en tránsito', 'entregado', 'devuelto'),
        allowNull: true
    },
    fecha_cambio: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize,
    modelName: 'HistorialEstadoPaquete',
    tableName: 'historial_estado_paquete',
    timestamps: false // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir las relaciones
HistorialEstadoPaquete.associate = (models) => {
    HistorialEstadoPaquete.belongsTo(models.Paquete, {
        foreignKey: 'id_paquete',
        as: 'paquete'
    });
};

module.exports = HistorialEstadoPaquete;