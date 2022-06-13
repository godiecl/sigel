import { EncargadoEmpresa } from '../models/EncargadoEmpresa.js'

export const createEncargadoEmpresa = async (request, response) =>{

    try{
        // console.log('request', request);
        // Tomo parametros de la request.
        const { cargo, telefono, _id_user, id_empresa} = request.body.encargadoEmpresa;

        // console.log('request body', request.body);

        // Crear en la bdd
        const newEncargadoEmpresa = await EncargadoEmpresa.create({
            cargo,
            telefono,
            id_usuario: _id_user,
            id_empresa: id_empresa
        })

        return response.status(200).json({
            ok: true,
            msg: 'Encargado Empresa added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Encargado Empresa.'
        })
    }
}