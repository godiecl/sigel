import { InformePractica } from "../../models/documentos/InformePractica.js"
import { Estudiante } from "../../models/Estudiante.js";
import { ProfesorComisionCorrecion } from "../../models/ProfesorComisionCorreccion.js";
import { Usuario } from "../../models/Usuario.js";


export const createInforme = async (req, res) =>{

    try {

        console.log('data: ', req.body);
        const id = req.body.id_estudiante;
        const nombreInforme = req.body.ruta;
        const patron = /^[0-9]{8,9}[_]{1}[a-zA-Z]+[_]{1}[a-zA-Z]+[_]{1}[a-nA-N]{4,5}[.pdf]/
        let formatoValido = patron.test(nombreInforme)
        if(formatoValido === false){
          console.log('no cumple con el formato')
          return res.json({ok: false, msg: 'El formato del archivo es inválido.'})
        }

        // validar si estudiante no ha sido autorizado por una empresa

        const ruta = './documentos/informe-practica/'+nombreInforme;

        const informeNew = await InformePractica.create({
            
            ruta: ruta,
            id_estudiante:  id
        })

        return res.status(200).json({ok: true, msg: 'Se ha almacenado el informe exitosamente.'})

    } catch (error) {
        return res.json({ok: false, msg: error.message})
    }

  }

  export const descargarInforme = async (req,res,next)=>{
    // console.log('recibiendo: ',req);
    try {
        const id = req.params.id
        const informe = await InformePractica.findByPk(id);
        if(!informe){
            res.json({ok: false, msg: 'El informe no existe.'})
        }
        res.download(informe.ruta);
        
    } catch (error) {
        res.json({ok: false, msg: error.msg})
    }
    
  }

  export const getNotaFinal = async (req, res)=>{
    try {
        console.log('entre')
        const id = req.params.id
        const informe = await InformePractica.findByPk(id);
        if(!informe){
            res.json({ok: false, msg: 'El informe no existe.'})
        }
        if(!informe.notaFinal){
            res.json({ok: false, msg: 'Todavía no tiene nota final'})
        }
        const nota = informe.notaFinal;
        const observacionesEvaluador1 = informe.observacionesEvaluador1;
        const observacionesEvaluador2 = informe.observacionesEvaluador2;
        if(!observacionesEvaluador1 && !observacionesEvaluador2){
          res.json({ok: true, notaFinal: nota })

        }else if(observacionesEvaluador1 && observacionesEvaluador2){
          res.json({ok: true, notaFinal: nota, observacionesEvaluador1: observacionesEvaluador1  , observacionesEvaluador2: observacionesEvaluador2 })
        }
        else if(observacionesEvaluador1){
          res.json({ok: true, notaFinal: nota, observacionesEvaluador1: observacionesEvaluador1 })

        }
        else if(observacionesEvaluador2){
          res.json({ok: true, notaFinal: nota, observacionesEvaluador2: observacionesEvaluador2 })

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
        res.json({ok: false, msg: 'Ha ocurrido un error. El body esta vacío'})
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
            res.json({ok: false, msg: 'No se ha modificado nada.'})
        }
        else if(nota1Modif && nota2Modif){
          res.json({ok: true, msg: 'Se ha actualizado la evaluación del informe'})
        }
        else if(nota1Modif){
          res.json({ok: true, msg: 'Se ha actualizado la evaluación del informe'})
        }
        else if(nota2Modif){
          res.json({ok: true, msg: 'Se ha actualizado la evaluación del informe'})
        }
      }
      
      
  
    } catch (error) {
      res.json({ok: false, msg: error.msg})
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