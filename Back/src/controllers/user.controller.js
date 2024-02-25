import {Usuario} from '../models/Usuario.js'
import bcrypt from 'bcrypt';
import {generarJWT} from '../helpers/jwt.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {transporter} from '../middlewares/mailer.js'

dotenv.config();


export const getUsers = async (req, res) => {
  const users = await Usuario.findAll();

  return res.send(users);
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

    if(!usuarioDB.estado){

      return res.status(400).json({
        ok:false,
        msg: 'El usuario esta sin permiso para ingresar'
      })

    }

    const token = await generarJWT(usuarioDB.id, usuarioDB.nombre);

    return res.json({
        ok: true,
        msg: 'Login exitoso.',
        id: usuarioDB.id,
        nombre: usuarioDB.nombre,
        apellidop: usuarioDB.apellidop,
        apellidom: usuarioDB.apellidom,
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

      const { nombre, apellidop, apellidom, rut, password, correo, roles, estado } = request.body.user;

      // // console.log('request del body user', request.body.user)

      // Hash contraseña
      const salt = bcrypt.genSaltSync(10)

      const passHash = bcrypt.hashSync(password, salt);

      const UsuarioRepetido = await Usuario.findOne({
        where: {
          rut: rut
        }
      })

      if(UsuarioRepetido){
        return response.status(401).json({
          ok: false,
          msg: 'No se agregó el usuario, porque ya está registrado.'
      })
      }

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

      const res = { ok: true, roles: newUsuario.roles, id: newUsuario.id, token }

      return response.json(res);

    }catch(error){
      return response.status(500).json({ ok: false, message: error.message})
      
    }
}

export const updateUser = async (req, res) => {

  try{

     // console.log('request body user update', req.body.user);
    const { id, nombre, apellidop, apellidom, rut, password, correo, roles, estado } = req.body.user;

    // console.log(id);

    const usuario = await Usuario.findByPk(id);
    usuario.nombre = nombre
    usuario.apellidop = apellidop
    usuario.apellidom = apellidom
    usuario.rut = rut
    usuario.password = password
    usuario.correo = correo;
    usuario.roles = roles;
    usuario.estado = estado;  
    await usuario.save();
    

    const resp = { roles: usuario.roles, id: usuario.id }
    return res.json(resp);

  } catch (error){

    return res.status(500).json({message: error.message});

  }

}

export const deleteUser = async (req, res) => {

  try{

    // // console.log('req params delete user', req.params)
    const id = req.params.id;

    // // console.log(id);
  
    const user = await Usuario.findOne({
      where: {
        id: id
      }
    });

    // hacer if si ya se encontraba desactivado.

    if(!user) return res.status(404).json({ message: 'El usuario no existe'})

    user.estado = false;    
    await user.save();
    return res.sendStatus(204);

  }catch(error){
    return res.status(500).json({message: error.message});
  }
}



export const getUsuarioPorId = async (req, res) => {

  try{  
        // // console.log('res',res);

        const { id } = req.params;
        const user = await Usuario.findOne({
          where: {
            id: id
        },});

        if(!user) return res.status(404).json({ message: 'El usuario no existe'})

      
        return res.json(user);


      }catch(error){
        return res.status(500).json({ok: false, message: error.message})
      }
  
 }

 export const getUsuarioPorRut = async (req, res) => {

  try{  
        // console.log('req params get usuario por rut',req.params);

        const rut = req.params.rut;
        const user = await Usuario.findOne({
          where: {
            rut: rut
        },});

        if(!user) return res.status(404).json({ ok: false, message: 'El usuario no existe'})

      
        return res.json(user);


      }catch(error){
        return res.status(500).json({ok: false, message: error.message})
      }
  
 }

export const revalidarToken = async (req, res = response) => {

  const { id, nombre} = req;

  const token = await generarJWT(id, nombre);

  const usuarioDB = await Usuario.findByPk(id);

  return res.json({
    ok: true,
    id: usuarioDB.id,
    nombre: usuarioDB.nombre,
    apellidop: usuarioDB.apellidop,
    apellidom: usuarioDB.apellidom,
    roles: usuarioDB.roles,
    token
  })

}

export const olvidePassword = async (req, res) =>{

  // // console.log(req.body);

  const {correo} = req.body;
  if(!(correo)){
    return res.status(400).json({ok: false, message: 'Correo es requerido'})
  }

  const message = 'Revisa tu correo para ver el link para establecer la contraseña'
  let verificationLink;
  let correoStatus = 'OK';
  let user;

  try{
      // // console.log(correo);
      
      // // console.log(process.env.SECRET_JWT_SEED);

      // BUSCAR USUARIO EN BDD
      user = await Usuario.findOne({
        where: {
          correo: correo
        }
      })


      const token = jwt.sign({userId: user.id, correo: user.correo,}, process.env.SECRET_JWT_SEED, {expiresIn: '1d'});
      verificationLink = `http://localhost:4200/auth/new-password/${token}`;
      user.resetToken = token;
      
  }catch (errors){
    // console.log('error');
    return res.json({ok: false, message: errors});
  }

  // enviar email

  try {

     await transporter.sendMail({
      from: '"Sistema Capis - DEPARTAMENTO DE INGENIERÍA EN SISTEMAS Y COMPUTACIÓN - UNIVERSIDAD CATÓLICA DEL NORTE" <walter.sierra.vega@gmail.com>', // sender address
      to: user.correo, // list of receivers
      subject: "Reestablecer contraseña para ingresar al sistema.", // Subject line
      text: "Ingrese al link para reestablecer contraseña", // plain text body
      html: `
        <b> Se le adjunta el link para poder reestablecer contraseña. Por favor, haga click en el siguiente link, o péguelo en su navegador: </b>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>
                    Departamento de Ingeniería de Sistemas y Computación
                    <br>
                    Universidad Católica del Norte
                    <br>
                    Fono: +56 55 2355136
                    <br>
                    Angamos 0610, Pabellón Y-1
                    <br>
                    Antofagasta, Chile.
                </p>
      `, // html body
    });
    
  } catch (error2) {

    
  }

  try{
    await user.save();

  }catch(error){
    correoStatus = error;
    return res.status(400).json({ok: false, message: 'Ha ocurrido un error'});
  }

  res.json({message, ok: true})

}

export const crearNuevoPassword = async (req, res) =>{
  const {newPassword} = req.body;
  const resetTokenPassword = req.params.resetToken;
  // console.log(req.body);

  if(!(resetTokenPassword && newPassword)){
    res.status(400).json({ok: false, message: 'Ha ocurrido un error, faltan campos'});
  }

  
  let jwtPayload;
  let usuario;

  try {
    // console.log(resetTokenPassword)
    // jwtPayload = jwt.verify(resetTokenPassword, process.env.SECRET_JWT_SEED_RESET);
    usuario = await Usuario.findOne({
      where: {
        resetToken:resetTokenPassword
      }
    }) 
    
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ok: false, message: 'Algo va mal.'})
  }

  
  const salt = bcrypt.genSaltSync(10)
  const passHash = bcrypt.hashSync(newPassword, salt);
  usuario.password = passHash;
  // const validationOps = {validationError: {target: false, value: false}}
  // const errors = await validate(usuario, validationOps);
  try {
    // hacer hash a password 
    await usuario.save();
    res.json({ok: true, message: 'Contraseña cambiada exitosamente!'})
  } catch (error) {
    return res.status(401).json({ok: false, message: 'Algo ha ido mal.'})
  }

}

