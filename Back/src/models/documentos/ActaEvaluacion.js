import { DataTypes } from "sequelize"
import { Estudiante } from "../Estudiante.js";
import { sequelize } from "../../database/database.js";
import { EvaluacionDefensa } from "./EvaluacionDefensa.js";
import {  InformePractica } from "./InformePractica.js"
import { EvaluacionEmpresa } from "./EvaluacionEmpresa.js";


export const ActaEvaluacion = sequelize.define('acta_evaluacion',{
    id_actaEvaluacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   nombreProfesor1: {
    type: DataTypes.STRING
   },
   nombreProfesor2: {
    type: DataTypes.STRING
   }
    

})

Estudiante.hasOne(ActaEvaluacion, {
    foreignKey: 'id_estudiante',
    sourceKey: 'id_estudiante'
})

ActaEvaluacion.belongsTo(Estudiante, {
    foreignKey: 'id_estudiante',
    targetKey: 'id_estudiante'
})

EvaluacionDefensa.hasOne(ActaEvaluacion, {
    foreignKey: 'id_evaluacionDefensa',
    sourceKey: 'id_evaluacionDefensa'
})

ActaEvaluacion.belongsTo(EvaluacionDefensa, {
    foreignKey: 'id_evaluacionDefensa',
    targetKey: 'id_evaluacionDefensa'
})
