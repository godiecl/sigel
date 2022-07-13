import { DataTypes } from "sequelize"
import { Estudiante } from "../Estudiante.js";
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
    },
    notaEvaluador2: {
        type: DataTypes.DOUBLE,
    },
    notaFinal: {
        type: DataTypes.DOUBLE,
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