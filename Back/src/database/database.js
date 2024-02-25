
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    'sistemaPracticaCapstone', 
    'postgres', 
    'disc2022', 
    {
    host: 'localhost',
    dialect: 'postgres'
    }
  );

