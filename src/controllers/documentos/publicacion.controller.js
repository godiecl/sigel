import { Publicacion } from "../../models/documentos/Publicacion";


export const createPublicacion = async (req, res) =>{

    try {
        
        console.log(' body crear publicacion ',req.body);

        const { remitente, asunto, mensaje, id_comisionPracticaTitulacion } = req.body.solicitud;

        const publicacion = await Publicacion.findOne({
            where: {
                asunto: asunto
            }
        })

        if(publicacion){
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar esta publicacion, debido a que ese nombre de proyecto ya existe.'
            })
        }

        const newPublicacion = await Publicacion.create({
            remitente, asunto, mensaje, id_comisionPracticaTitulacion
        })

        return res.status(200).json({
            ok: true,
            msg: 'Publicacion registrada'
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: error
        })
    }

}