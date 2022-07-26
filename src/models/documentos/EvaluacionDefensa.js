import { DataTypes } from "sequelize"
import { Estudiante } from "../Estudiante.js";
import { sequelize } from "../../database/database.js";


export const EvaluacionDefensa = sequelize.define('evaluacion_defensa',{
    id_evaluacionDefensa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    calidadMaterialEvaluador1: {
        type: DataTypes.INTEGER,
    },
    contenidoEvaluador1: {
        type: DataTypes.INTEGER,
    },
    dominioEscenicoEvaluador1: {
        type: DataTypes.INTEGER,
    },
    claridadEvaluador1: {
        type: DataTypes.INTEGER,
    },
    tiempoEvaluador1: {
        type: DataTypes.INTEGER,
    },
    defensaEvaluador1: {
        type: DataTypes.INTEGER,
    },
    observacionesEvaluador1: {
        type: DataTypes.TEXT,
    },
    calidadMaterialEvaluador2: {
        type: DataTypes.INTEGER,
    },
    contenidoEvaluador2: {
        type: DataTypes.INTEGER,
    },
    dominioEscenicoEvaluador2: {
        type: DataTypes.INTEGER,
    },
    claridadEvaluador2: {
        type: DataTypes.INTEGER,
    },
    tiempoEvaluador2: {
        type: DataTypes.INTEGER,
    },
    defensaEvaluador2: {
        type: DataTypes.INTEGER,
    },
    observacionesEvaluador2: {
        type: DataTypes.TEXT,
    },
    notaFinal: {
        type: DataTypes.DOUBLE
    }
    

})

Estudiante.hasOne(EvaluacionDefensa, {
    foreignKey: 'id_estudiante',
    sourceKey: 'id_estudiante'
})

EvaluacionDefensa.belongsTo(Estudiante, {
    foreignKey: 'id_estudiante',
    targetKey: 'id_estudiante'
})

ComisionCorreccion.hasOne(EvaluacionDefensa, {
    foreignKey: 'id_comisionCorreccion',
    sourceKey: 'id_comisionCorreccion'
})

EvaluacionDefensa.belongsTo(ComisionCorreccion, {
    foreignKey: 'id_comisionCorreccion',
    targetKey: 'id_comisionCorreccion'
})