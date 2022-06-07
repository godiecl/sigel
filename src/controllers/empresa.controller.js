import { Empresa } from '../models/Empresa.js'

export const createEmpresa = async (request, response) =>{

    try{
        console.log('request', request);
        // Tomo parametros de la request.
        const { nombreEmpresa, rutEmpresa, giro} = request.body;

        console.log('request body', request.body);

        // Crear en la bdd
        const newEmpresa = await Empresa.create({
            nombreEmpresa,
            rutEmpresa,
            giro
        })

        return response.status(200). json({
            ok: true,
            msg: 'Empresa added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Empresa.'
        })
    }

    


}