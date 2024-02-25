import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Usuario } from "./Usuario.js";

export const Empresa = sequelize.define('empresas',{

    id_empresa: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreEmpresa: {
        type: DataTypes.STRING,
    },
    rutEmpresa: {
        type: DataTypes.STRING,
    },
    giroEmpresa: {
        type: DataTypes.STRING,
    }
})
