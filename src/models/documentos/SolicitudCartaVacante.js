import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database.js";
import { Empresa } from "../Empresa.js";
import { Estudiante } from "../Estudiante.js";
import { SolicitudEstudiante } from "../documentos/SolicitudEstudiante.js"
import { EncargadoEmpresa } from "../EncargadoEmpresa.js";

export const SolicitudCartaVacante = sequelize.define('solicitud_carta_vacante',{

    id_solicitudCartaVacante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    periodoRealizar: {
        type: DataTypes.STRING
    },
    anioRealizar: {
        type: DataTypes.STRING,
    },
    ciudadRealizar: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    }
})

Estudiante.hasOne(SolicitudCartaVacante, {
    foreignKey: 'id_estudiante',
    sourceKey: 'id_estudiante'
})

SolicitudCartaVacante.belongsTo(Estudiante, {
    foreignKey: 'id_estudiante',
    targetKey: 'id_estudiante'
})

// Empresa.hasOne(SolicitudCartaVacante, {
//     foreignKey: 'id_empresa',
//     sourceKey: 'id_empresa'
// })

// SolicitudCartaVacante.belongsTo(Empresa, {
//     foreignKey: 'id_empresa',
//     targetKey: 'id_empresa'
// })

SolicitudEstudiante.hasOne(SolicitudCartaVacante, {
    foreignKey: 'id_solicitudEstudiante',
    sourceKey: 'id_solicitudEstudiante'
})
SolicitudCartaVacante.belongsTo(SolicitudEstudiante, {
    foreignKey: 'id_solicitudEstudiante',
    targetKey: 'id_solicitudEstudiante'
})



// ComisionPracticaTitulacion.hasMany(Publicacion, {
//     foreignKey: 'id_comisionPracticaTitulacion',
//     sourceKey: 'id_comisionPracticaTitulacion'
// })

// Publicacion.belongsTo(Publicacion, {
//     foreignKey: 'id_comisionPracticaTitulacion',
//     targetKey: 'id_comisionPracticaTitulacion'
// })