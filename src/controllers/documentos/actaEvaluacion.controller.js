import { InformePractica } from '../../models/documentos/InformePractica.js';
import { SolicitudCartaVacante } from '../../models/documentos/SolicitudCartaVacante.js';
import { SolicitudEstudiante } from '../../models/documentos/SolicitudEstudiante.js';
import { Empresa } from '../../models/Empresa.js';
import { EncargadoEmpresa } from '../../models/EncargadoEmpresa.js';
import { EvaluacionDefensa } from '../../models/documentos/EvaluacionDefensa.js';
import { EvaluacionEmpresa } from '../../models/documentos/EvaluacionEmpresa.js';
import { ActaEvaluacion } from '../../models/documentos/ActaEvaluacion.js';
import { Op } from 'sequelize'
import { Estudiante } from '../../models/Estudiante.js';
import { Usuario } from '../../models/Usuario.js';
import { ProfesorComisionCorrecion } from '../../models/ProfesorComisionCorreccion.js';

export const getActaEvaluacion = async (req, res) =>{
    try {
      console.log('get acta de evaluacion',req.params)
      const id = req.params.id
      let datos = []

      const acta = await ActaEvaluacion.findByPk(id);
  
      const estudiante = await Estudiante.findByPk(acta.id_estudiante)
  
      const usuarioEstudiante = await Usuario.findByPk(estudiante.id_usuario);
        
      const solicitudCarta = await SolicitudCartaVacante.findOne({
          where: {
            id_estudiante: estudiante.id_estudiante,
            estadoRespuesta: 'completada'
          }
      })
      const solicitudEstudiante = await SolicitudEstudiante.findOne({
          where: {
            id_solicitudEstudiante: solicitudCarta.id_solicitudEstudiante
          }
      })
      const encEmpresa = await EncargadoEmpresa.findOne({
          where: {
            id_encargadoEmpresa: solicitudEstudiante.id_encargadoEmpresa
          }
      })
  
      const empresa = await Empresa.findOne({
          where: {
            id_empresa: encEmpresa.id_empresa
          }
      })
  
    
        const evaluacionEmpresaEstudiante = await EvaluacionEmpresa.findOne({
          where: {
            id_estudiante: estudiante.id_estudiante
          }
        })
  
        const informeEstudiante = await InformePractica.findOne({
          where:{
            id_estudiante: estudiante.id_estudiante
          }
        })
  
        const evaluacionDefensaEstudiante = await EvaluacionDefensa.findOne({
          where:{
            id_estudiante: estudiante.id_estudiante,
            notaFinal: {
                [Op.not]: null
            }
          }
        })
  
        
        const nombreProfesorS = acta.nombreProfesor1;
        const nombreProfesor2 = acta.nombreProfesor2;
  
        let notaF = (evaluacionDefensaEstudiante.notaFinal + informeEstudiante.notaFinal + evaluacionEmpresaEstudiante.notaFinal)/3
        let notaFinal = notaF.toFixed(1)
        let estado;
        if(notaFinal >= 4){
          estado= 'aprobado'
        }else{
          estado= 'reprobado'
        }
        const nombre = usuarioEstudiante.nombre + ' ' + usuarioEstudiante.apellidop + ' ' + usuarioEstudiante.apellidom

        datos.push({
          nombreEstudiante:  nombre,
          rut: usuarioEstudiante.rut,
          carrera: estudiante.carrera,
          nombreEmpresa: empresa.nombreEmpresa,
          rutEmpresa: empresa.rutEmpresa,
          nombreProyecto: solicitudEstudiante.nombreProyecto,
          periodo: solicitudCarta.periodoRealizar,
          fechaInicio: solicitudCarta.fechaInicio,
          fechaFinal: solicitudCarta.fechaFinal,
          anio: solicitudCarta.anioRealizar,
          nombreProfesorS: nombreProfesorS,
          nombreProfesor2: nombreProfesor2,
           asistenciaPuntualidad: evaluacionEmpresaEstudiante.asistenciaPuntualidad,
           conducta: evaluacionEmpresaEstudiante.conducta,
           dedicacion: evaluacionEmpresaEstudiante.dedicacion,
           habilidadAprender: evaluacionEmpresaEstudiante.habilidadAprender,
          adaptacion: evaluacionEmpresaEstudiante.adaptacion ,
           iniciativa: evaluacionEmpresaEstudiante.iniciativa,
          aporteEmpresa: evaluacionEmpresaEstudiante.aporteEmpresa ,
           conocimientos: evaluacionEmpresaEstudiante.conocimientos,
           criterio: evaluacionEmpresaEstudiante.criterio,
          fortalezasEmpresa: evaluacionEmpresaEstudiante.fortalezas,
          debilidadesEmpresa: evaluacionEmpresaEstudiante.debilidades,
          notaEmpresa: evaluacionEmpresaEstudiante.notaFinal,
          observacionesInforme1: informeEstudiante.observacionesEvaluador1,
          observacionesInforme2: informeEstudiante.observacionesEvaluador2,
          notaInforme: informeEstudiante.notaFinal,
          calidadMaterialEvaluador: evaluacionDefensaEstudiante.calidadMaterialEvaluador1,
          contenidoEvaluador: evaluacionDefensaEstudiante.contenidoEvaluador1,
          dominioEscenicoEvaluador: evaluacionDefensaEstudiante.dominioEscenicoEvaluador1,
          claridadEvaluador: evaluacionDefensaEstudiante.claridadEvaluador1,
          tiempoEvaluador: evaluacionDefensaEstudiante.tiempoEvaluador1,
          defensaEvaluador: evaluacionDefensaEstudiante.defensaEvaluador1,
          promedioEvaluador: evaluacionDefensaEstudiante.promedioEvaluador1,
          calidadMaterialEvaluador2: evaluacionDefensaEstudiante.calidadMaterialEvaluador2,
          contenidoEvaluador2: evaluacionDefensaEstudiante.contenidoEvaluador2,
          dominioEscenicoEvaluador2: evaluacionDefensaEstudiante.dominioEscenicoEvaluador2,
          claridadEvaluador2: evaluacionDefensaEstudiante.claridadEvaluador2,
          tiempoEvaluador2: evaluacionDefensaEstudiante.tiempoEvaluador2,
          defensaEvaluador2: evaluacionDefensaEstudiante.defensaEvaluador2,
          observacionesExamen1: evaluacionDefensaEstudiante.observacionesEvaluador1,
          observacionesExamen2: evaluacionDefensaEstudiante.observacionesEvaluador2,
          promedioEvaluador2: evaluacionDefensaEstudiante.promedioEvaluador2,
          fechaExamen: evaluacionDefensaEstudiante.updatedAt,
          notaDefensa: evaluacionDefensaEstudiante.notaFinal,
          notaFinal: notaFinal,
          estado: estado
        })
        
        console.log('aqui')
        return res.json({ok: true, datos: datos})
      
    } catch (error) {
      return res.json({ok: false, msg: error.message})
    }
  }


  export const getEstudiantesAprobadosRegistro = async (req, res) =>{
    try {
        
      const solicitudesCV = await SolicitudCartaVacante.findAll({
        where: {
          estadoRespuesta: 'completada'
        }
      })
  
      if(!solicitudesCV){
        return res.json({ok: false, msg: 'No hay estudiantes que esten rindiendo sus prácticas actualmente.'})
      }
  
      
      let datos = [] 
  
      for(let i = 0; i < solicitudesCV.length ; i++){
        const estudiante = await Estudiante.findByPk(solicitudesCV[i].id_estudiante)
  
        const usuarioEstudiante = await Usuario.findByPk(estudiante.id_usuario);
        
        
        const solicitudEstudiante = await SolicitudEstudiante.findOne({
          where: {
            id_solicitudEstudiante: solicitudesCV[i].id_solicitudEstudiante
          }
        })
        const encEmpresa = await EncargadoEmpresa.findOne({
          where: {
            id_encargadoEmpresa: solicitudEstudiante.id_encargadoEmpresa
          }
        })
  
        const empresa = await Empresa.findOne({
          where: {
            id_empresa: encEmpresa.id_empresa
          }
        })
        let notaEmpresa;
        const evaluacionEmpresaEstudiante = await EvaluacionEmpresa.findOne({
          where: {
            id_estudiante: estudiante.id_estudiante
          }
        })
        if(evaluacionEmpresaEstudiante){
          notaEmpresa = evaluacionEmpresaEstudiante.notaFinal;
        }else{
          notaEmpresa = null
        }
  
        if(estudiante.id_comisionCorreccion !== null){
          const profesorSecretario = await ProfesorComisionCorrecion.findOne({
            where: {
              id_comisionCorreccion: estudiante.id_comisionCorreccion,
              secretario: true
            }
          })
    
          const usuarioProfesorS = await Usuario.findByPk(profesorSecretario.id_usuario);
          const nombreProfesorS = usuarioProfesorS.nombre + ' ' + usuarioProfesorS.apellidop + ' ' + usuarioProfesorS.apellidom;
    
          const profesor2 = await ProfesorComisionCorrecion.findOne({
            where: {
              id_comisionCorreccion: estudiante.id_comisionCorreccion,
              secretario: false
            }
          })
    
          const usuarioProfesor2 = await Usuario.findByPk(profesor2.id_usuario);
          const nombreProfesor2 = usuarioProfesor2.nombre + ' ' + usuarioProfesor2.apellidop + ' ' + usuarioProfesor2.apellidom;
    
          
          
          const informeEstudiante = await InformePractica.findOne({
            where:{
              id_estudiante: estudiante.id_estudiante,
              notaFinal: {
                [Op.not]: null
              }
            }
          })
          let notaInforme;
          if(!informeEstudiante){
            notaInforme=null
          }else{
            notaInforme=informeEstudiante.notaFinal
          }
          const evaluacionDefensaEstudiante = await EvaluacionDefensa.findOne({
            where:{
              id_estudiante: estudiante.id_estudiante,
              notaFinal: {
                [Op.not]: null
              }
            }
          })
          let notaDefensa;
          let fechaDefensa;
          if(!evaluacionDefensaEstudiante){
            notaDefensa=null;
            fechaDefensa = null
          }else{
            fechaDefensa = evaluacionDefensaEstudiante.updatedAt
            notaDefensa=evaluacionDefensaEstudiante.notaFinal
          }
          let notaFinal;
          let estado = null;
          if(notaDefensa && notaEmpresa && notaInforme){
            let notaF = (evaluacionDefensaEstudiante.notaFinal + informeEstudiante.notaFinal + evaluacionEmpresaEstudiante.notaFinal)/3
           notaFinal = notaF.toFixed(1)
            if(notaFinal >= 4){
              estado= 'aprobado'
            }else{
              estado= 'reprobado'
            }
          }else{
            notaFinal = null;
          }
          
          
    
          datos.push({
            nombreEstudiante: usuarioEstudiante.nombre , 
            apellidopEstudiante: usuarioEstudiante.apellidop ,
            apellidomEstudiante: usuarioEstudiante.apellidom ,
            rut: usuarioEstudiante.rut,
            carrera: estudiante.carrera,
            nombreEmpresa: empresa.nombreEmpresa,
            rutEmpresa: empresa.rutEmpresa,
            nombreProyecto: solicitudEstudiante.nombreProyecto,
            fechaInicio: solicitudesCV[i].fechaInicio,
            fechaFinal: solicitudesCV[i].fechaFinal,
            nombreProfesorS: nombreProfesorS,
            nombreProfesor2: nombreProfesor2,
            notaEmpresa: notaEmpresa,
            notaInforme: notaInforme,
            notaDefensa: notaDefensa,
            fechaDefensa: fechaDefensa,
            notaFinal: notaFinal,
            estado: estado
          })
        }else{
          datos.push({
            nombreEstudiante: usuarioEstudiante.nombre , 
            apellidopEstudiante: usuarioEstudiante.apellidop ,
            apellidomEstudiante: usuarioEstudiante.apellidom ,
            rut: usuarioEstudiante.rut,
            carrera: estudiante.carrera,
            nombreEmpresa: empresa.nombreEmpresa,
            rutEmpresa: empresa.rutEmpresa,
            nombreProyecto: solicitudEstudiante.nombreProyecto,
            fechaInicio: solicitudesCV[i].fechaInicio,
            fechaFinal: solicitudesCV[i].fechaFinal,
            nombreProfesorS: null,
            nombreProfesor2: null,
            notaEmpresa: notaEmpresa,
            notaInforme: null,
            notaDefensa: null,
            fechaDefensa: fechaDefensa,
            notaFinal: null,
            estado: null
          })
        }
  
        
        
      }
  
      
      return res.json({ok: true, datos: datos})
  
      
    } catch (error) {
        return res.json({ok: false, msg: error.message})
    }
  }



  export const getActasEvaluaciones = async (req, res) =>{
    try {
        
     const actasEvaluacion = await ActaEvaluacion.findAll()
  
      if(!actasEvaluacion){
        return res.json({ok: false, msg: 'No hay estudiantes que hayan terminado sus prácticas actualmente.'})
      }
  
      
      let datos = [] 
  
      for(let i = 0; i < actasEvaluacion.length ; i++){
        const estudiante = await Estudiante.findByPk(actasEvaluacion[i].id_estudiante)
        const usuarioEstudiante = await Usuario.findByPk(estudiante.id_usuario);
        const nombre = usuarioEstudiante.nombre + ' ' + usuarioEstudiante.apellidop + ' ' + usuarioEstudiante.apellidom;
        
        const solicitudCarta = await SolicitudCartaVacante.findOne({
          where: {
            id_estudiante: estudiante.id_estudiante,
            estadoRespuesta: 'completada'
          }
        })
        const solicitudEstudiante = await SolicitudEstudiante.findByPk(solicitudCarta.id_solicitudEstudiante)
        const encEmpresa = await EncargadoEmpresa.findByPk(solicitudEstudiante.id_encargadoEmpresa)
  
        const empresa = await Empresa.findByPk(encEmpresa.id_empresa)
  
        const evaluacionDefensa = await EvaluacionDefensa.findByPk(actasEvaluacion[i].id_evaluacionDefensa)
  
        
  
          const fechaExamen = evaluacionDefensa.updatedAt
  
          datos.push({
            nombreEmpresa: empresa.nombreEmpresa,
            nombreProyecto: solicitudEstudiante.nombreProyecto,
            periodo: solicitudCarta.periodoRealizar,
            anio: solicitudCarta.anioRealizar,
            nombre: nombre, 
            rut: usuarioEstudiante.rut,
            id_estudiante: estudiante.id_estudiante,
            fechaDefensa: fechaExamen,
            id_actaEvaluacion: actasEvaluacion[i].id_actaEvaluacion
          })
        
  
        
        
      }
  
      
      return res.json({ok: true, datos: datos})
  
      
    } catch (error) {
        return res.json({ok: false, msg: error.message})
    }
  }