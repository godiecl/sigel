import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const ProfesorGuiaCP = sequelize.define('profesores_guia_cp',{

    id_profesorGuia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    disc_empresa: {
        type: DataTypes.STRING,
    },
    interesOtroCP: {
        type: DataTypes.BOOLEAN,
    },
    telefono: {
        type: DataTypes.STRING,
    }
})
Usuario.hasOne(ProfesorGuiaCP, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
})

ProfesorGuiaCP.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id'
})