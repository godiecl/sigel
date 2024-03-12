import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    'sigel', // database
    'sigel', // user
    'mane_bled_scraped_purged', // password
    {
        host: 'sigeldatabase',
        dialect: 'postgres'
    }
);
