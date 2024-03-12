import { EvaluacionEmpresa } from "../../models/documentos/EvaluacionEmpresa.js";
import { SolicitudEstudiante } from "../../models/documentos/SolicitudEstudiante.js";
import { SolicitudCartaVacante } from "../../models/documentos/SolicitudCartaVacante.js";
import { Estudiante } from "../../models/Estudiante.js";
import { Usuario } from "../../models/Usuario.js";
import { EncargadoEmpresa } from "../../models/EncargadoEmpresa.js";


export const createEvaluacionEmpresa = async (req, res) =>{

    try {
        
        console.log(' body crear EVALUACION EMPRESA ',req.body);

        const { asistenciaPuntualidad, conducta, dedicacion, habilidadAprender, adaptacion, iniciativa,
            aporteEmpresa, conocimientos, criterio, fortalezas, debilidades, notaFinal, estudiante, id_encargadoEmpresa,
            periodoRealizar, anioRealizar    } = req.body;  
        
        const solicitudCV = await SolicitudCartaVacante.findOne({
            where: {
                id_estudiante: estudiante,
                estadoRespuesta: 'completada',
                periodoRealizar: periodoRealizar,
                anioRealizar: anioRealizar,
            }
        })

        if(!solicitudCV){
            // Si no existe quiere decir que no existe relacion con el estudiante,
            // o no son en los mismos periodos, o año.
           return res.json({ok: false, msg: 'No existe una práctica vinculada a estos datos.'})
        }

        const solicitudE = await SolicitudEstudiante.findOne({
            where: {
                id_solicitudEstudiante: solicitudCV.id_solicitudEstudiante,
                id_encargadoEmpresa: id_encargadoEmpresa
            }
        })

        if(!solicitudE){
            // Si no existe quiere decir que no existe relacion con el estudiante,
            // o no son en los mismos periodos, o año.
           return res.json({ok: false, msg: 'No existe una práctica vinculada a estos datos.'})
        }
        const evaluacion = await EvaluacionEmpresa.findOne({
            where: {
                id_estudiante: estudiante,
                id_encargadoEmpresa: id_encargadoEmpresa,
                id_solicitudCartaVacante: solicitudCV.id_solicitudCartaVacante
            }
        })

        if(evaluacion){
            return res.json({
                ok: false,
                msg: 'No se pudo registrar esta evaluacion de empresa, debido a que ya se evaluó ese estudiante en ese periodo.'
            })
        }

        const newEvaluacion = await EvaluacionEmpresa.create({
            asistenciaPuntualidad, conducta, dedicacion, habilidadAprender, adaptacion, iniciativa,
            aporteEmpresa, conocimientos, criterio, fortalezas, debilidades, id_estudiante: estudiante, 
            id_encargadoEmpresa, notaFinal, id_solicitudCartaVacante: solicitudCV.id_solicitudCartaVacante
        })

        return res.status(200).json({
            ok: true,
            msg: 'Evaluacion de empresa registrada'
        })

    } catch (error) {
        // console.log(error)
        return res.json({
            ok: false,
            msg: error.message
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
        return res.json({ok: false, msg: 'No existen solicitudes o el usuario no es contacto de empresa.'})
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

    return res.json({ok: true, datos: datos})
        
    } catch (error) {
       return res.json({ok: false, msg: error.message})
    }
}

export const getEstudiantesParaEditarEvaluacionEmpresaa = async (req, res) => {
    try {
        console.log('getEstudiantesParaEditarEvaluacionEmpresa', req.params)
        const id = req.params.id;
        let datos = []
        // busco que sea encargado de empresa
        const encargadoEmpresaLogeado = await EncargadoEmpresa.findOne({
            where: {
                id_usuario: id
            }
        })

        if (!encargadoEmpresaLogeado) {
            return res.json({ ok: false, msg: 'El usuario no es encargado de empresa.' })
        }

        const evaluacionesEmpresa = await EvaluacionEmpresa.findAll({
            where: {
                id_encargadoEmpresa: encargadoEmpresaLogeado.id_encargadoEmpresa,
            }
        })
        if(!evaluacionesEmpresa){
            return res.json({ ok: false, msg: 'No hay evaluaciones de empresa disponibles.' })
        }
        console.log('si 1')
        for (let i = 0; i < evaluacionesEmpresa.length; i++) {

            const estudiante = await Estudiante.findByPk(evaluacionesEmpresa[i].id_estudiante)
            const usuarioEstudiante = await Usuario.findByPk(estudiante.id_usuario);

            const solicitudCV = await SolicitudCartaVacante.findByPk(evaluacionesEmpresa[i].id_solicitudCartaVacante)

            console.log('si 2')
            let nombreEstudiante = usuarioEstudiante.nombre + ' ' + usuarioEstudiante.apellidop + ' ' + usuarioEstudiante.apellidom;
            let periodo;
            if (solicitudCV.periodoRealizar === 1) {
                periodo = 'Primer Semestre'
            } else if (solicitudCV.periodoRealizar === 2) {
                periodo = 'Segundo Semestre'
            } else if (solicitudCV.periodoRealizar === 3) {
                periodo = 'Verano'
            }
            
            console.log('si 3')
            // console.log('aaaa')

                // console.log('si')
                datos.push({
                    nombreEstudiante: nombreEstudiante,
                    periodoRealizar: periodo,
                    nombreProyecto: solicitudCV.nombreProyecto,
                    anioRealizar: solicitudCV.anioRealizar,
                    id_evaluacionEmpresa: evaluacionesEmpresa[i].id_evaluacionEmpresa,
                    asistenciaPuntualidad: evaluacionesEmpresa[i].asistenciaPuntualidad,
                    conducta: evaluacionesEmpresa[i].conducta,
                    dedicacion: evaluacionesEmpresa[i].dedicacion,
                    habilidadAprender: evaluacionesEmpresa[i].habilidadAprender,
                    adaptacion: evaluacionesEmpresa[i].adaptacion,
                    iniciativa: evaluacionesEmpresa[i].iniciativa,
                    aporteEmpresa: evaluacionesEmpresa[i].aporteEmpresa,
                    conocimientos: evaluacionesEmpresa[i].conocimientos,
                    criterio: evaluacionesEmpresa[i].criterio,
                    fortalezas: evaluacionesEmpresa[i].fortalezas,
                    debilidades: evaluacionesEmpresa[i].debilidades,
                })
            
        }



        return res.json({ ok: true, datos: datos })


    } catch (error) {
        return res.json({ ok: false, msg: error.message })
    }
}

export const editarEvaluacionEmpresa = async (req, res) =>{

    try {
        
        console.log(' body editar EVALUACION EMPRESA ',req.params);

        const { asistenciaPuntualidad, conducta, dedicacion, habilidadAprender, adaptacion, iniciativa,
            aporteEmpresa, conocimientos, criterio, fortalezas, debilidades, notaFinal, id_evaluacionEmpresa,
              } = req.body;  
        
        const id = req.params.id;
        const encargadoEmpresaLogeado = await EncargadoEmpresa.findOne({
            where: {
                id_usuario: id
            }
        })

        if (!encargadoEmpresaLogeado) {
            return res.json({ ok: false, msg: 'El usuario no es encargado de empresa.' })
        }

        let evaluacionEmpresaPorEditar = await EvaluacionEmpresa.findByPk(id_evaluacionEmpresa)

        if(!evaluacionEmpresaPorEditar){
            // Si no existe quiere decir que no existe relacion con el estudiante,
            // o no son en los mismos periodos, o año.
            return res.json({ok: false, msg: 'La evaluación de empresa enviada no existe.'})
        }

        evaluacionEmpresaPorEditar.asistenciaPuntualidad = asistenciaPuntualidad;
        evaluacionEmpresaPorEditar.conducta = conducta;
        evaluacionEmpresaPorEditar.dedicacion = dedicacion;
        evaluacionEmpresaPorEditar.habilidadAprender = habilidadAprender;
        evaluacionEmpresaPorEditar.adaptacion = adaptacion;
        evaluacionEmpresaPorEditar.iniciativa = iniciativa;
        evaluacionEmpresaPorEditar.aporteEmpresa = aporteEmpresa;
        evaluacionEmpresaPorEditar.conocimientos = conocimientos;
        evaluacionEmpresaPorEditar.criterio = criterio;
        evaluacionEmpresaPorEditar.fortalezas = fortalezas;
        evaluacionEmpresaPorEditar.debilidades = debilidades;
        evaluacionEmpresaPorEditar.notaFinal = notaFinal;
        evaluacionEmpresaPorEditar.save()

        return res.json({
            ok: true,
            msg: 'Evaluacion de empresa editada.'
        })

    } catch (error) {
        // console.log(error)
        return res.json({
            ok: false,
            msg: error.message
        })
    }

}