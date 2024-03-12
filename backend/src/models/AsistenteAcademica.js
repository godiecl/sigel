import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const AsistenteAcademica = sequelize.define('asistentes_academica',{

    id_asistente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})

Usuario.hasOne(AsistenteAcademica, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
})

AsistenteAcademica.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id'
})