import { DataTypes } from "sequelize"
import { Estudiante } from "../Estudiante.js";
import { sequelize } from "../../database/database.js";
import { EncargadoEmpresa } from "../EncargadoEmpresa.js";
import { SolicitudCartaVacante } from "./SolicitudCartaVacante.js";


export const EvaluacionEmpresa = sequelize.define('evaluacion_empresa',{
    id_evaluacionEmpresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    asistenciaPuntualidad: {
        type: DataTypes.DOUBLE,
    },
    conducta: {
        type: DataTypes.DOUBLE,
    },
    dedicacion: {
        type: DataTypes.DOUBLE,
    },
    habilidadAprender: {
        type: DataTypes.DOUBLE,
    },
    adaptacion: {
        type: DataTypes.DOUBLE,
    },
    iniciativa: {
        type: DataTypes.DOUBLE,
    },
    aporteEmpresa: {
        type: DataTypes.DOUBLE,
    },
    conocimientos: {
        type: DataTypes.DOUBLE,
    },
    criterio: {
        type: DataTypes.DOUBLE,
    },
    fortalezas: {
        type: DataTypes.TEXT,
    },
    debilidades: {
        type: DataTypes.TEXT,
    },
    notaFinal: {
        type: DataTypes.DOUBLE
    }

})

Estudiante.hasOne(EvaluacionEmpresa, {
    foreignKey: 'id_estudiante',
    sourceKey: 'id_estudiante'
})

EvaluacionEmpresa.belongsTo(Estudiante, {
    foreignKey: 'id_estudiante',
    targetKey: 'id_estudiante'
})

EncargadoEmpresa.hasOne(EvaluacionEmpresa, {
    foreignKey: 'id_encargadoEmpresa',
    sourceKey: 'id_encargadoEmpresa'
})

EvaluacionEmpresa.belongsTo(EncargadoEmpresa, {
    foreignKey: 'id_encargadoEmpresa',
    targetKey: 'id_encargadoEmpresa'
})

SolicitudCartaVacante.hasOne(EvaluacionEmpresa, {
    foreignKey: 'id_solicitudCartaVacante',
    sourceKey: 'id_solicitudCartaVacante'
})

EvaluacionEmpresa.belongsTo(SolicitudCartaVacante, {
    foreignKey: 'id_solicitudCartaVacante',
    targetKey: 'id_solicitudCartaVacante'
})