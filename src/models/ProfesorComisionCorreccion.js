import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const ProfesorComisionCorrecion = sequelize.define('profesores_comision_correccion',{

    id_profesorComisionCorreccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estadoDisponible: {
        type: DataTypes.BOOLEAN,
    },
    telefono: {
        type: DataTypes.STRING,
    }
})
Usuario.hasOne(ProfesorComisionCorrecion, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
})

ProfesorComisionCorrecion.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id'
})