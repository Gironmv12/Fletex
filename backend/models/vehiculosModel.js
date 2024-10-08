const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

class Vehiculo extends Model {}

Vehiculo.init({
    id_vehiculo: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    placa: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    marca: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    modelo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('disponible', 'en uso', 'en mantenimiento'),
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
    sequelize,
    modelName: 'Vehiculo',
    tableName: 'vehiculos',
    timestamps: false, // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir las relaciones
Vehiculo.associate = (models) => {
    Vehiculo.belongsTo(models.Usuario, {
        foreignKey: 'created_by',
        as: 'creador'
    });
    Vehiculo.belongsTo(models.Usuario, {
        foreignKey: 'updated_by',
        as: 'actualizador'
    });
    Vehiculo.hasMany(models.Ruta, {
        foreignKey: 'id_vehiculo',
        as: 'rutas'
    });
};

module.exports = Vehiculo;
