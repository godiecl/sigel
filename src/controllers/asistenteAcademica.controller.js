import { AsistenteAcademica } from '../models/AsistenteAcademica.js'

export const createAsistenteAcademica = async (request, response) =>{

    try{
        // console.log('request', request);
        // Tomo parametros de la request.
        const  id_usuario = request.body.id_usuario;

        const userRepetido = await AsistenteAcademica.findOne({
          where:{
            id_usuario: id_usuario
          }
        });
    
        if(userRepetido){
          return response.status(401).json({
            ok: false,
            msg: 'No se agregó el usuario, porque ya está registrado.'
        })
        }

        // console.log('request body', request.body);

        // Crear en la bdd
        const newAsistenteAcademica = await AsistenteAcademica.create({
            id_usuario: id_usuario
        })

        return response.status(200).json({
            ok: true,
            msg: 'Asistente Academica added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Asistente Academica.'
        })
    }

    


}

export const deleteAsistenteAcademicaPorId = async (req, res) =>{

    try {
      console.log('request params asistente academica delete', req.params);
      const id = req.params.id;
      const asistente = await AsistenteAcademica.findOne({
        where: {
          id_usuario : id
        }
      });
    
      await asistente.destroy();
  
      return res.status(200).json({ok: true, message: 'Asistente academica borrada'});
      
    } catch (error) {
      return res.status(500).json({ok: false, message: error.message})
    }
  
  }