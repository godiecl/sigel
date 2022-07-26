
import { Estudiante } from "../../models/Estudiante.js";
import { ProfesorComisionCorrecion } from "../../models/ProfesorComisionCorreccion.js";
import { Usuario } from "../../models/Usuario.js";
import { InformePractica } from "../../models/documentos/InformePractica.js";
import { EvaluacionEmpresa } from "../../models/documentos/EvaluacionEmpresa.js";
import { Op } from "sequelize";


// registrar id de cc, formulario y estudiante.
export const createEvaluacionDefensa = async (req, res) =>{

    try {
        
        console.log(' body crear EVALUACION EMPRESA ',req.body);

        const { asistenciaPuntualidad, conducta, dedicacion, habilidadAprender, adaptacion, iniciativa,
            aporteEmpresa, conocimientos, criterio, fortalezas, debilidades, estudiante, id_encargadoEmpresa } = req.body;

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
            aporteEmpresa, conocimientos, criterio, fortalezas, debilidades, id_estudiante: estudiante, id_encargadoEmpresa
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
    let datos = [];

    let datosProfesores = [];

    const profesores = await ProfesorComisionCorrecion.findAll(
        {where: {
          id_comisionCorreccion: idCC
        }}
      )
    if(!profesores){
        res.json({ok: false, msg: 'No existe una comisión asociada'})
    }
      for(let x = 0 ; x < profesores.length; x ++){
    
        let usuarioProfe = await Usuario.findByPk(profesores[x].id_usuario);
        const nombre = usuarioProfe.nombre + ' ' + usuarioProfe.apellidop + ' ' + usuarioProfe.apellidom;
    
        datosProfesores.push({
          nombre: nombre,       
        })
      }
    
   
    
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

    datos.push({datosEstudiantes: datosEstudiantes, datosProfesores: datosProfesores})

    // console.log({datos})

    res.json({ok: true, datos: datos})
        
    } catch (error) {
        res.json({ok: false, msg: error.message})
    }
}