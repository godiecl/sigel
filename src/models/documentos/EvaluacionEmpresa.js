import { DataTypes } from "sequelize"
import { Estudiante } from "../Estudiante.js";
import { sequelize } from "../../database/database.js";
import { EncargadoEmpresa } from "../EncargadoEmpresa.js";


export const EvaluacionEmpresa = sequelize.define('evaluacion_empresa',{
    id_evaluacionEmpresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    asistenciaPuntualidad: {
        type: DataTypes.INTEGER,
    },
    conducta: {
        type: DataTypes.INTEGER,
    },
    dedicacion: {
        type: DataTypes.INTEGER,
    },
    habilidadAprender: {
        type: DataTypes.INTEGER,
    },
    adaptacion: {
        type: DataTypes.INTEGER,
    },
    iniciativa: {
        type: DataTypes.INTEGER,
    },
    aporteEmpresa: {
        type: DataTypes.INTEGER,
    },
    conocimientos: {
        type: DataTypes.INTEGER,
    },
    criterio: {
        type: DataTypes.INTEGER,
    },
    fortalezas: {
        type: DataTypes.TEXT,
    },
    debilidades: {
        type: DataTypes.TEXT,
    },
    notaFinal: {
        type: DataTypes.INTEGER
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