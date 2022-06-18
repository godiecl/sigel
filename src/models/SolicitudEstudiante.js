import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
// import { Usuario } from "./Usuario.js";

export const SolicitudEstudiante = sequelize.define('solicitud_estudiante',{

    id_solicitudEstudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    problemaResolver: {
        type: DataTypes.TEXT,
    },
    area: {
        type: DataTypes.STRING,
    },
    solucion: {
        type: DataTypes.TEXT,
    },
    entregableFinal: {
        type: DataTypes.TEXT
    },
    importancia: {
        type: DataTypes.TEXT
    },
    plazo: {
        type: DataTypes.STRING
    },
    infoAdicional: {
        type: DataTypes.TEXT
    },
    disposicionMonetaria: {
        type: DataTypes.TEXT
    },
    modalidad: {
        type: DataTypes.STRING
    },
    fechaEnvio: {
        type: DataTypes.DATE
    },
    estadoAsignacionCP: {
        type: DataTypes.BOOLEAN
    },
    estadoAutorizacion: {
        type: DataTypes.BOOLEAN
    },
    comentarioAutorizacion: {
        type: DataTypes.TEXT
    },
    descripcionRequerimientoPractica:{
        type:  DataTypes.STRING
    }
})



// Usuario.hasOne(Admin, {
//     foreignKey: 'id_usuario',
//     sourceKey: 'id'
// })

// Admin.belongsTo(Usuario, {
//     foreignKey: 'id_usuario',
//     targetKey: 'id'
// })