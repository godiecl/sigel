import { Seguro } from '../models/documentos/Seguro.js';
import { Estudiante } from '../models/Estudiante.js'
import { Usuario } from '../models/Usuario.js';

export const createEstudiante = async (request, response) => {

  try{ 

    const { correoPersonal, carrera, practicaAprobada, telefono, estadoAsignacionCP, id_usuario } = request.body.estudiante;
    
    //  // console.log('request body estudiante', request.body);

    const estudiante = await Estudiante.findOne({
      where:{
        id_usuario: id_usuario
      }
    });

    if(estudiante){
      return response.status(401).json({
        ok: false,
        msg: 'No se agregó el estudiante, porque ya está registrado.'
    })
    }

    const newEstudiante = await Estudiante.create({
      
      correoPersonal,
      carrera,
      practicaAprobada,
      telefono,
      estadoAsignacionCP,
      id_usuario: id_usuario
    });

    //imprimir por consola
    // // console.log('nuevo estudiante', newEstudiante);

    return response.status(200).json({ok: true, msg: 'Estudiante added'})

  }catch(error){
    return response.status(500).json({ok: false, msg: error.message})
  }

  //   await sequelize.query('INSERT INTO estudiantes ("correoPersonal", carrera, "practicaAprobada", telefono, "estadoAsignacionCP") VALUES ($1, $2, $3, $4, $5)', [correoPersonal, carrera, practicaAprobada, telefono, estadoAsignacionCP], (error, results) => {
  //     if (error) {
  //       // console.log('error', error);
  //       throw error
  //     }
  //     )
  // })
}

export const getEstudiantePorId = async (req, res) => {

  try{  


        const { id } = req.params;
        
        // console.log(id);
        const estudiante = await Estudiante.findOne({
          where: {
            id_usuario: id
        },});

        if(!estudiante) return res.status(404).json({ message: 'El estudiante no existe'})

      
        return res.json(estudiante);


      }catch(error){
        return res.status(500).json({message: error.message})
      }
  
 }

 export const updateEstudiante = async (req, res) => {

  try{

    // console.log('request body estudiante update', req.body.estudiante);
    const { id, correoPersonal, carrera, practicaAprobada, telefono, estadoAsignacionCP, id_usuario} = req.body.estudiante;

    const estudiante = await Estudiante.findByPk(id);

    estudiante.correoPersonal = correoPersonal;
    estudiante.carrera = carrera;
    estudiante.practicaAprobada = practicaAprobada;
    estudiante.telefono = telefono;
    estudiante.estadoAsignacionCP = estadoAsignacionCP;    
    estudiante.id_usuario = id_usuario;
    await estudiante.save();
    
    return res.json({ok: true, msg: 'Estudiante actualizado'});

  } catch (error){

    return res.status(500).json({ok:false, msg: error.message});

  }

}

export const updateEstudiantePorId = async (req, res) => {

  try{

    // console.log('request body estudiante update', req.body.estudiante);
    const { id, correoPersonal, carrera, practicaAprobada, telefono, estadoAsignacionCP, id_usuario} = req.body.estudiante;

    const estudiante = await Estudiante.findOne({
      where:{
        id_usuario: id_usuario
      }
    });

    estudiante.correoPersonal = correoPersonal;
    estudiante.carrera = carrera;
    estudiante.practicaAprobada = practicaAprobada;
    estudiante.telefono = telefono;
    estudiante.estadoAsignacionCP = estadoAsignacionCP;    
    await estudiante.save();
    
    return res.status(200).json({ok: true, message: 'Estudiante actualizado'});

  } catch (error){

    return res.status(500).json({ok: false, message: error.message});

  }

}

export const deleteEstudiante = async (req, res) =>{

  try {
    // console.log('request params estudiante delete', req.params);
    const id = req.params;
    const estudiante = await Estudiante.findByPk(id);
  
    await estudiante.destroy();

    return res.status(200).json({ok: true, message: 'Estudiante borrado'});
    
  } catch (error) {
    return res.status(500).json({ok: false, message: error.message})
  }

}

export const deleteEstudiantePorIdUsuario = async (req, res) =>{

  try {
    // console.log('request params estudiante delete por id', req.params.id);
    const id = req.params.id;
    let estudiante = await Estudiante.findOne({
      where: {
        id_usuario : id
      }
    });
    
    await estudiante.destroy();
    return res.status(200).json({message: 'Estudiante borrado'});
    
  } catch (error) {
    return res.status(500).json({message: error.message})
  }

}

export const getEstudiantes = async (req,res) =>{

  try {
    const estudiantes = await Estudiante.findAll();

    let data = [];

    for(let x=0; x<estudiantes.length; x++){

      const usuarioEstudiante = await Usuario.findByPk(estudiantes[x].id_usuario);

      data.push({
        id_estudiante: estudiantes[x].id_estudiante,
        nombreEstudiante: usuarioEstudiante.nombre,
        apellidop: usuarioEstudiante.apellidop,
        apellidom: usuarioEstudiante.apellidom,
        estadoEstudiante: estudiantes[x].estadoDisponibleCC,
      })
    }

    return res.json(data)
    
  } catch (error) {
    return res.status(500).json({ok:false, msg: error.msg})
  }

}

export const getEstudiantesPractica = async (req,res) =>{

  try {
    console.log('ejecutando get estudiantes practica')
    const seguros = await Seguro.findAll();
    let estudiantes = [];

    for(let i = 0; i < seguros.length; i++){
      const estudiante = await Estudiante.findOne({where: {
        id_estudiante: seguros[i].id_estudiante
      }});
      if(estudiante){
        estudiantes.push(estudiante);
      }
    } 
    console.log(estudiantes)
      let data = [];
  
      for(let x=0; x<estudiantes.length; x++){
  
        const usuarioEstudiante = await Usuario.findByPk(estudiantes[x].id_usuario);
  
        data.push({
          id_estudiante: estudiantes[x].id_estudiante,
          nombreEstudiante: usuarioEstudiante.nombre,
          apellidop: usuarioEstudiante.apellidop,
          apellidom: usuarioEstudiante.apellidom,
          estadoEstudiante: estudiantes[x].estadoDisponibleCC,
        })
      }
  
      return res.json(data)
    

   
    
  } catch (error) {
    return res.status(500).json({ok:false, msg: error.msg})
  }

}