import { Admin } from '../models/Admin.js'

export const createAdmin = async (request, response) =>{

    try{
        console.log('request', request);
        // Tomo parametros de la request.
        const { _id_user} = request.body.idUser;

        console.log('request body', request.body);

        // Crear admin en la bdd
        const newAdmin = await Admin.create({
            id_user: _id_user
        })

        return response.status(200).json({
            ok: true,
            msg: 'Admin added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added admin.'
        })
    }

    


}