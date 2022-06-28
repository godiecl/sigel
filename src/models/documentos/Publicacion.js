import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";
import { ComisionPracticaTitulacion } from "../ComisionPracticaTitulacion.js";


export const Publicacion = sequelize.define('publicacion',{

    id_publicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    remitente: {
        type: DataTypes.STRING,
    },
    asunto: {
        type: DataTypes.STRING
    },
    mensaje: {
        type: DataTypes.TEXT
    },
    fecha: {
        type: DataTypes.DATE
    }

})

ComisionPracticaTitulacion.hasMany(Publicacion, {
    foreignKey: 'id_comisionPracticaTitulacion',
    sourceKey: 'id_comisionPracticaTitulacion'
})

Publicacion.belongsTo(Publicacion, {
    foreignKey: 'id_comisionPracticaTitulacion',
    targetKey: 'id_comisionPracticaTitulacion'
})