
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'admin',
    password: 'disc2022',
    database: 'sistemaPracticaCapstone',
    port: '5432'
});


const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
}

const createUser = async (req, res) =>{
    console.log(req.body);
    res.send('user created');
}

module.exports = {
    getUsers,
    createUser
}