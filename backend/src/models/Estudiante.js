import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const Estudiante = sequelize.define('estudiantes',{

    id_estudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // id_user: {
    //     type: DataTypes.INTEGER,
    //     foreignKey: true,

    // }
    correoPersonal: {
        type: DataTypes.STRING,

    },
    carrera: {
        type: DataTypes.INTEGER,
    },
    practicaAprobada: {
        type: DataTypes.BOOLEAN,
    },
    telefono: {
        type: DataTypes.STRING
    },
    estadoAsignacionCP: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    estadoDisponibleCC: {
        type: DataTypes.STRING,
        defaultValue: "disponible"
    },
    id_preinscripcionCP: {
        type: DataTypes.INTEGER
    }
});

    // Estudiante.hasOne(Usuario, {
    //     foreignKey: 'id_estudiante',
    //     sourceKey: 'id_estudiante'
    // })

    // Usuario.belongsTo(Estudiante, {
    //     foreignKey: 'id_estudiante',
    //     targetId: 'id_estudiante'
    // })

    Usuario.hasOne(Estudiante, {
        foreignKey: 'id_usuario',
        sourceKey: 'id'
    })

    Estudiante.belongsTo(Usuario, {
        foreignKey: 'id_usuario',
        targetKey: 'id'
    })