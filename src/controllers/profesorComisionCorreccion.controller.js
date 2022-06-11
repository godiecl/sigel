import { ProfesorComisionCorrecion } from '../models/ProfesorComisionCorreccion.js'

export const createProfesorComisionCorreccion  = async (request, response) =>{

    try{
        // console.log('request', request);
        // Tomo parametros de la request.
        const { estadoDisponible, telefono, _id_user} = request.body.profesorCC;

        // console.log('request body', request.body.profesorCC);

        // Crear en la bdd
        const newProfesorComisionCorreccion = await ProfesorComisionCorrecion.create({
            estadoDisponible,
            telefono,
            id_usuario: _id_user
        })

        return response.status(200).json({
            ok: true,
            msg: 'Profesor Comision Correccion added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Profesor Comision Correccion.'
        })
    }

    


}