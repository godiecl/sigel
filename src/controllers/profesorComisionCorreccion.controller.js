import { ProfesorComisionCorrecion } from '../models/ProfesorComisionCorreccion.js'

export const createProfesorComisionCorreccion  = async (request, response) =>{

    try{
        // console.log('request', request);
        // Tomo parametros de la request.
        const { estadoDisponible, telefono, id_usuario} = request.body.profesorCC;

        // console.log('request body', request.body.profesorCC);

        const userRepetido = await ProfesorComisionCorrecion.findOne({
          where:{
            id_usuario: id_usuario
          }
        });
    
        if(userRepetido){
          return response.status(400).json({
            ok: false,
            msg: 'No se agregó el usuario, porque ya está registrado.'
        })
        }

        // Crear en la bdd
        const newProfesorComisionCorreccion = await ProfesorComisionCorrecion.create({
            estadoDisponible,
            telefono,
            id_usuario: id_usuario
        })

        return response.status(200).json({
            ok: true,
            msg: 'Profesor Comision Correccion added.'
        })
    }catch(error){
        return response.status(400).json({
            ok: false,
            msg: 'Didnt added Profesor Comision Correccion.'
        })
    }
}


export const getProfesorCCPorIdUsuario = async (req, res) => {

    try{  
          // console.log('res',res);
  
          const { id } = req.params;
          const profesorcc = await ProfesorComisionCorrecion.findOne({
            where: {
              id_usuario: id
          },});
  
          if(!profesorcc) return res.status(404).json({ ok: false, message: 'El Profesor de CC no existe'})
  
        
          return res.json(profesorcc);
  
  
        }catch(error){
          return res.status(500).json({ok: false, message: error.message})
        }
    
   }
  
   export const updateProfesorCC = async (req, res) => {
  
    try{
  
      console.log('request body profesor cc update', request.body.profesorCC);
      const { id, estadoDisponible, telefono} = request.body.profesorCC;
  
      const profesorcc = await ProfesorComisionCorrecion.findByPk(id);

      if(!profesorcc) return res.status(404).json({ ok: false, message: 'El Profesor de CC no existe'})
  
      profesorcc.telefono = telefono;
      profesorcc.estadoDisponible = estadoDisponible;    
      await profesorcc.save();
      
      return res.json({ok: true, message: 'Profesor cc actualizado.'});
  
    } catch (error){
  
      return res.status(500).json({ok: false, message: error.message});
  
    }
  
  }

  export const updateProfesorCCPorId = async (req, res) => {

    try{
  
      console.log('request body profesor cc por id update', req.body.profesorCC);
      const { estadoDisponible, telefono, id_usuario } = req.body.profesorCC;
  
      const profesorcc = await ProfesorComisionCorrecion.findOne({
        where:{
          id_usuario: id_usuario
        }
      });
  
      profesorcc.estadoDisponible = estadoDisponible;
      profesorcc.telefono = telefono;
      await profesorcc.save();
      
      return res.status(200).json({ok: true, message: 'Profesor cc actualizado'});
  
    } catch (error){
      return res.status(500).json({ok: false, message: error.message});
    }
  }

  export const deleteProfesorCCPorIdUsuario = async (req, res) =>{

    try {
      console.log('request params profesor cc delete por id', req.params.id);
      const id = req.params.id;
      let profesor = await ProfesorComisionCorrecion.findOne({
        where: {
          id_usuario : id
        }
      });
      
      await profesor.destroy();
      return res.status(204).json({ok: true, message: 'profesor cc borrado'});
      
    } catch (error) {
      return res.status(500).json({ok: false, message: error.message})
    }
  
  }