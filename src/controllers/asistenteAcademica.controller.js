import { AsistenteAcademica } from '../models/AsistenteAcademica.js'

export const createAsistenteAcademica = async (request, response) =>{

    try{
        console.log('request', request);
        // Tomo parametros de la request.
        const { _id_user} = request.body.idUser;

        console.log('request body', request.body);

        // Crear en la bdd
        const newAsistenteAcademica = await AsistenteAcademica.create({
            id_user: _id_user
        })

        return response.status(200).json({
            ok: true,
            msg: 'Asistente Academica added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Asistente Academica.'
        })
    }

    


}