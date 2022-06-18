import { EncargadoPractica } from '../models/EncargadoPractica.js'

export const createEncargadoPractica = async (request, response) =>{

    try{
        // Tomo parametros de la request.
        const id_usuario = request.body.id_usuario;

        const userRepetido = await EncargadoPractica.findOne({
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
        // console.log(' _id_user', _id_user)

        // Crear en la bdd
        const newEncargadoPractica = await EncargadoPractica.create({
            id_usuario: id_usuario
        })

        return response.status(200).json({
            ok: true,
            msg: 'Encargado Practica added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added Encargado Practica.'
        })
    }
}

export const deleteEncargadoPracticaPorIdUsuario = async (req, res) =>{

    try {
      console.log('request params encargado practica delete por id', req.params.id);
      const id = req.params.id;
      let encargadoPractica = await EncargadoPractica.findOne({
        where: {
          id_usuario : id
        }
      });
      
      await encargadoPractica.destroy();
      return res.status(204).json({ok: true, message: 'encargadoPractica borrado'});
      
    } catch (error) {
      return res.status(500).json({ok: false, message: error.message})
    }
  
  }
