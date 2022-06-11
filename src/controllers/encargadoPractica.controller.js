import { EncargadoPractica } from '../models/EncargadoPractica.js'

export const createEncargadoPractica = async (request, response) =>{

    try{
        // Tomo parametros de la request.
        const _id_user = request.body.idUser;

        // console.log('request body', request.body);
        // console.log(' _id_user', _id_user)

        // Crear en la bdd
        const newEncargadoPractica = await EncargadoPractica.create({
            id_usuario: _id_user
        })

        return response.status(200).json({
            ok: true,
            msg: 'Encargado Practica added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Encargado Practica.'
        })
    }

    


}