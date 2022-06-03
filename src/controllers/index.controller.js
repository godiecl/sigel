
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

// const createUser = async (req, res) => {
//     const { nombre, apellidop, apellidom, rut, password, correo, rol } = req.body;
//     const response = await pool.query('INSERT INTO users (nombre, apellidop, apellidom, rut, password, correo, rol) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nombre, apellidop, apellidom, rut, password, correo, rol], (error, results) => {
//         if (error) {
//           throw error
//         }
//         res.status(201).send(`User added with ID: ${result.insertId}`)
//       })

//     res.send('user created');
// };

const createUser = async (request, response) => {

    console.log('req del body en crear user', request.body);
    const { nombre, apellidop, apellidom, rut, password, correo, rol } = request.body.user

    console.log('request body user', request.body.user);
  
    await pool.query('INSERT INTO users (nombre, apellidop, apellidom, rut, password, correo, rol) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nombre, apellidop, apellidom, rut, password, correo, rol], (error, results) => {
      if (error) {
        console.log('error', error);
        throw error
      }
      response.status(200).send({msg: 'User added'})
    })
  }

module.exports = {
    getUsers,
    createUser
}