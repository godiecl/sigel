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