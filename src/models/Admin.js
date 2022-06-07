import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const Admin = sequelize.define('admins',{

    id_administrador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})
Usuario.hasOne(Admin, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
})

Admin.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id'
})