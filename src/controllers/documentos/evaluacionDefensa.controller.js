
import { Op } from "sequelize";
import { EvaluacionDefensa } from "../../models/documentos/EvaluacionDefensa.js";
import { ProfesorComisionCorrecion } from "../../models/ProfesorComisionCorreccion.js";
import { Usuario } from "../../models/Usuario.js";
import { Estudiante } from "../../models/Estudiante.js";
import { EvaluacionEmpresa } from "../../models/documentos/EvaluacionEmpresa.js";
import { InformePractica } from "../../models/documentos/InformePractica.js";
import { ComisionCorreccion } from "../../models/ComisionCorreccionPractica.js";
import { SolicitudCartaVacante } from "../../models/documentos/SolicitudCartaVacante.js";
import { ActaEvaluacion } from "../../models/documentos/ActaEvaluacion.js";


// registrar id de cc, formulario y estudiante.
export const actualizarEvaluacionDefensa = async (req, res) => {

    try {

        console.log(' body actualizar EVALUACION DEFENSA ', req.body);

        const { estudiante, id_comisionCorreccion, calidadMaterialEvaluador, contenidoEvaluador, dominioEscenicoEvaluador,
            claridadEvaluador, tiempoEvaluador, defensaEvaluador, promedioEvaluador, observacionesEvaluador, secretario,
            periodoRealizar, anioRealizar, periodoExamen, anioExamen } = req.body;


            // Validar que práctica exista:
        const solicitudCV = await SolicitudCartaVacante.findOne({
            where: {
                id_estudiante: estudiante,
                estadoRespuesta: 'completada',
                periodoRealizar: periodoRealizar,
                anioRealizar: anioRealizar
            }
        })

        if(!solicitudCV){
            return res.json({ok: false, msg: 'No existe una práctica vinculada al estudiante y periodos ingresados.'})
        }

        const evaluacionRepetida = await EvaluacionDefensa.findOne({
            where: {
                id_estudiante: estudiante,
                id_comisionCorreccion: id_comisionCorreccion,
                periodoRealizar: periodoRealizar,
                anioRealizar: anioRealizar,
                periodoExamen: periodoExamen,
                anioExamen: anioExamen
            }
        })
       
        if (evaluacionRepetida) {
            if(evaluacionRepetida.notaFinal){
                return res.json({
                    ok: false,
                    msg: 'No se ha podido crear la evaluación debido a que ya está evaluado el estudiante en esos periodos.'
                })
            }else{
                if (secretario) {
                    if (evaluacionRepetida.promedioEvaluador1) {
                        return res.json({
                            ok: false,
                            msg: 'No se ha podido crear la evaluación debido a que ya has evaluado a este estudiante en ese periodo.'
                        })
                    }
                }
                if (!secretario) {
                    if (evaluacionRepetida.promedioEvaluador2) {
                        return res.json({
                            ok: false,
                            msg: 'No se ha podido crear la evaluación debido a que ya has evaluado a este estudiante en ese periodo.'
                        })
                    }
                }
            }
            
        }



        const evaluacionExiste = await EvaluacionDefensa.findOne({
            where: {
                id_estudiante: estudiante,
                id_comisionCorreccion: id_comisionCorreccion,
                periodoRealizar: periodoRealizar,
                anioRealizar: anioRealizar,
                periodoExamen: periodoExamen,
                anioExamen: anioExamen,
                notaFinal: {
                    [Op.is]: null
                }
            }
        })

        if (evaluacionExiste) {

            if (secretario) {
                // actualizar nota 2
                evaluacionExiste.calidadMaterialEvaluador1 = calidadMaterialEvaluador;
                evaluacionExiste.contenidoEvaluador1 = contenidoEvaluador;
                evaluacionExiste.dominioEscenicoEvaluador1 = dominioEscenicoEvaluador;
                evaluacionExiste.claridadEvaluador1 = claridadEvaluador;
                evaluacionExiste.tiempoEvaluador1 = tiempoEvaluador;
                evaluacionExiste.defensaEvaluador1 = defensaEvaluador;
                evaluacionExiste.observacionesEvaluador1 = observacionesEvaluador;
                evaluacionExiste.promedioEvaluador1 = promedioEvaluador;
                let notaF;
                if(evaluacionExiste.promedioEvaluador1 < 4 ){
                    notaF = evaluacionExiste.promedioEvaluador1;
                } else if(evaluacionExiste.promedioEvaluador2 < 4 ){
                    notaF = evaluacionExiste.promedioEvaluador2;
                }else{
                    notaF = ((evaluacionExiste.promedioEvaluador1 + evaluacionExiste.promedioEvaluador2) / 2)
                }
                evaluacionExiste.notaFinal = notaF.toFixed(1)
                let estudiante = await Estudiante.findOne({
                    where: {
                        id_estudiante: evaluacionExiste.id_estudiante,
                    }
                })
                if (evaluacionExiste.notaFinal >= 4) {
                    estudiante.practicaAprobada = true;
                    estudiante.save();
                }else {
                    estudiante.practicaAprobada = false;
                    estudiante.save();
                }
                const profesor1 = await ProfesorComisionCorrecion.findOne({
                    where: {
                        id_comisionCorreccion: estudiante.id_comisionCorreccion,
                        secretario: true
                    }
                })
                const usuarioProfe1 = await Usuario.findByPk(profesor1.id_usuario)
                const nombreProfesor1 = usuarioProfe1.nombre + ' ' + usuarioProfe1.apellidop + ' ' + usuarioProfe1.apellidom

                const profesor2 = await ProfesorComisionCorrecion.findOne({
                    where: {
                        id_comisionCorreccion: estudiante.id_comisionCorreccion,
                        secretario: false
                    }
                })

                const usuarioProfe2 = await Usuario.findByPk(profesor2.id_usuario)
                const nombreProfesor2 = usuarioProfe2.nombre + ' ' + usuarioProfe2.apellidop + ' ' + usuarioProfe2.apellidom;




                const actaEvaluacion = await ActaEvaluacion.create({
                    nombreProfesor1: nombreProfesor1,
                    nombreProfesor2: nombreProfesor2,
                    id_evaluacionDefensa: evaluacionExiste.id_evaluacionDefensa,
                    id_estudiante: estudiante.id_estudiante,
                })


                return res.json({
                    ok: true,
                    msg: 'Evaluación de defensa actualizada'
                })
            } else {
                evaluacionExiste.calidadMaterialEvaluador2 = calidadMaterialEvaluador;
                evaluacionExiste.contenidoEvaluador2 = contenidoEvaluador;
                evaluacionExiste.dominioEscenicoEvaluador2 = dominioEscenicoEvaluador;
                evaluacionExiste.claridadEvaluador2 = claridadEvaluador;
                evaluacionExiste.tiempoEvaluador2 = tiempoEvaluador;
                evaluacionExiste.defensaEvaluador2 = defensaEvaluador;
                evaluacionExiste.observacionesEvaluador2 = observacionesEvaluador;
                evaluacionExiste.promedioEvaluador2 = promedioEvaluador;
                let notaF;
                if(evaluacionExiste.promedioEvaluador1 < 4 ){
                    notaF = evaluacionExiste.promedioEvaluador1;
                } else if(evaluacionExiste.promedioEvaluador2 < 4 ){
                    notaF = evaluacionExiste.promedioEvaluador2;
                }else{
                    notaF = ((evaluacionExiste.promedioEvaluador1 + evaluacionExiste.promedioEvaluador2) / 2)
                }
                evaluacionExiste.notaFinal = notaF.toFixed(1)
                await evaluacionExiste.save()
                let estudiante = await Estudiante.findOne({
                    where: {
                        id_estudiante: evaluacionExiste.id_estudiante,
                    }
                })
                if (evaluacionExiste.notaFinal >= 4) {
                    estudiante.practicaAprobada = true;
                    await estudiante.save();
                }else {
                    estudiante.practicaAprobada = false;
                    estudiante.save();
                }
                const profesor1 = await ProfesorComisionCorrecion.findOne({
                    where: {
                        id_comisionCorreccion: estudiante.id_comisionCorreccion,
                        secretario: true
                    }
                })
                const usuarioProfe1 = await Usuario.findByPk(profesor1.id_usuario)
                const nombreProfesor1 = usuarioProfe1.nombre + ' ' + usuarioProfe1.apellidop + ' ' + usuarioProfe1.apellidom

                const profesor2 = await ProfesorComisionCorrecion.findOne({
                    where: {
                        id_comisionCorreccion: estudiante.id_comisionCorreccion,
                        secretario: false
                    }
                })

                const usuarioProfe2 = await Usuario.findByPk(profesor2.id_usuario)
                const nombreProfesor2 = usuarioProfe2.nombre + ' ' + usuarioProfe2.apellidop + ' ' + usuarioProfe2.apellidom;

                const actaEvaluacion = await ActaEvaluacion.create({
                    nombreProfesor1: nombreProfesor1,
                    nombreProfesor2: nombreProfesor2,
                    id_evaluacionDefensa: evaluacionExiste.id_evaluacionDefensa,
                    id_estudiante: estudiante.id_estudiante,
                })
                return res.json({
                    ok: true,
                    msg: 'Evaluación de defensa actualizada'
                })
            }

        } else {

            if (secretario) {

                const newEvaluacion = await EvaluacionDefensa.create({
                    id_comisionCorreccion,
                    periodoRealizar,
                    anioRealizar,
                    periodoExamen,
                    anioExamen,
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

            } else {

                const newEvaluacion = await EvaluacionDefensa.create({
                    id_comisionCorreccion,
                    periodoRealizar,
                    anioRealizar,
                    periodoExamen,
                    anioExamen,
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
export const getDatosAsociados = async (req, res) => {
    try {

        console.log('get datos asociados')

        const id = req.params.id;

        // const usuarioLog = await Usuario.findByPk(id);
        const profesorLog = await ProfesorComisionCorrecion.findOne({
            where: {
                id_usuario: id
            }
        })

        if (!profesorLog) {
            return res.json({ ok: false, msg: 'El usuario no es profesor de comisión de corrección.' })
        }

        // // console.log(id_encargadoEmp)
        const idCC = profesorLog.id_comisionCorreccion;
        if (idCC === null) {
            return res.json({ ok: false, msg: 'El usuario no pertenece a una comisión de corrección' })
        }
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
        if (!estudiantes) {
            return res.json({ ok: false, msg: 'Esta comisión no tiene estudiantes asociados.' })
        }
        // // console.log('------------------------------------------')
        // console.log('lol ',estudiantes)

        let datosEstudiantes = [];

        for (let i = 0; i < estudiantes.length; i++) {

            // console.log('un estudiante')

            let usuarioEstudiante = await Usuario.findByPk(estudiantes[i].id_usuario);
            let nombre = usuarioEstudiante.nombre + ' ' + usuarioEstudiante.apellidop + ' ' + usuarioEstudiante.apellidom;
            let informe = await InformePractica.findOne({
                where: {
                    id_estudiante: estudiantes[i].id_estudiante,
                    notaFinal: {
                        [Op.gte]: 4
                    }
                }
            })
            console.log('informe', informe)
            if (!informe) {
                console.log('informe sin nota final', informe)
                continue
            }
            let evaluacionEmpresa = await EvaluacionEmpresa.findOne({
                where: {
                    id_estudiante: estudiantes[i].id_estudiante,
                    notaFinal: {
                        [Op.gte]: 4
                    }
                }
            })
            if (!evaluacionEmpresa) {
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

        datos.push({ datosEstudiantes: datosEstudiantes, profesor: nombre, secretario: secretario, idCC: idCC })

        // console.log({datos})

        return res.json({ ok: true, datos: datos })

    } catch (error) {
        return res.json({ ok: false, msg: error.message })
    }
}

export const getEstudiantesParaEditarEvaluacionDefensa = async (req, res) => {
    try {
        console.log('getEstudiantesParaEditarEvaluacionDefensa', req.params)
        const id = req.params.id;
        let datos = []
        // busco que sea profesor cc
        const profesorLog = await ProfesorComisionCorrecion.findOne({
            where: {
                id_usuario: id
            }
        })

        if (!profesorLog) {
            return res.json({ ok: false, msg: 'El usuario no es profesor de comisión de corrección.' })
        }

        // busco que pertenezca a una cc
        const idCC = profesorLog.id_comisionCorreccion;
        if (idCC === null) {
            return res.json({ ok: false, msg: 'El usuario no pertenece a una comisión de corrección' })
        }
        const secretario = profesorLog.secretario;

        let usuarioProfe = await Usuario.findByPk(profesorLog.id_usuario);
        const nombre = usuarioProfe.nombre + ' ' + usuarioProfe.apellidop + ' ' + usuarioProfe.apellidom;



        const estudiantes = await Estudiante.findAll({
            where: {
                id_comisionCorreccion: idCC
            }
        })
        if (!estudiantes) {
            return res.json({ ok: false, msg: 'Esta comisión no tiene estudiantes asociados.' })
        }

        for (let i = 0; i < estudiantes.length; i++) {
            const evaluacionDefensa = await EvaluacionDefensa.findOne({
                where: {
                    id_estudiante: estudiantes[i].id_estudiante,
                    notaFinal: {
                        [Op.ne]: null
                    }
                }
            });

            if (!evaluacionDefensa) {
                continue
            }

            // console.log('cccccc')

            const usuarioEstudiante = await Usuario.findByPk(estudiantes[i].id_usuario);

            const solicitudCV = await SolicitudCartaVacante.findOne({
                where: {
                    id_estudiante: evaluacionDefensa.id_estudiante,
                    periodoRealizar: evaluacionDefensa.periodoRealizar,
                    anioRealizar: evaluacionDefensa.anioRealizar,
                }
            })

            // console.log('bbbbbb')
            const evaluacionEmpresa = await EvaluacionEmpresa.findOne({
                where: {
                    id_solicitudCartaVacante: solicitudCV.id_solicitudCartaVacante
                }
            })

            let nombreEstudiante = usuarioEstudiante.nombre + ' ' + usuarioEstudiante.apellidop + ' ' + usuarioEstudiante.apellidom;
            let periodo;
            if (evaluacionDefensa.periodoRealizar === 1) {
                periodo = 'Primer Semestre'
            } else if (evaluacionDefensa.periodoRealizar === 2) {
                periodo = 'Segundo Semestre'
            } else if (evaluacionDefensa.periodoRealizar === 3) {
                periodo = 'Verano'
            }

            // console.log('aaaa')

            if (secretario) {
                // console.log('si')
                datos.push({
                    id_evaluacionDefensa: evaluacionDefensa.id_evaluacionDefensa,
                    fortalezasEmpresa: evaluacionEmpresa.fortalezas,
                    debilidadesEmpresa: evaluacionEmpresa.debilidades,
                    nombreEstudiante: nombreEstudiante,
                    periodoRealizar: periodo,
                    anioRealizar: evaluacionDefensa.anioRealizar,
                    periodoExamen: evaluacionDefensa.periodoExamen,
                    anioExamen: evaluacionDefensa.anioExamen,
                    calidadMaterialEvaluador: evaluacionDefensa.calidadMaterialEvaluador1,
                    contenidoEvaluador: evaluacionDefensa.contenidoEvaluador1,
                    dominioEscenicoEvaluador: evaluacionDefensa.dominioEscenicoEvaluador1,
                    claridadEvaluador: evaluacionDefensa.claridadEvaluador1,
                    tiempoEvaluador: evaluacionDefensa.tiempoEvaluador1,
                    defensaEvaluador: evaluacionDefensa.defensaEvaluador1,
                    observacionesEvaluador: evaluacionDefensa.observacionesEvaluador1,
                })
            } else {
                datos.push({
                    id_evaluacionDefensa: evaluacionDefensa.id_evaluacionDefensa,
                    nombreEstudiante: nombreEstudiante,
                    fortalezasEmpresa: evaluacionEmpresa.fortalezas,
                    debilidadesEmpresa: evaluacionEmpresa.debilidades,
                    periodoRealizar: periodo,
                    anioRealizar: evaluacionDefensa.anioRealizar,
                    calidadMaterialEvaluador: evaluacionDefensa.calidadMaterialEvaluador2,
                    contenidoEvaluador: evaluacionDefensa.contenidoEvaluador2,
                    dominioEscenicoEvaluador: evaluacionDefensa.dominioEscenicoEvaluador2,
                    claridadEvaluador: evaluacionDefensa.claridadEvaluador2,
                    tiempoEvaluador: evaluacionDefensa.tiempoEvaluador2,
                    defensaEvaluador: evaluacionDefensa.defensaEvaluador2,
                    observacionesEvaluador: evaluacionDefensa.observacionesEvaluador2,
                })
            }
        }



        return res.json({ ok: true, datos: datos, nombre: nombre })


    } catch (error) {
        return res.json({ ok: false, msg: error.message })
    }
}

export const editarEvaluacionDefensa = async (req, res) => {

    try {

        console.log(' body editar EVALUACION DEFENSA ', req.body);

        const { id_evaluacionDefensa, calidadMaterialEvaluador, contenidoEvaluador, dominioEscenicoEvaluador,
            claridadEvaluador, tiempoEvaluador, defensaEvaluador, promedioEvaluador, observacionesEvaluador,
             } = req.body;

        const id = req.params.id;
        // busco que sea profesor cc
        const profesorLog = await ProfesorComisionCorrecion.findOne({
            where: {
                id_usuario: id
            }
        })

        if (!profesorLog) {
            return res.json({ ok: false, msg: 'El usuario no es profesor de comisión de corrección.' })
        }

        // busco que pertenezca a una cc
        const idCC = profesorLog.id_comisionCorreccion;
        if (idCC === null) {
            return res.json({ ok: false, msg: 'El usuario no pertenece a una comisión de corrección' })
        }
        const secretario = profesorLog.secretario;




        const evaluacionExiste = await EvaluacionDefensa.findByPk(id_evaluacionDefensa)
        if (!evaluacionExiste) {
            return res.json({ ok: false, msg: 'La evaluación no existe.' })
        }

        if (evaluacionExiste) {

            if (secretario) {
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
                if (evaluacionExiste.notaFinal >= 4) {
                    estudiante.practicaAprobada = true;
                    estudiante.save();
                } else {
                    estudiante.practicaAprobada = false;
                    estudiante.save();
                }
            
                return res.json({
                    ok: true,
                    msg: 'Evaluación de defensa editada'
                })
            } else {
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
                if (evaluacionExiste.notaFinal >= 4) {
                    estudiante.practicaAprobada = true;
                    await estudiante.save();
                }else {
                    estudiante.practicaAprobada = false;
                    estudiante.save();
                }
                
                return res.json({
                    ok: true,
                    msg: 'Evaluación de defensa editada'
                })
            }

        } else {

            if (secretario) {

                const newEvaluacion = await EvaluacionDefensa.create({
                    id_comisionCorreccion,
                    periodoRealizar,
                    anioRealizar,
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

            } else {

                const newEvaluacion = await EvaluacionDefensa.create({
                    id_comisionCorreccion,
                    periodoRealizar,
                    anioRealizar,
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