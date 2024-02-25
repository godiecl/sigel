// imports

import express from 'express';
import app from './app.js';
import { sequelize } from './database/database.js';
import dotenv from 'dotenv';
import { DataTypes } from 'sequelize'

import {Admin} from './models/Admin.js';
import {AsistenteAcademica} from './models/AsistenteAcademica.js';
import {ComisionPracticaTitulacion} from './models/ComisionPracticaTitulacion.js';
import {Empresa} from './models/Empresa.js';
import {EncargadoEmpresa} from './models/EncargadoEmpresa.js';
import {EncargadoPractica} from './models/EncargadoPractica.js';
import {ProfesorComisionCorrecion} from './models/ProfesorComisionCorreccion.js';
import {ProfesorGuiaCP} from './models/ProfesorGuiaCP.js';

dotenv.config();
  
async function main(){
    
   try {
     //colocar false al terminar
     
    // const queryInterface = sequelize.getQueryInterface();

    // queryInterface.addColumn('users', 'resetToken', { type: DataTypes.STRING });
      await sequelize.sync({alter: false});
      console.log('Connection has been established successfully.');
        
      app.listen(process.env.PORT);
      console.log(`Server on port: ${ process.env.PORT }`);
      
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

main();


