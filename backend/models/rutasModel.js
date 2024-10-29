import { Model, DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';
import Vehiculo from './vehiculosModel.js';
import Conductor from './conductoresModel.js';
import Usuario from './usuarioModel.js';
import AsignacionPaquete from './asignacionesPaquetesModel.js';

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
        allowNull: true,
        references: {
            model: 'vehiculos',  // Nombre de la tabla asociada
            key: 'id_vehiculo'
        }
    },
    id_conductor: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'conductores',
            key: 'id_conductor'
        }
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
    estado: {
        type: DataTypes.ENUM('disponible', 'en uso', 'completada', 'cancelada'),
        allowNull: false,
        defaultValue: 'disponible'
    }
}, {
    sequelize,
    modelName: 'Ruta',
    tableName: 'rutas',
    timestamps: false // Configura esto si decides manejar created_at y updated_at manualmente
});

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
    Ruta.hasMany(AsignacionPaquete, {
        foreignKey: 'id_ruta',
        as: 'asignaciones'
    });
};

export default Ruta; // Exportar el modelo Ruta para poder ser requerido en otros archivos
