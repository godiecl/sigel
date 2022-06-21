import { EncargadoEmpresa } from '../models/EncargadoEmpresa.js'
import { Usuario } from '../models/Usuario.js';

export const createEncargadoEmpresa = async (request, response) =>{

    try{
        // console.log('request', request);
        // Tomo parametros de la request.
        const { id_encargadoEmpresa, cargo, telefono, id_usuario, id_empresa} = request.body.encargadoEmpresa;

        //  console.log('request body', request.body);
        //  console.log('request body encargadoEmpresa crear', request.body.encargadoEmpresa);
        //  console.log('telefono', telefono);
        //  console.log('cargo', cargo);

         const userRepetido = await EncargadoEmpresa.findOne({
            where:{
              id_usuario: id_usuario
            }
          });
          // console.log('lmao');
          if(userRepetido){
            return response.status(400).json({
              ok: false,
              msg: 'No se agregó el usuario, porque ya está registrado.'
          })
          }
          // console.log('2lmao');

        // Crear en la bdd
        const newEncargadoEmpresa = await EncargadoEmpresa.create({
            cargo,
            telefono,
            id_usuario,
            id_empresa
        })
        // console.log('3lmao');
        return response.status(200).json({
            ok: true,
            msg: 'Encargado Empresa added.',
            id: newEncargadoEmpresa.id_encargadoEmpresa
        })
    }catch(error){
        console.log(error);
        return response.status(400).json({
            ok: false,
            msg: 'Didnt added Encargado Empresa.'
        })
    }
}

export const getEncargadoEmpresaPorIdUsuario = async (req, res) => {

    try{  
  
  
          const { id } = req.params;
          
          // console.log(id);
          const encargado = await EncargadoEmpresa.findOne({
            where: {
              id_usuario: id
          },});
  
          if(!encargado) return res.status(400).json({ ok: false, message: 'El encargado no existe'})
  
        
          return res.json(encargado);
  
  
        }catch(error){
          return res.status(400).json({message: error.message})
        }
    
   }


   export const updateEncargadoEmpresaPorId = async (req, res) => {

    try{
  
      // console.log('request body encargado empresa update', req.body.encargadoEmpresa);
      const { id, cargo, telefono, id_usuario, id_empresa} = req.body.encargadoEmpresa;
  
      const encargado = await EncargadoEmpresa.findOne({
        where:{
          id_usuario: id_usuario
        }
      });
  
      encargado.cargo = cargo;
      encargado.telefono = telefono;
      await encargado.save();
      
      return res.status(200).json({ok: true, message: 'Encargado de empresa actualizado'});
  
    } catch (error){
      return res.status(500).json({ok: false, message: error.message});
    }
  }

  export const deleteEncargadoEmpresaPorIdUsuario = async (req, res) =>{

    try {
      // console.log('request params encargado empresa delete por id', req.params.id);
      const id = req.params.id;
      let encargadoEmpresa = await EncargadoEmpresa.findOne({
        where: {
          id_usuario : id
        }
      });
      
      await encargadoEmpresa.destroy();
      return res.status(200).json({ok: true, message: 'encargadoEmpresa borrado'});
      
    } catch (error) {
      return res.status(500).json({ok: false, message: error.message})
    }
  
  }

