import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const EncargadoEmpresa = sequelize.define('encargados_empresa',{

    id_encargadoEmpresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cargo: {
        type: DataTypes.STRING,
    },
    telefono: {
        type: DataTypes.STRING,
    }
})
Usuario.hasOne(EncargadoEmpresa, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
})

EncargadoEmpresa.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id'
})