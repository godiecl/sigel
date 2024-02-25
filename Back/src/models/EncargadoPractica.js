import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const EncargadoPractica = sequelize.define('encargados_practica',{

    id_encargadoPractica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})
Usuario.hasOne(EncargadoPractica, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
})

EncargadoPractica.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id'
})