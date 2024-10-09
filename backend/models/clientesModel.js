import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';

class Cliente extends Model {}

Cliente.init({
    id_cliente: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    direccion: {
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
        allowNull: true
    },
    updated_by: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes',
    timestamps: false // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir las relaciones
Cliente.associate = (models) => {
    Cliente.belongsTo(models.Usuario, {
        foreignKey: 'created_by',
        as: 'creador'
    });
    Cliente.belongsTo(models.Usuario, {
        foreignKey: 'updated_by',
        as: 'actualizador'
    });
    Cliente.hasMany(models.Paquete, {
        foreignKey: 'id_cliente',
        as: 'paquetes'
    });
};

export default Cliente;