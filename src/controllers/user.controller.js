
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'disc2022',
    database: 'sistemaPracticaCapstone',
    port: '5432'
});


const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users');
    res.status(200).json(response.rows);
}

const loginUser = async (req, res) => {
  const { correo, password } = req.body.user;
  console.log(correo, password);

  return await pool.query('SELECT FROM users ()')
}

const createUser = async (request, response) => {

    console.log('req del body en crear user', request.body);
    const { nombre, apellidop, apellidom, rut, password, correo, rol } = request.body.user

    console.log('request body user', request.body.user);
  
    await pool.query('INSERT INTO users (nombre, apellidop, apellidom, rut, password, correo) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, apellidop, apellidom, rut, password, correo], (error, results) => {
      if (error) {
        console.log('error', error);
        throw error
      }
      response.status(200).send({msg: 'User added'})
    })
  }


module.exports = {
    getUsers,
    createUser,
    loginUser
}