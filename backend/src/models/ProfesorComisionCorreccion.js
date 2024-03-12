import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const ProfesorComisionCorrecion = sequelize.define('profesores_comision_correccion',{

    id_profesorCC: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estadoDisponible: {
        type: DataTypes.STRING,
        defaultValue: "disponible"
    },
    telefono: {
        type: DataTypes.STRING,
    },
    secretario: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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