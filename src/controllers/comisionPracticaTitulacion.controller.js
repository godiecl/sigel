import { ComisionPracticaTitulacion } from '../models/ComisionPracticaTitulacion.js'

export const createComisionPracticaTitulacion = async (request, response) =>{

    try{
        
        // Tomo parametros de la request.
        const  jefeCarrera = request.body.jefeCarrera;
        const  id_usuario  = request.body.id_usuario;

        const userRepetido = await ComisionPracticaTitulacion.findOne({
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

        // console.log('request body comision practica', request.body);

        // Crear en la bdd
        const newComisionPracticaTitulacion = await ComisionPracticaTitulacion.create({
            jefeCarrera: jefeCarrera,
            id_usuario: id_usuario
        })

        return response.status(200).json({
            ok: true,
            msg: 'Comision Practica Titulacion added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Comision Practica Titulacion.'
        })
    }
}

export const deleteAdmin = async (req, res) =>{

    try {
      console.log('request params admin delete', req.params);
      const id = req.params;
      const admin = await ComisionPracticaTitulacion.findOne({
        where: {
          id_usuario : id
        }
      });
    
      await admin.destroy();
  
      return res.status(200);
      
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  
  }

  export const updateComisionPracticaTitulacionPorId = async (req, res) => {

    try{
  
      console.log('request body comision practica titulacion por id update', req.body.estudiante);
      
      const  jefeCarrera = request.body.jefeCarrera;
      const  id_usuario  = request.body.id_usuario;
  
      const comision = await ComisionPracticaTitulacion.findOne({
        where:{
          id_usuario: id_usuario
        }
      });
  
      comision.jefeCarrera = jefeCarrera;
      await comision.save();
      
      return res.json({ok:true, message: 'Comision actualizada'});
  
    } catch (error){
  
      return res.status(500).json({ok: false, message: error.message});
  
    }
  
  }

  export const deleteComisionPracticaTitulacionPorIdUsuario = async (req, res) =>{

    try {
      console.log('request params comision practica titulacion delete por id', req.params.id);
      const id = req.params.id;
      let comisionpracticatitulacion = await ComisionPracticaTitulacion.findOne({
        where: {
          id_usuario : id
        }
      });
      
      await comisionpracticatitulacion.destroy();
      return res.status(200).json({ok: true, message: 'comisionpracticatitulacion borrado'});
      
    } catch (error) {
      return res.status(500).json({ok: false, message: error.message})
    }
  
  }