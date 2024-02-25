import { ProfesorGuiaCP } from '../models/ProfesorGuiaCP.js'

export const createProfesorGuiaCP = async (request, response) =>{

    try{
        // // console.log('request', request);
        // Tomo parametros de la request.
        const { disc_empresa, interesOtroCP, telefono, id_usuario} = request.body.profesorGuiaCP;

        // // console.log('request body', request.body);

        const userRepetido = await ProfesorGuiaCP.findOne({
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

        // Crear en la bdd
        const newProfesorGuiaCP = await ProfesorGuiaCP.create({
            disc_empresa,
            interesOtroCP,
            telefono,
            id_usuario: id_usuario
        })

        return response.status(200).json({
            ok: true,
            msg: 'Profesor Guia CP added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Profesor Guia CP.'
        })
    }
}

export const getProfesorGuiaCPPorIdUsuario = async (req, res) => {

    try{  
          // // console.log('res',res);
  
          const { id } = req.params;
          
          const profesorguiacp = await ProfesorGuiaCP.findOne({
            where: {
              id_usuario: id
          },});
  
          if(!profesorguiacp) return res.status(404).json({ message: 'El Profesor Guia Capstone no existe'})
  
        
          return res.json(profesorguiacp);
  
  
        }catch(error){
          return res.status(500).json({message: error.message})
        }
    
   }
  
  export const updateProfesorGuiaCP = async (req, res) => {
  
    try{
  
      // console.log('request body profesor cc update', request.body.profesorGuiaCP);
      const { disc_empresa, interesOtroCP, telefono, id_usuario} = request.body.profesorGuiaCP;
  
      const profesorguiacp = await ProfesorGuiaCP.findByPk(id);

      if(!profesorguiacp) return res.status(404).json({ message: 'El Profesor Guia Capstone no existe'})
  
      profesorguiacp.disc_empresa = disc_empresa;
      profesorguiacp.interesOtroCP = interesOtroCP;   
      profesorguiacp.telefono = telefono; 
      await profesorguiacp.save();
      
      return res.json();
  
    } catch (error){
  
      return res.status(500).json({message: error.message});
  
    }
  
}

export const updateProfesorGuiaPorId = async (req, res) => {

  try{

    // console.log('request body profesor guia por id update', req.body.profesorGuiaCP);
    const {id_profesor, disc_empresa, interesOtroCP, telefono, id_usuario } = req.body.profesorGuiaCP;

    const profesor = await ProfesorGuiaCP.findOne({
      where:{
        id_usuario: id_usuario
      }
    });

    profesor.disc_empresa = disc_empresa;
    profesor.interesOtroCP = interesOtroCP;
    profesor.telefono = telefono;
    await profesor.save();
    
    return res.json({ ok: true, message: 'Profesor guia actualizado' });

  } catch (error){
    return res.status(500).json({ok: false, message: error.message});
  }
}

export const deleteProfesorGuiaCPPorIdUsuario = async (req, res) =>{

  try {
    // console.log('request params profesor guia cp delete por id', req.params.id);
    const id = req.params.id;
    const profesor = await ProfesorGuiaCP.findOne({
      where: {
        id_usuario : id
      }
    });
    
    await profesor.destroy();
    return res.status(200).json({ok: true, message: 'profesor guia cp borrado'});
    
  } catch (error) {
    return res.status(500).json({ok: false, message: error.message})
  }

}