import { DataTypes } from "sequelize"
import { Estudiante } from "../Estudiante.js";
import { SolicitudCartaVacante } from "./SolicitudCartaVacante.js";
import { sequelize } from "../../database/database.js";


export const InformePractica = sequelize.define('informe_practica',{
    id_informePractica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ruta: {
        type: DataTypes.STRING,
    },
    notaEvaluador1: {
        type: DataTypes.DOUBLE,
        defaultValue: null,
    },
    notaEvaluador2: {
        type: DataTypes.DOUBLE,
        defaultValue: null,
    },
    notaFinal: {
        type: DataTypes.DOUBLE,
    },
    observacionesEvaluador1: {
        type: DataTypes.TEXT,
    },
    observacionesEvaluador2: {
        type: DataTypes.TEXT,
    },

})

Estudiante.hasOne(InformePractica, {
    foreignKey: 'id_estudiante',
    sourceKey: 'id_estudiante'
})

InformePractica.belongsTo(Estudiante, {
    foreignKey: 'id_estudiante',
    targetKey: 'id_estudiante'
})

SolicitudCartaVacante.hasOne(InformePractica, {
    foreignKey: 'id_solicitudCartaVacante',
    sourceKey: 'id_solicitudCartaVacante'
})

InformePractica.belongsTo(SolicitudCartaVacante, {
    foreignKey: 'id_solicitudCartaVacante',
    targetKey: 'id_solicitudCartaVacante'
})