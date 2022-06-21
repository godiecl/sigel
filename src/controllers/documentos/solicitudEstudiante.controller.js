import { SolicitudEstudiante } from '../../models/documentos/SolicitudEstudiante.js'

export const createSolicitudEstudiante = async (req, res) =>{

    try {
        
        console.log(' body crear solicitud estudiante ',req.body);

        const {nombreProyecto, problemaResolver, 
            area, solucion, entregableFinal, 
            importancia, plazo, infoAdicional, 
            disposicionMonetaria, 
            modalidad, fechaEnvio, id_encargadoEmpresa } = req.body.solicitud;

        const solicitud = await SolicitudEstudiante.findOne({
            where: {
                nombreProyecto: nombreProyecto
            }
        })

        if(solicitud){
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar esta solicitud, debido a que ese nombre de proyecto ya existe.'
            })
        }

        const newSolicitud = await SolicitudEstudiante.create({
            nombreProyecto,
            problemaResolver,
            area,
            solucion,
            entregableFinal,
            importancia,
            plazo,
            infoAdicional,
            disposicionMonetaria,
            modalidad,
            fechaEnvio,
            id_encargadoEmpresa
        })

        return res.status(200).json({
            ok: true,
            msg: 'Solicitud registrada'
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: error
        })
    }

}