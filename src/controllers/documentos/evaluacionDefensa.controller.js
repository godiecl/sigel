
import { Op } from "sequelize";
import { EvaluacionDefensa } from "../../models/documentos/EvaluacionDefensa.js";
import { ProfesorComisionCorrecion } from "../../models/ProfesorComisionCorreccion.js";
import { Usuario } from "../../models/Usuario.js";
import { Estudiante } from "../../models/Estudiante.js";
import { EvaluacionEmpresa } from "../../models/documentos/EvaluacionEmpresa.js";
import { InformePractica } from "../../models/documentos/InformePractica.js";
import { ComisionCorreccion } from "../../models/ComisionCorreccionPractica.js";
import { SolicitudCartaVacante } from "../../models/documentos/SolicitudCartaVacante.js";


// registrar id de cc, formulario y estudiante.
export const actualizarEvaluacionDefensa = async (req, res) =>{

    try {
        
        console.log(' body actualizar EVALUACION DEFENSA ',req.body);

        const { estudiante, id_comisionCorreccion, calidadMaterialEvaluador, contenidoEvaluador, dominioEscenicoEvaluador, 
        claridadEvaluador, tiempoEvaluador, defensaEvaluador, promedioEvaluador, observacionesEvaluador, secretario } = req.body;

        const evaluacionExiste = await EvaluacionDefensa.findOne({
            where: {
                id_estudiante: estudiante,
                id_comisionCorreccion: id_comisionCorreccion,
            }
        })

        if(evaluacionExiste){

            if(secretario){
               // actualizar nota 2
                evaluacionExiste.calidadMaterialEvaluador1 = calidadMaterialEvaluador;
                evaluacionExiste.contenidoEvaluador1 = contenidoEvaluador;
                evaluacionExiste.dominioEscenicoEvaluador1 = dominioEscenicoEvaluador;
                evaluacionExiste.claridadEvaluador1 = claridadEvaluador;
                evaluacionExiste.tiempoEvaluador1 = tiempoEvaluador;
                evaluacionExiste.defensaEvaluador1 = defensaEvaluador;
                evaluacionExiste.observacionesEvaluador1 = observacionesEvaluador;
                evaluacionExiste.promedioEvaluador1 = promedioEvaluador;
                let notaF = ((evaluacionExiste.promedioEvaluador1 + evaluacionExiste.promedioEvaluador2) / 2)
                evaluacionExiste.notaFinal = notaF.toFixed(1)
                await evaluacionExiste.save()
                let estudiante = await Estudiante.findOne({
                    where: {
                        id_estudiante: evaluacionExiste.id_estudiante,
                    }
                })
                if(evaluacionExiste.notaFinal >= 4 ){
                    estudiante.practicaAprobada = true;
                    estudiante.save();
                }


                return res.json({
                    ok: true,
                    msg: 'Evaluación de defensa actualizada'
                })
            }else{
                evaluacionExiste.calidadMaterialEvaluador2 = calidadMaterialEvaluador;
                evaluacionExiste.contenidoEvaluador2 = contenidoEvaluador;
                evaluacionExiste.dominioEscenicoEvaluador2 = dominioEscenicoEvaluador;
                evaluacionExiste.claridadEvaluador2 = claridadEvaluador;
                evaluacionExiste.tiempoEvaluador2 = tiempoEvaluador;
                evaluacionExiste.defensaEvaluador2 = defensaEvaluador;
                evaluacionExiste.observacionesEvaluador2 = observacionesEvaluador;
                evaluacionExiste.promedioEvaluador2 = promedioEvaluador;
                let notaF = ((evaluacionExiste.promedioEvaluador1 + evaluacionExiste.promedioEvaluador2) / 2)
                evaluacionExiste.notaFinal = notaF.toFixed(1)
                await evaluacionExiste.save()
                let estudiante = await Estudiante.findOne({
                    where: {
                        id_estudiante: evaluacionExiste.id_estudiante,
                    }
                })
                if(evaluacionExiste.notaFinal >= 4 ){
                    estudiante.practicaAprobada = true;
                    await estudiante.save();
                }
                return res.json({
                    ok: true,
                    msg: 'Evaluación de defensa actualizada'
                })
            }

        }else{

            if(secretario){

                const newEvaluacion = await EvaluacionDefensa.create({
                    id_comisionCorreccion,
                    calidadMaterialEvaluador1: calidadMaterialEvaluador,
                    contenidoEvaluador1: contenidoEvaluador,
                    dominioEscenicoEvaluador1: dominioEscenicoEvaluador,
                    claridadEvaluador1: claridadEvaluador,
                    tiempoEvaluador1: tiempoEvaluador,
                    defensaEvaluador1: defensaEvaluador,
                    promedioEvaluador1: promedioEvaluador,
                    observacionesEvaluador1: observacionesEvaluador, 
                    id_estudiante: estudiante, 
                })

                return res.status(200).json({
                    ok: true,
                    msg: 'Evaluación de defensa nueva registrada'
                })

            }else{

                const newEvaluacion = await EvaluacionDefensa.create({
                    id_comisionCorreccion,
                    calidadMaterialEvaluador2: calidadMaterialEvaluador,
                    contenidoEvaluador2: contenidoEvaluador,
                    dominioEscenicoEvaluador2: dominioEscenicoEvaluador,
                    claridadEvaluador2: claridadEvaluador,
                    tiempoEvaluador2: tiempoEvaluador,
                    defensaEvaluador2: defensaEvaluador,
                    promedioEvaluador2: promedioEvaluador,
                    observacionesEvaluador2: observacionesEvaluador, 
                    id_estudiante: estudiante, 
                })
                return res.status(200).json({
                    ok: true,
                    msg: 'Evaluación de defensa nueva registrada'
                })
            }   
        }

    } catch (error) {
        // console.log(error)
        return res.json({
            ok: false,
            msg: error.message
        })
    }

}


