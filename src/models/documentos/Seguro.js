import { DataTypes } from "sequelize";
import { Estudiante } from "../Estudiante.js";
import { sequelize } from "../../database/database.js";
import { SolicitudCartaVacante } from "./SolicitudCartaVacante.js";



export const Seguro = sequelize.define('seguro',{
    id_seguro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.STRING,
    },
    vigencia: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente'
    },
    mostrar: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
})

Estudiante.hasOne(Seguro, {
    foreignKey: 'id_estudiante',
    sourceKey: 'id_estudiante'
})

Seguro.belongsTo(Estudiante, {
    foreignKey: 'id_estudiante',
    targetKey: 'id_estudiante'
})

SolicitudCartaVacante.hasOne(Seguro, {
    foreignKey: 'id_solicitudCartaVacante',
    sourceKey: 'id_solicitudCartaVacante'
})

Seguro.belongsTo(SolicitudCartaVacante, {
    foreignKey: 'id_solicitudCartaVacante',
    targetKey: 'id_solicitudCartaVacante'
})