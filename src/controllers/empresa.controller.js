import { Empresa } from '../models/Empresa.js'

export const createEmpresa = async (request, response) =>{

    // funcionando.

    try{
        console.log('request', request);
        // Tomo parametros de la request.
        const { nombreEmpresa, rutEmpresa, giroEmpresa} = request.body.empresa;

        console.log('request body', request.body);

        // Crear en la bdd
        const newEmpresa = await Empresa.create({
            nombreEmpresa,
            rutEmpresa,
            giroEmpresa,
        })

        return response.status(200). json({
            ok: true,
            msg: 'Empresa added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Empresa.'
        })
    }
}
export const getEmpresaPorRut = async (req, res) => {

    try{  
          console.log('res',res);
  
          const { rut } = req.params;
          const empresa = await Empresa.findOne({
            where: {
              rutEmpresa: rut
          },});
  
          if(!empresa) return res.status(404).json({ message: 'La empresa no existe'})
  
        
          return res.json(empresa);
  
  
        }catch(error){
          return res.status(500).json({message: error.message})
        }
    
   }
  
   export const updateEmpresa = async (req, res) => {
  
    try{
  
      console.log('request body profesor cc update', request.body.empresa);
      const { id, nombre, rut, giro} = request.body.empresa;
  
      const empresa = await Empresa.findByPk(id);

      if(!empresa) return res.status(404).json({ message: 'La empresa no existe'})
  
      empresa.nombreEmpresa = nombre;
      empresa.rutEmpresa = rut;   
      empresa.giroEmpresa = giro;

      await empresa.save();
      
      return res.json();
  
    } catch (error){
  
      return res.status(500).json({message: error.message});
  
    }
  
  }