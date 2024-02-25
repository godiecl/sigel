import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database.js' 

export const Usuario = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellidop: {
        type: DataTypes.STRING,
    },
    apellidom: {
        type: DataTypes.STRING,
    },
    rut: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    correo: {
        type: DataTypes.STRING,
    },
    roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    estado: {
        type: DataTypes.BOOLEAN,
    },
    resetToken: {
        type: DataTypes.STRING
    }
}, { 
    timestamps: true
})

