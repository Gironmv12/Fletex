import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';
import AsignacionPaquete from './asignacionesPaquetesModel.js';

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
        allowNull: true //despues cambiar a false
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
        allowNull: true
    },
    updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true
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
        allowNull: true
    },
    etiqueta_envio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    codigo_rastreo: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Paquete',
    tableName: 'paquetes',
    timestamps: false
});

Paquete.associate = (models) => {
    Paquete.belongsTo(models.Inventario, {
        foreignKey: 'id_inventario',
        as: 'inventario'
    });
    Paquete.belongsTo(models.Cliente, {
        foreignKey: 'id_cliente',
        as: 'cliente'
    });
    Paquete.belongsTo(models.EstadoPaquete, {
        foreignKey: 'id_estado',
        as: 'estado'
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
    Paquete.hasMany(models.HistorialEstadoPaquete, {
        foreignKey: 'id_paquete',
        as: 'historiales'
    });
    Paquete.belongsTo(models.DireccionCliente, {
        foreignKey: 'direccion_remitente',
        as: 'direccion_remitente'
    });
    Paquete.belongsTo(models.DireccionCliente, {
        foreignKey: 'direccion_destino',
        as: 'direccion_destino'
    });
};


export default Paquete;