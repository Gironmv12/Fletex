const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db'); // Asegúrate de desestructurar sequelize
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
        allowNull: false
    },
    updated_by: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Inventario',
    tableName: 'inventarios',
    timestamps: false, // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir las relaciones
Inventario.associate = (models) => {
    Inventario.belongsTo(models.Almacen, {
        foreignKey: 'id_almacen',
        as: 'almacen'
    });
    Inventario.belongsTo(models.Usuario, {
        foreignKey: 'created_by',
        as: 'creador'
    });
    Inventario.belongsTo(models.Usuario, {
        foreignKey: 'updated_by',
        as: 'actualizador'
    });
    Inventario.hasMany(models.Paquete, {
        foreignKey: 'id_inventario',
        as: 'paquetes'
    });
};

module.exports = Inventario;