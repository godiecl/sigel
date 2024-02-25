import { Op } from "sequelize";
import { EvaluacionEmpresa } from "../../models/documentos/EvaluacionEmpresa.js";
import { InformePractica } from "../../models/documentos/InformePractica.js"
import { SolicitudCartaVacante } from "../../models/documentos/SolicitudCartaVacante.js";
import { Estudiante } from "../../models/Estudiante.js";
import { ProfesorComisionCorrecion } from "../../models/ProfesorComisionCorreccion.js";
import { Usuario } from "../../models/Usuario.js";


export const createInforme = async (req, res) =>{

    try {

        console.log('data: ', req.body);
        const id = req.body.id_estudiante;
        const { periodoRealizar, anioRealizar, ruta } = req.body;
        const patron = /^[0-9]{8,9}[_]{1}[a-zA-Z]+[_]{1}[a-zA-Z]+[_]{1}[a-nA-N]{4,5}[.pdf]/
        let formatoValido = patron.test(ruta)
        if(formatoValido === false){
          console.log('no cumple con el formato')
          return res.json({ok: false, msg: 'El formato del archivo es inválido.'})
        }

        // valido  que esté en práctica.
        const solicitudCV = await SolicitudCartaVacante.findOne({
          where: {
            id_estudiante: id,
            periodoRealizar: periodoRealizar,
            anioRealizar: anioRealizar,
            estadoRespuesta: 'completada'
          }
        })
        if(!solicitudCV){
          
          return res.json({ok: false, msg: 'No existe una práctica vinculada al estudiante en el sistema.'})
        }


        // VALIDACION QUE SOLO PUEDAN SUBIR INFORME LOS QUE ESTEN EVALUADOR POR LA EMPRESA.
        const evaluacionEmp = await EvaluacionEmpresa.findOne({
          where: {
            id_estudiante: id,
            id_solicitudCartaVacante: solicitudCV.id_solicitudCartaVacante,
            notaFinal: {
              [Op.gte]: 4
            }
          }
        })

        if(!evaluacionEmp){
         return res.json({ok: false, msg: 'Actualmente la empresa no ha evaluado al estudiante o lo reprobó.'})
        }

        // VALIDACION QUE SOLO PUEDA SUBIR INFORME UNA VEZ POR PERIODO.
        const informe = await InformePractica.findOne({
          where: {
            id_estudiante: id,
            id_solicitudCartaVacante: solicitudCV.id_solicitudCartaVacante
          }
        })
        if(informe){
          
         return res.json({ok: false, msg: 'El estudiante ya envió el informe correspondiente al periodo ingresado.'})
        }

        const rutaNueva = './documentos/informe-practica/'+ruta;

        const informeNew = await InformePractica.create({
            
            ruta: rutaNueva,
            id_estudiante:  id,
            id_solicitudCartaVacante: solicitudCV.id_solicitudCartaVacante
        })

        return res.json({ok: true, msg: 'Se ha almacenado el informe exitosamente.'})

    } catch (error) {
        return res.json({ok: false, msg: error.message})
    }

  }

  // export const descargarInforme = async (req,res)=>{
  //   console.log('descargar informe recibiendo: ', req.params);
  //   try {
  //       const id = req.params.id
  //       const informe = await InformePractica.findByPk(id);
  //       if(!informe){
  //           res.json({ok: false, msg: 'El informe no existe.'})
  //       }
  //       // let nombreArchivo = informe.ruta.slice(30);
  //       console.log(informe.ruta)
  //       res.download(informe.ruta);
        
  //   } catch (error) {
  //       res.json({ok: false, msg: error.msg})
  //   }
    
  // }

  export const getNotaFinal = async (req, res)=>{
    try {
        console.log('entre')
        const id = req.params.id
        const informe = await InformePractica.findByPk(id);
        if(!informe){
           return res.json({ok: false, msg: 'El informe no existe.'})
        }
        if(!informe.notaFinal){
           return res.json({ok: false, msg: 'Todavía no tiene nota final'})
        }
        const nota = informe.notaFinal;
        const observacionesEvaluador1 = informe.observacionesEvaluador1;
        const observacionesEvaluador2 = informe.observacionesEvaluador2;
        if(!observacionesEvaluador1 && !observacionesEvaluador2){
        return  res.json({ok: true, notaFinal: nota })

        }else if(observacionesEvaluador1 && observacionesEvaluador2){
        return  res.json({ok: true, notaFinal: nota, observacionesEvaluador1: observacionesEvaluador1  , observacionesEvaluador2: observacionesEvaluador2 })
        }
        else if(observacionesEvaluador1){
        return  res.json({ok: true, notaFinal: nota, observacionesEvaluador1: observacionesEvaluador1 })

        }
        else if(observacionesEvaluador2){
        return  res.json({ok: true, notaFinal: nota, observacionesEvaluador2: observacionesEvaluador2 })

        }
        console.log(nota)
    } catch (error) {
        
    }
  }

  
