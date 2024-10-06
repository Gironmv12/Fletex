const { Model, DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

class Paquete extends Model {}
Paquete.init({
    id_paquete: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_estado: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    id_inventario: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    peso: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    dimensiones: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fecha_envio: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_entrega: {
        type: DataTypes.DATE,
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
    },
    direccion_remitente: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    direccion_destino: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    metodo_envio: {
        type: DataTypes.ENUM('normal', 'express'),
        allowNull: false
    },
    costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    metodo_pago: {
        type: DataTypes.ENUM('tarjeta_credito', 'transferencia', 'efectivo'),
        allowNull: false
    },
    etiqueta_envio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    codigo_rastreo: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Paquete',
    tableName: 'paquetes',
    timestamps: false
});

// Definir las relaciones
Paquete.associate = (models) => {
    Paquete.belongsTo(models.Cliente, {
        foreignKey: 'id_cliente',
        as: 'cliente'
    });
    Paquete.belongsTo(models.EstadoPaquete, {
        foreignKey: 'id_estado',
        as: 'estado'
    });
    Paquete.belongsTo(models.Inventario, {
        foreignKey: 'id_inventario',
        as: 'inventario'
    });
    Paquete.belongsTo(models.Usuario, {
        foreignKey: 'created_by',
        as: 'creador'
    });
    Paquete.belongsTo(models.Usuario, {
        foreignKey: 'updated_by',
        as: 'actualizador'
    });
    Paquete.hasMany(models.AsignacionPaquete, {
        foreignKey: 'id_paquete',
        as: 'asignaciones'
    });
};

module.exports = Paquete;
