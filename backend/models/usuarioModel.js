const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db'); // Asegúrate de desestructurar sequelize

class Usuario extends Model {}

Usuario.init({
    id_usuario: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('administrador', 'operador'),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Cambiado a Sequelize.literal
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: false // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir relaciones
Usuario.associate = (models) => {
    Usuario.hasMany(models.Almacen, {
        foreignKey: 'created_by',
        as: 'almacenesCreados'
    });
    Usuario.hasMany(models.Almacen, {
        foreignKey: 'updated_by',
        as: 'almacenesActualizados'
    });
};

module.exports = Usuario;
