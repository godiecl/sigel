import { DataTypes } from "sequelize";
import { Estudiante } from "../Estudiante.js";
import { sequelize } from "../../database/database.js";



export const Seguro = sequelize.define('seguro',{
    id_seguro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.STRING,
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