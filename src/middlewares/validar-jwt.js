import { response } from "express";
import jwt from 'jsonwebtoken';



export const validarJWT = ( req, res = response, next) =>{
    const token = req.header('x-token');

    if(!token){
      return res.status(401).json({
        ok: false,
        msg: 'error en el token'
      })
    }

    try{

        const {id, nombre} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.id= id;
        req.nombre = nombre;

    }catch (error){
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    next();
  
}