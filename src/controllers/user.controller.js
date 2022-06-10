import {Usuario} from '../models/Usuario.js'
import bcrypt from 'bcrypt';
import {generarJWT} from '../helpers/jwt.js'

export const getUsers = async (req, res) => {
  const users = await Usuario.findAll();
}

export const loginUser = async (req, res) => {


  const { correo, password } = req.body;

  try {

    const usuarioDB = await Usuario.findOne({where: {correo: correo}});

    if(!usuarioDB){
      return res.status(400).json({
        ok:false,
        msg: 'Credenciales no son válidas'
      });

    }
    // Confirmar el password

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if(!validPassword){
      return res.status(400).json({
        ok:false,
        msg: 'Credenciales no son válidas'
      })
    }

    const token = await generarJWT(usuarioDB.id, usuarioDB.nombre);

    return res.json({
        ok: true,
        msg: 'Login exitoso.',
        id: usuarioDB.id,
        nombre: usuarioDB.nombre,
        roles: usuarioDB.roles,
        token
    })

    
  
    

    }catch (error){

      return res.status(500).json({
        ok:false,
        msg: 'Hable con el administrador'
      });
    }

}

export const createUser = async (request, response) => {

    try{

      const { nombre, apellidop, apellidom, rut, password, correo, roles, estado } = request.body.user

      // Hash contraseña
      const salt = bcrypt.genSaltSync(10)

      const passHash = bcrypt.hashSync(password, salt);

      

      const newUsuario = await Usuario.create({
        nombre: nombre,
        apellidop: apellidop,
        apellidom: apellidom,
        rut: rut,
        password: passHash,
        correo: correo, 
        roles: roles,
        estado: estado
      })


      const token = await generarJWT(newUsuario.id, nombre);

      const res = { roles: newUsuario.roles, id: newUsuario.id, token }

      return response.json(res);

    }catch(error){
      return response.status(500).json({ message: error.message})
      
    }
}

export const updateUser = async (req, res) => {

  try{

    const { id } = req.params;
    const { nombre, apellidop, apellidom, rut, password, correo, roles } = request.body.user;

    const usuario = await Usuario.findByPk(id);
    usuario.nombre = nombre
    usuario.apellidop = apellidop
    usuario.apellidom = apellidom
    usuario.rut = rut
    usuario.password = password
    usuario.correo = correo;
    usuario.roles = roles;  
    await usuario.save();
    

    const resp = { roles: usuario.roles, id: usuario.id }
    return res.json(resp);

  } catch (error){

    return res.status(500).json({message: error.message});

  }

}

export const deleteUser = async (req, res) => {

  try{

    const { id }= req.params;
  
    await Usuario.destroy({
      where: {
        id: id
      }
    });

    res.sendStatus(204)

  }catch(error){
    res.status(500).json({message: error.message});
  }
}



export const getUsuarioPorId = async (req, res) => {

  try{  
        console.log('res',res);

        const { id } = req.params;
        const user = await Usuario.findOne({
          where: {
            id: id
        },});

        if(!user) return res.status(404).json({ message: 'El usuario no existe'})

      
        return res.json(user);


      }catch(error){
        return res.status(500).json({message: error.message})
      }
  
 }

 export const getUsuarioPorRut = async (req, res) => {

  try{  
        console.log('res',res);

        const { id } = req.params;
        const user = await Usuario.findOne({
          where: {
            id: id
        },});

        if(!user) return res.status(404).json({ message: 'El usuario no existe'})

      
        return res.json(user);


      }catch(error){
        return res.status(500).json({message: error.message})
      }
  
 }

export const revalidarToken = async (req, res = response) => {

  const { id, nombre} = req;

  const token = await generarJWT(id, nombre);

  return res.json({
    ok: true,
    id: id,
    nombre: nombre,
    token
  })

}

