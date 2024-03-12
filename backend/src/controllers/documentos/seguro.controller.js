import { Seguro } from "../../models/documentos/Seguro.js";
import { SolicitudCartaVacante } from "../../models/documentos/SolicitudCartaVacante.js";
import { Estudiante } from "../../models/Estudiante.js";
import { Usuario } from "../../models/Usuario.js";

export const createSeguro = async (req, res) =>{

    try {
        
        // console.log(' body crear seguro ',req.body);

        const { id_estudiante } = req.body.seguro;

        const seguro = await Seguro.findOne({
            where: {
                id_estudiante: id_estudiante
            }
        })

        if(seguro){
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar este seguro, debido a que ese estudiante ya tiene.'
            })
        }

        const newSeguro = await Seguro.create({
            id_estudiante: id_estudiante
        })

        return res.status(200).json({
            ok: true,
            msg: 'Seguro registrado'
        })

    } catch (error) {
        // console.log(error)
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }

}

export const getSeguros = async (req, res) => {
    
    try {
        const seguros = await Seguro.findAll({
            where: {
                mostrar: true
            }
        });

        let datos = [];
    
        for(let i=0; i< seguros.length ;i++){
    
            const estudiante = await Estudiante.findByPk(seguros[i].id_estudiante);
    
            const solicitudCarta = await SolicitudCartaVacante.findOne({
                where: {
                    id_estudiante: seguros[i].id_estudiante,
                    estadoRespuesta: 'completada'
                }
            })
            // // console.log('HOLA ')
    
            const usuarioEstudiante = await Usuario.findOne({
                where: {
                    id: estudiante.id_usuario
                }
            })
            
             datos.push({
                id_seguro: seguros[i].id_seguro,
                estado: seguros[i].estado,
                vigencia: seguros[i].vigencia,
                periodoRealizar: solicitudCarta.periodoRealizar,
                anio: solicitudCarta.anioRealizar,
                fechaInicio: solicitudCarta.fechaInicio,
                fechaFinal: solicitudCarta.fechaFinal,
                rutEstudiante: usuarioEstudiante.rut,
                nombreEstudiante: usuarioEstudiante.nombre,
                apellidopEstudiante: usuarioEstudiante.apellidop,
                apellidomEstudiante: usuarioEstudiante.apellidom
            })
        }
    
        //  // console.log(datos)
    
       return res.json({ok: true, datos: datos})
        
    } catch (error) {
       return res.json({ok: false, msg: error.msg})
    }

    // // console.log('HOLA BRO')

   
}

export const dejarPendienteSeguro = async (req, res) =>{
    try {
    const id_seguro = req.params.id;

    const seguro = await Seguro.findByPk(id_seguro);
    if(!seguro){
        return res.json({ok: false, msg: 'El seguro no existe.'})
    }

    seguro.estado = 'pendiente';
    seguro.vigencia = 'pendiente'
    seguro.save();

    return res.json({ok: true, msg: 'Se ha dejado pendiente el seguro.'})
        
    } catch (error) {
        return res.json({ok: false, msg: error.message })
    }
    
}

export const autorizarSeguro = async (req, res) =>{
    try {
        // console.log(req.params);
    const id_seguro = req.params.id;

    const seguro = await Seguro.findByPk(id_seguro);
    if(!seguro){
        return res.json({ok: false, msg: 'El seguro no existe.'})
    }

    seguro.estado = 'tramitado';
    seguro.vigencia = 'activo';
    seguro.save();

    return res.json({ok: true, msg: 'Se ha autorizado el seguro.'})
    } catch (error) {
        return res.json({ok: false, msg: error.message })
    }

}

export const extenderSeguro = async (req, res) =>{
    try {
        console.log(req.body);
    const id_seguro = req.params.id;
    const nuevaFecha = req.body.fechaFinal;

    const seguro = await Seguro.findByPk(id_seguro);
    
    if(!seguro){
        return res.json({ok: false, msg: 'El seguro no existe.'})
    }
    const solicitud = await SolicitudCartaVacante.findByPk(seguro.id_solicitudCartaVacante)
    if(!solicitud){
        return res.json({ok: false, msg: 'El seguro no existe.'})
    }
    solicitud.fechaFinal = nuevaFecha;
    solicitud.save();

    return res.json({ok: true, msg: 'Se ha extendido el seguro.'})
    } catch (error) {
        return res.json({ok: false, msg: error.message })
    }

}

export const ocultarSeguro = async (req, res) =>{
    try {
        // console.log(req.params);
    const id_seguro = req.params.id;

    const seguro = await Seguro.findByPk(id_seguro);

    seguro.vigencia = 'terminado'
    seguro.mostrar = false;
    seguro.save();

    return res.json({ok: true, msg: 'Se ha terminado la vigencia del seguro.'})
    } catch (error) {
        return res.json({ok: false, msg: error.message })
    }

}