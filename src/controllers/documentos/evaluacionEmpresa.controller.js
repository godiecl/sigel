import { EvaluacionEmpresa } from "../../models/documentos/EvaluacionEmpresa.js";
import { SolicitudEstudiante } from "../../models/documentos/SolicitudEstudiante.js";
import { SolicitudCartaVacante } from "../../models/documentos/SolicitudCartaVacante.js";
import { Estudiante } from "../../models/Estudiante.js";
import { Usuario } from "../../models/Usuario.js";


export const createEvaluacionEmpresa = async (req, res) =>{

    try {
        
        console.log(' body crear EVALUACION EMPRESA ',req.body);

        const { asistenciaPuntualidad, conducta, dedicacion, habilidadAprender, adaptacion, iniciativa,
            aporteEmpresa, conocimientos, criterio, fortalezas, debilidades, notaFinal, estudiante, id_encargadoEmpresa } = req.body;

        const evaluacion = await EvaluacionEmpresa.findOne({
            where: {
                id_estudiante: estudiante,
                id_encargadoEmpresa: id_encargadoEmpresa
            }
        })

        if(evaluacion){
            return res.json({
                ok: false,
                msg: 'No se pudo registrar esta evaluacion de empresa, debido a que ya se evaluó ese estudiante.'
            })
        }

        const newEvaluacion = await EvaluacionEmpresa.create({
            asistenciaPuntualidad, conducta, dedicacion, habilidadAprender, adaptacion, iniciativa,
            aporteEmpresa, conocimientos, criterio, fortalezas, debilidades, id_estudiante: estudiante, id_encargadoEmpresa, notaFinal
        })

        return res.status(200).json({
            ok: true,
            msg: 'Evaluacion de empresa registrada'
        })

    } catch (error) {
        // console.log(error)
        return res.json({
            ok: false,
            msg: error.msg
        })
    }

}

export const getEstudiantesAsociados = async (req, res) =>{
    try {

        const id_encargadoEmp = req.params.id;
        // if(id_encargadoEmp){
        //     res.json({ok: false, msg: 'El usuario no es contacto de empresa.'})

        // }

    // // console.log(id_encargadoEmp)
    
    const solicitudes = await SolicitudEstudiante.findAll({
        where: {
            id_encargadoEmpresa: id_encargadoEmp
        }
    })

    if(!solicitudes){
        res.json({ok: false, msg: 'No existen solicitudes o el usuario no es contacto de empresa.'})
    }

    // // console.log('------------------------------------------')
    // console.log('lol ',solicitudes)

    let datos = [];

    for(let i=0; i<solicitudes.length ;i++){

        const solicitud = await SolicitudCartaVacante.findAll({
            where: {
                estado: 'aprobado',
                id_solicitudEstudiante: solicitudes[i].id_solicitudEstudiante
            }
        })
        // console.log('solicitudes carta vacante: ', solicitud);

        

        

        for(let j=0; j< solicitud.length; j++){
            const estudiante = await Estudiante.findByPk(solicitud[j].id_estudiante);
            const usuarioEstudiante = await Usuario.findOne({
                where: {
                    id: estudiante.id_usuario
                }
            })
            const nombre = usuarioEstudiante.nombre + ' ' + usuarioEstudiante.apellidop + ' ' + usuarioEstudiante.apellidom;
            
            datos.push({
               id_solicitudCartaVacante: solicitud[j].id_solicitudCartaVacante,
               id_estudiante: estudiante.id_estudiante,
               nombreProyecto: solicitudes[i].nombreProyecto,
               periodoRealizar: solicitud[j].periodoRealizar,
               anioRealizar: solicitud[j].anioRealizar,
               estadoRespuesta: solicitud[j].estadoRespuesta,
               nombre: nombre
           })
        }
        
        // console.log('estudiante', estudiante)

        // // // console.log('HOLA ')

        
    }

    // console.log(datos)

    res.json({ok: true, datos: datos})
        
    } catch (error) {
        res.json({ok: false, msg: error.message})
    }
}

// export const  getEvaluaciones = async (req, res) => {
//     const publicaciones = await Publicacion.findAll();
//     res.json(publicaciones)
// }

// export const getPublicacion = async (req, res) => {
//     try {
//     // console.log(req.params)
//     const id = req.params.id
//     const publicacion = await Publicacion.findByPk(id);
//     res.json({ok: true, publicacion: publicacion})
        
//     } catch (error) {
//         res.json({ok: false, msg: error.message})
//     }
// }

// export const updatePublicacion = async (req, res) => {

//     try{
  
//       // console.log('request body publicacion update', req.body);
//       // console.log('param', req.params.id);
//       const id = req.params.id;
//       const { remitente, asunto, mensaje, id_comisionPracticaTitulacion } = req.body.publicacion;
  
//       const publicacion = await Publicacion.findByPk(id);
  
//       publicacion.remitente = remitente;
//       publicacion.asunto = asunto;
//       publicacion.mensaje = mensaje;
//       publicacion.id_comisionPracticaTitulacion = id_comisionPracticaTitulacion;
//       await publicacion.save();
      
//       return res.json({ok:true, msg: 'publicacion actualizada'});
  
//     } catch (error){
  
//       return res.status(500).json({ok: false, msg: error.message});
  
//     }
  
// }

// export const deletePublicacion = async (req, res) =>{

//     try {
//       // console.log('request params publicacion delete', req.params);
//       const id = req.params.id;
//       const publicacion = await Publicacion.findByPk(id);
    
//       await publicacion.destroy();
  
//       return res.status(200).json({ok: true, message: 'publicacion borrado'});
      
//     } catch (error) {
//       return res.status(500).json({ok: false, message: error.message})
//     }
  
//   }