// imports

import express from 'express';
import app from './app.js';
import { sequelize } from './database/database.js';
import dotenv from 'dotenv';
dotenv.config();
  
async function main(){
    
   try {
      await sequelize.sync({force: false});
      console.log('Connection has been established successfully.');
        
      app.listen(process.env.PORT);
      console.log(`Server on port: ${ process.env.PORT }`);
      
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

main();