export const evaluarInformeEstudiante = async (req, res) =>{
    try {
      console.log(req.body)
      const id = req.params.id;
      let notas = req.body;
      let informe = await InformePractica.findByPk(id);
      let nota1Modif = false;
      let nota2Modif = false;
      let observacionesEvaluador1Modif = false;
      let observacionesEvaluador2Modif = false;
      if(!notas){
       return res.json({ok: false, msg: 'Ha ocurrido un error. El body esta vacío'})
      }else{
        if(notas.notaEvaluador1){
          informe.notaEvaluador1 = notas.notaEvaluador1;
          nota1Modif = true;
        }
        if(notas.notaEvaluador2){
          informe.notaEvaluador2 = notas.notaEvaluador2;
          nota2Modif = true;
        }
        if(informe.notaEvaluador1 && informe.notaEvaluador2){
          const notaF = (informe.notaEvaluador1 + informe.notaEvaluador2) / 2;
          informe.notaFinal = notaF.toFixed(1)
        }
        if(notas.observacionesEvaluador1){
            informe.observacionesEvaluador1 = notas.observacionesEvaluador1;
        }
        if(notas.observacionesEvaluador1){
            informe.observacionesEvaluador1 = notas.observacionesEvaluador1;
            observacionesEvaluador1Modif = true;
        }
        if(notas.observacionesEvaluador2){
            informe.observacionesEvaluador2 = notas.observacionesEvaluador2;
            observacionesEvaluador2Modif = true;
        }
        if(nota1Modif || nota2Modif || observacionesEvaluador1Modif || observacionesEvaluador2Modif){
          await informe.save();
        }
        
      
        // if(!nota1Modif && !nota2Modif){
        //   res.json({ok: false, msg: 'No se han modificado las notas'})
        // }
        if(!observacionesEvaluador1Modif && !observacionesEvaluador2Modif && !nota1Modif && !nota2Modif){
           return res.json({ok: false, msg: 'No se ha modificado nada.'})
        }
        else if(nota1Modif && nota2Modif){
         return res.json({ok: true, 
            msg: 'Se ha actualizado la evaluación del informe', 
            nota1: informe.notaEvaluador1,
            nota2: informe.notaEvaluador2,
            observaciones1: informe.observacionesEvaluador1, 
            observaciones2: informe.observacionesEvaluador2,})
        }
        else if(nota1Modif){
         return res.json({ok: true, 
            msg: 'Se ha actualizado la evaluación del informe', 
            nota1: informe.notaEvaluador1,
            nota2: informe.notaEvaluador2,
            observaciones1: informe.observacionesEvaluador1, 
            observaciones2: informe.observacionesEvaluador2,})
          }
        else if(nota2Modif){
         return res.json({ok: true, 
            msg: 'Se ha actualizado la evaluación del informe', 
            nota1: informe.notaEvaluador1,
            nota2: informe.notaEvaluador2,
            observaciones1: informe.observacionesEvaluador1, 
            observaciones2: informe.observacionesEvaluador2,}) }
      }
      
      
  
    } catch (error) {
      return res.json({ok: false, msg: error.msg})
    }
  }

  export const getListFilesInformeEstudiante = async (req, res) => {
    console.log('req params', req.params)
    const id = req.params.id;
    // const directoryPath = "./documentos/informe-practica";
    
    let informesArr = [];
    let profesoresArr = [];
    let datos = [];
  
    const profesores = await ProfesorComisionCorrecion.findAll(
      {where: {
        id_comisionCorreccion: id
      }}
    )
  
    for(let x = 0 ; x < profesores.length; x ++){
  
      let usuarioProfe = await Usuario.findByPk(profesores[x].id_usuario);
  
      profesoresArr.push({
        nombre: usuarioProfe.nombre,
        apellidop: usuarioProfe.apellidop,
        apellidom: usuarioProfe.apellidom
      })
    }
    const informes = await InformePractica.findAll();
    
  
    for(let i = 0; i < informes.length; i++){
      const estudianteCC = await Estudiante.findOne({ where: {
        id_estudiante: informes[i].id_estudiante,
        id_comisionCorreccion: id,
      }})
      if(!estudianteCC){
        continue;
      }
      let usuarioEstudiante = await Usuario.findByPk(estudianteCC.id_usuario)
      let nombreArchivo = informes[i].ruta.slice(30);
      // console.log(nombreArchivo)
      // files.forEach((file) => {
      //   console.log('vuelta', informes.length)
      informesArr.push({
        id_informePractica: informes[i].id_informePractica, 
        nombre: nombreArchivo,
        // ruta: files[i].ruta,
        notaEvaluador1: informes[i].notaEvaluador1,
        notaEvaluador2: informes[i].notaEvaluador2,
        observacionesEvaluador1: informes[i].observacionesEvaluador1,
        observacionesEvaluador2: informes[i].observacionesEvaluador2,
        notaFinal: informes[i].notaFinal,
        id_estudiante: informes[i].id_estudiante,
        nombreEstudiante: usuarioEstudiante.nombre,
        apellidopEstudiante: usuarioEstudiante.apellidop,
        apellidomEstudiante: usuarioEstudiante.apellidom,
        rutEstudiante: usuarioEstudiante.rut,
      })
    }
  
      datos.push({profesores: profesoresArr, informes: informesArr })
  
      // data.push({informes: informes, fileInfos: fileInfos })
      res.status(200).json(datos);
    // });
  };

