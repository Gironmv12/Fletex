const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db'); 

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
        allowNull: false
    },
    updated_by: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize, // Asegúrate de pasar la instancia de sequelize
    modelName: 'Almacen',
    tableName: 'almacenes',
    timestamps: false, // Configura esto si decides manejar created_at y updated_at manualmente
});

module.exports = Almacen;
