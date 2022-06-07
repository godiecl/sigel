import { ComisionPracticaTitulacion } from '../models/ComisionPracticaTitulacion.js'

export const createComisionPracticaTitulacion = async (request, response) =>{

    try{
        console.log('request', request);
        // Tomo parametros de la request.
        const { jefeCarrera, _id_user} = request.body.idUser;

        console.log('request body', request.body);

        // Crear en la bdd
        const newComisionPracticaTitulacion = await ComisionPracticaTitulacion.create({
            jefeCarrera,
            id_user: _id_user
        })

        return response.status(200).json({
            ok: true,
            msg: 'Comision Practica Titulacion added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Comision Practica Titulacion.'
        })
    }

    


}