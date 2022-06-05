import { Estudiante } from '../models/Estudiante.js'

export const createEstudiante = async (request, response) => {


    const { correoPersonal, carrera, practicaAprobada, telefono, estadoAsignacionCP } = request.body.estudiante;

    console.log('request body estudiante', request.body.estudiante);
  
    const newEstudiante = await Estudiante.create({
      correoPersonal,
      carrera,
      practicaAprobada,
      telefono,
      estadoAsignacionCP
    });

    console.log('nuevo estudiante', newEstudiante);

  //   await sequelize.query('INSERT INTO estudiantes ("correoPersonal", carrera, "practicaAprobada", telefono, "estadoAsignacionCP") VALUES ($1, $2, $3, $4, $5)', [correoPersonal, carrera, practicaAprobada, telefono, estadoAsignacionCP], (error, results) => {
  //     if (error) {
  //       console.log('error', error);
  //       throw error
  //     }
  //     response.status(200).send({msg: 'Estudiante added'})
  // })
}