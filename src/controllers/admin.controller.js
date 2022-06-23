import { Admin } from '../models/Admin.js'

export const createAdmin = async (request, response) =>{

    try{
        // Tomo parametros de la request.
        const  id_usuario = request.body.id_usuario;

        const userRepetido = await Admin.findOne({
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
        // console.log(_id_user);

        // Crear en la bdd
        const newAdmin = await Admin.create({
            id_usuario: id_usuario
        })

        return response.status(200).json({
            ok: true,
            msg: 'Admin added.'
        })
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'Didnt added admin.'
        })
    }

}

export const deleteAdminPorId = async (req, res) =>{

    try {
      // console.log('request params admin delete', req.params);
      const id = req.params.id;
      const admin = await Admin.findOne({
        where: {
          id_usuario : id
        }
      });
    
      await admin.destroy();
  
      return res.status(200).json({ok: true, message: 'Admin borrado'});
      
    } catch (error) {
      return res.status(500).json({ok:false, message: error.message})
    }
  
  }

