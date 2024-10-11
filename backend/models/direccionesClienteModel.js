import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';

class DireccionCliente extends Model {}
DireccionCliente.init({
    id_direccion: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    id_cliente: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('remitente', 'destinatario'),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'DireccionCliente',
    tableName: 'direcciones_cliente',
    timestamps: false // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir las relaciones
DireccionCliente.associate = (models) => {
    DireccionCliente.belongsTo(models.Cliente, {
        foreignKey: 'id_cliente',
        as: 'cliente'
    });
};

export default DireccionCliente;