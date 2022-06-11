import { ProfesorGuiaCP } from '../models/ProfesorGuiaCP.js'

export const createProfesorGuiaCP = async (request, response) =>{

    try{
        // console.log('request', request);
        // Tomo parametros de la request.
        const { disc_Empresa, interesOtroCP, telefono, _id_user} = request.body.profesorGuiaCP;

        console.log('request body', request.body);

        // Crear en la bdd
        const newProfesorGuiaCP = await ProfesorGuiaCP.create({
            disc_Empresa,
            interesOtroCP,
            telefono,
            id_usuario: _id_user
        })

        return response.status(200).json({
            ok: true,
            msg: 'Profesor Guia CP added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Profesor Guia CP.'
        })
    }

    


}