export const getTodosInformes = async (req, res) =>{
  try {
    const informes = await InformePractica.findAll({
      where: {
        notaFinal: {
          [Op.gte]: 4
        }
      }
    });
    let informesArr = []
    for(let i = 0; i < informes.length; i++){
      const estudianteCC = await Estudiante.findOne({ where: {
        id_estudiante: informes[i].id_estudiante,
      }})
      let usuarioEstudiante = await Usuario.findByPk(estudianteCC.id_usuario)
      let nombreArchivo = informes[i].ruta.slice(30);
      const nombreEstudiante = usuarioEstudiante.nombre+' '+usuarioEstudiante.apellidop+' '+usuarioEstudiante.apellidom
      // console.log(nombreArchivo)
      // files.forEach((file) => {
      //   console.log('vuelta', informes.length)
      informesArr.push({
        id_informePractica: informes[i].id_informePractica, 
        nombre: nombreArchivo,
        // ruta: files[i].ruta,
        // notaEvaluador1: informes[i].notaEvaluador1,
        // notaEvaluador2: informes[i].notaEvaluador2,
        // observacionesEvaluador1: informes[i].observacionesEvaluador1,
        // observacionesEvaluador2: informes[i].observacionesEvaluador2,
        // notaFinal: informes[i].notaFinal,
        id_estudiante: informes[i].id_estudiante,
        nombreEstudiante: nombreEstudiante,
        rutEstudiante: usuarioEstudiante.rut,
        fecha: informes[i].createdAt
      })
    }
    return res.json({ok: true, datos: informesArr})

  } catch (error) {
    return res.json({ok: false, msg: error.message})
  }
}