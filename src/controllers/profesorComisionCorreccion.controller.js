import { ProfesorComisionCorrecion } from '../models/ProfesorComisionCorreccion.js'

export const createProfesorComisionCorreccion  = async (request, response) =>{

    try{
        // console.log('request', request);
        // Tomo parametros de la request.
        const { estadoDisponible, telefono, _id_user} = request.body.profesorCC;

        // console.log('request body', request.body.profesorCC);

        // Crear en la bdd
        const newProfesorComisionCorreccion = await ProfesorComisionCorrecion.create({
            estadoDisponible,
            telefono,
            id_usuario: _id_user
        })

        return response.status(200).json({
            ok: true,
            msg: 'Profesor Comision Correccion added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Profesor Comision Correccion.'
        })
    }
}


export const getProfesorCCPorId = async (req, res) => {

    try{  
          // console.log('res',res);
  
          const { id } = req.params;
          const profesorcc = await ProfesorComisionCorrecion.findOne({
            where: {
              id_usuario: id
          },});
  
          if(!profesorcc) return res.status(404).json({ message: 'El Profesor de CC no existe'})
  
        
          return res.json(profesorcc);
  
  
        }catch(error){
          return res.status(500).json({message: error.message})
        }
    
   }
  
   export const updateProfesorCC = async (req, res) => {
  
    try{
  
      console.log('request body profesor cc update', request.body.profesorCC);
      const { id, estadoDisponible, telefono} = request.body.profesorCC;
  
      const profesorcc = await ProfesorComisionCorrecion.findByPk(id);

      if(!profesorcc) return res.status(404).json({ message: 'El Profesor de CC no existe'})
  
      profesorcc.telefono = telefono;
      profesorcc.estadoDisponible = estadoDisponible;    
      await profesorcc.save();
      
      return res.json();
  
    } catch (error){
  
      return res.status(500).json({message: error.message});
  
    }
  
  }