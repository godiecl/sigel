import { Estudiante } from '../models/Estudiante.js'

export const createEstudiante = async (request, response) => {


    const { correoPersonal, carrera, practicaAprobada, telefono, estadoAsignacionCP, _id_user } = request.body.estudiante;
    
    // console.log('request body estudiante', request.body);
  
    const newEstudiante = await Estudiante.create({
      
      correoPersonal,
      carrera,
      practicaAprobada,
      telefono,
      estadoAsignacionCP,
      id_usuario: _id_user
    });

    //imprimir por consola
    // console.log('nuevo estudiante', newEstudiante);

    return response.status(200).json({msg: 'Estudiante added'})

  //   await sequelize.query('INSERT INTO estudiantes ("correoPersonal", carrera, "practicaAprobada", telefono, "estadoAsignacionCP") VALUES ($1, $2, $3, $4, $5)', [correoPersonal, carrera, practicaAprobada, telefono, estadoAsignacionCP], (error, results) => {
  //     if (error) {
  //       console.log('error', error);
  //       throw error
  //     }
  //     )
  // })
}

export const getEstudiantePorId = async (req, res) => {

  try{  


        const { id } = req.params;
        
        console.log(id);
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

    console.log('request body estudiante update', request.body.estudiante);
    const { id, correoPersonal, carrera, practicaAprobada, telefono, estadoAsignacionCP} = request.body.estudiante;

    const estudiante = await Estudiante.findByPk(id);

    estudiante.correoPersonal = correoPersonal;
    estudiante.carrera = carrera;
    estudiante.practicaAprobada = practicaAprobada;
    estudiante.telefono = telefono;
    estudiante.estadoAsignacionCP = estadoAsignacionCP;    
    await estudiante.save();
    
    return res.json();

  } catch (error){

    return res.status(500).json({message: error.message});

  }

}