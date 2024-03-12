import { DataTypes } from "sequelize"
import { Estudiante } from "../Estudiante.js";
import { sequelize } from "../../database/database.js";
import { ComisionCorreccion } from "../ComisionCorreccionPractica.js";


export const EvaluacionDefensa = sequelize.define('evaluacion_defensa',{
    id_evaluacionDefensa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    periodoRealizar: {
        type: DataTypes.INTEGER,
    },
    anioRealizar: {
        type: DataTypes.STRING,
    },
    periodoExamen: {
        type: DataTypes.INTEGER,
    },
    anioExamen: {
        type: DataTypes.STRING,
    },
    calidadMaterialEvaluador1: {
        type: DataTypes.DOUBLE,
    },
    contenidoEvaluador1: {
        type: DataTypes.DOUBLE,
    },
    dominioEscenicoEvaluador1: {
        type: DataTypes.DOUBLE,
    },
    claridadEvaluador1: {
        type: DataTypes.DOUBLE,
    },
    tiempoEvaluador1: {
        type: DataTypes.DOUBLE,
    },
    defensaEvaluador1: {
        type: DataTypes.DOUBLE,
    },
    observacionesEvaluador1: {
        type: DataTypes.TEXT,
    },
    promedioEvaluador1: {
        type: DataTypes.DOUBLE
    },
    calidadMaterialEvaluador2: {
        type: DataTypes.DOUBLE,
    },
    contenidoEvaluador2: {
        type: DataTypes.DOUBLE,
    },
    dominioEscenicoEvaluador2: {
        type: DataTypes.DOUBLE,
    },
    claridadEvaluador2: {
        type: DataTypes.DOUBLE,
    },
    tiempoEvaluador2: {
        type: DataTypes.DOUBLE,
    },
    defensaEvaluador2: {
        type: DataTypes.DOUBLE,
    },
    observacionesEvaluador2: {
        type: DataTypes.TEXT,
    },
    promedioEvaluador2: {
        type: DataTypes.DOUBLE
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