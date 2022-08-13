import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Estudiante } from "./Estudiante.js";
import { ProfesorComisionCorrecion } from "./ProfesorComisionCorreccion.js"; 

export const ComisionCorreccion = sequelize.define('comision_correccion',{

    id_comisionCorreccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // estadoDisponible: {
    //     type: DataTypes.BOOLEAN,
    // },
})


ComisionCorreccion.hasMany(ProfesorComisionCorrecion,{
    sourceKey: 'id_comisionCorreccion',
    foreignKey: 'id_comisionCorreccion'
});
ProfesorComisionCorrecion.belongsTo(ComisionCorreccion,{
    foreignKey: 'id_comisionCorreccion',
    targetKey: 'id_comisionCorreccion'
})

ComisionCorreccion.hasMany(Estudiante,{
    sourceKey: 'id_comisionCorreccion',
    foreignKey: 'id_comisionCorreccion'
})

Estudiante.belongsTo(ComisionCorreccion,{
    foreignKey: 'id_comisionCorreccion',
    targetKey: 'id_comisionCorreccion'
})
