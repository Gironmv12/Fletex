const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db'); // Asegúrate de importar correctamente

class AsignacionPaquete extends Model {}

AsignacionPaquete.init({
    id_asignacion: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_paquete: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    id_ruta: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    fecha_asignacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_completada: {
        type: DataTypes.DATE,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'en curso', 'completado', 'cancelado'),
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
        allowNull: false
    },
    updated_by: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize, // Asegúrate de pasar la instancia de sequelize
    modelName: 'AsignacionPaquete',
    tableName: 'asignaciones_paquetes',
    timestamps: false, // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir las relaciones
AsignacionPaquete.associate = (models) => {
    AsignacionPaquete.belongsTo(models.Paquete, {
        foreignKey: 'id_paquete',
        as: 'paquete'
    });
    AsignacionPaquete.belongsTo(models.Ruta, {
        foreignKey: 'id_ruta',
        as: 'ruta'
    });
    AsignacionPaquete.belongsTo(models.Usuario, {
        foreignKey: 'created_by',
        as: 'creador'
    });
    AsignacionPaquete.belongsTo(models.Usuario, {
        foreignKey: 'updated_by',
        as: 'actualizador'
    });
};

module.exports = AsignacionPaquete;
