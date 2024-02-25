import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const ComisionPracticaTitulacion = sequelize.define('comision_practica_titulacion',{

    id_comisionPracticaTitulacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jefeCarrera: {
        type: DataTypes.BOOLEAN,
    },
})
Usuario.hasOne(ComisionPracticaTitulacion, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
})

ComisionPracticaTitulacion.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id'
})