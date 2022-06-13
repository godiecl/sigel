import { ProfesorGuiaCP } from '../models/ProfesorGuiaCP.js'

export const createProfesorGuiaCP = async (request, response) =>{

    try{
        // console.log('request', request);
        // Tomo parametros de la request.
        const { disc_Empresa, interesOtroCP, telefono, _id_user} = request.body.profesorGuiaCP;

        console.log('request body', request.body);

        // Crear en la bdd
        const newProfesorGuiaCP = await ProfesorGuiaCP.create({
            disc_Empresa,
            interesOtroCP,
            telefono,
            id_usuario: _id_user
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

export const getProfesorGuiaCPPorId = async (req, res) => {

    try{  
          // console.log('res',res);
  
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
  
      console.log('request body profesor cc update', request.body.profesorGuiaCP);
      const { id, estadoDisponible, telefono} = request.body.profesorGuiaCP;
  
      const profesorguiacp = await ProfesorGuiaCP.findByPk(id);

      if(!profesorguiacp) return res.status(404).json({ message: 'El Profesor Guia Capstone no existe'})
  
      profesorguiacp.telefono = telefono;
      profesorguiacp.estadoDisponible = estadoDisponible;    
      await profesorguiacp.save();
      
      return res.json();
  
    } catch (error){
  
      return res.status(500).json({message: error.message});
  
    }
  
  }