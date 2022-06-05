import {Usuario} from '../models/Usuario.js'

export const getUsers = async (req, res) => {
  const users = await Usuario.findAll();
  console.log('desplegando todos los usuarios', (users));
}

export const loginUser = async (req, res) => {

  const { correo, password } = req.body.user;
  console.log(correo, password);

  return await sequelize.query('SELECT FROM users ()')
}

export const createUser = async (request, response) => {

    try{
      console.log('req del body en crear user', request.body);
      const { nombre, apellidop, apellidom, rut, password, correo, roles } = request.body.user

      const newUsuario = await Usuario.create({
        nombre: nombre,
        apellidop: apellidop,
        apellidom: apellidom,
        rut: rut,
        password: password,
        correo: correo, 
        roles: roles
      })

      console.log('nuevo usuario', (newUsuario));

    }catch(error){
      return response.status(500).json({ message: error.message})
      
    }

    
  
  }


