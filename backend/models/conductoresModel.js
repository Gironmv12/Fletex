import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';

class Conductor extends Model {}

Conductor.init({
    id_conductor: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    licencia: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Corrección aquí
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Corrección aquí
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
    modelName: 'Conductor',
    tableName: 'conductores',
    timestamps: false, // Configura esto si decides manejar created_at y updated_at manualmente
});

// Definir las relaciones
Conductor.associate = (models) => {
    Conductor.belongsTo(models.Usuario, {
        foreignKey: 'created_by',
        as: 'creador'
    });
    Conductor.belongsTo(models.Usuario, {
        foreignKey: 'updated_by',
        as: 'actualizador'
    });
    Conductor.hasMany(models.Ruta, {
        foreignKey: 'id_conductor',
        as: 'rutas'
    });
};

export default Conductor;
