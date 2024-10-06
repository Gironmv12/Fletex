const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

class Ruta extends Model {}

Ruta.init({
    id_ruta: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    origen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    destino: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    distancia_km: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    tiempo_estimado: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    id_vehiculo: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    id_conductor: {
        type: DataTypes.BIGINT,
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
    modelName: 'Ruta',
    tableName: 'rutas',
    timestamps: false // Configura esto si decides manejar created_at y updated_at manualmente
});

// DEFINIR LAS RELACIONES
Ruta.associate = (models) => {
    Ruta.belongsTo(models.Vehiculo, {
        foreignKey: 'id_vehiculo',
        as: 'vehiculo'
    });
    Ruta.belongsTo(models.Conductor, {
        foreignKey: 'id_conductor',
        as: 'conductor'
    });
    Ruta.belongsTo(models.Usuario, {
        foreignKey: 'created_by',
        as: 'creador'
    });
    Ruta.belongsTo(models.Usuario, {
        foreignKey: 'updated_by',
        as: 'actualizador'
    });
    Ruta.hasMany(models.AsignacionPaquete, {
        foreignKey: 'id_ruta',
        as: 'asignaciones'
    });
};

module.exports = Ruta;
