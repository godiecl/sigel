import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const AsistenteAcademica = sequelize.define('asistentes_academica',{

    id_asistente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
})

// falta foranea