// obtener observaciones de la empresa, nota empresa, nota de informe final, nombre estudiante id estudiante
export const getDatosAsociados = async (req, res) =>{
    try {

        console.log('get datos asociados')

    const id = req.params.id;

    // const usuarioLog = await Usuario.findByPk(id);
    const profesorLog = await ProfesorComisionCorrecion.findOne({
        where:{
            id_usuario: id
        }
    })

    if(!profesorLog){
        res.json({ok: false, msg: 'El usuario no es profesor de comisión de corrección.'})
    }

    // // console.log(id_encargadoEmp)
    const idCC = profesorLog.id_comisionCorreccion;
    const secretario = profesorLog.secretario;
    let datos = [];

    // let datosProfesores = [];

    // const profesores = await ProfesorComisionCorrecion.findAll(
    //     {where: {
    //       id_comisionCorreccion: idCC
    //     }}
    //   )
    // if(!profesores){
    //     res.json({ok: false, msg: 'No existe una comisión asociada'})
    // }
    //   for(let x = 0 ; x < profesores.length; x ++){
    
    //     let usuarioProfe = await Usuario.findByPk(profesores[x].id_usuario);
    //     const nombre = usuarioProfe.nombre + ' ' + usuarioProfe.apellidop + ' ' + usuarioProfe.apellidom;
    
    //     datosProfesores.push({
    //       nombre: nombre,       
    //     })
    //   }
    
    
    let usuarioProfe = await Usuario.findByPk(profesorLog.id_usuario);
    const nombre = usuarioProfe.nombre + ' ' + usuarioProfe.apellidop + ' ' + usuarioProfe.apellidom;
    
   
    
    const estudiantes = await Estudiante.findAll({
        where: {
            id_comisionCorreccion: idCC
        }
    })
    if(!estudiantes){
        res.json({ok: false, msg: 'Esta comisión no tiene estudiantes asociados.'})
    }
    // // console.log('------------------------------------------')
    // console.log('lol ',estudiantes)

    let datosEstudiantes = [];

    for(let i=0; i<estudiantes.length ;i++){

        // console.log('un estudiante')

        let usuarioEstudiante = await Usuario.findByPk(estudiantes[i].id_usuario);
        let nombre = usuarioEstudiante.nombre + ' ' + usuarioEstudiante.apellidop + ' ' + usuarioEstudiante.apellidom;
        let informe = await InformePractica.findOne({
            where: {
                id_estudiante: estudiantes[i].id_estudiante,
                notaFinal: {
                    [Op.not]: null
                }
            }
        })
        console.log('informe',informe)
        if(!informe){
            console.log('informe sin nota final',informe)
            continue
        }
        let evaluacionEmpresa = await EvaluacionEmpresa.findOne({
            where: {
                id_estudiante: estudiantes[i].id_estudiante,
                notaFinal: {
                    [Op.not]: null
                }
            }
        })
        if(!evaluacionEmpresa){
            continue
        }
        // console.log('solicitudes carta vacante: ', solicitud);

        datosEstudiantes.push({
            id_estudiante: estudiantes[i].id_estudiante,
            nombreEstudiante: nombre,
            notaFinalInforme: informe.notaFinal,
            notaEmpresa: evaluacionEmpresa.notaFinal,
            fortalezasEmpresa: evaluacionEmpresa.fortalezas,
            debilidadesEmpresa: evaluacionEmpresa.debilidades,

        })
        
    }

    datos.push({datosEstudiantes: datosEstudiantes, profesor: nombre, secretario: secretario, idCC: idCC})

    // console.log({datos})

    res.json({ok: true, datos: datos})
        
    } catch (error) {
        res.json({ok: false, msg: error.message})
    }
}

