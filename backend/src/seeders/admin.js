import { Sequelize } from 'sequelize';
import { Usuario } from '../models/Usuario.js';
import bcryptjs from 'bcryptjs';

const Seed = async () =>{
    const sequelize = new Sequelize(
        'sistemaPracticaCapstone',
        'postgres',
        'disc2022',
        {
            host: 'database',
            dialect: 'postgres'
        }
    );
    console.log('user');
}
Seed();
