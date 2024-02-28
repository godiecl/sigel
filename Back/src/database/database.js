import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    'sistemaPracticaCapstone', 
    'postgres', 
    'disc2022', 
    {
        host: 'database',
        dialect: 'postgres'
    }
);


