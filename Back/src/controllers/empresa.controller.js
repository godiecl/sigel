import { Empresa } from '../models/Empresa.js';
import { SolicitudEstudiante } from '../models/documentos/SolicitudEstudiante.js';
import { EncargadoEmpresa } from '../models/EncargadoEmpresa.js';
import { Usuario } from '../models/Usuario.js';

export const createEmpresa = async (request, response) =>{

    // funcionando.

    try{
        // // console.log('request', request);

        // Tomo parametros de la request.
        const nombreEmpresa = request.body.empresa.nombreEmpresa;
        const rutEmpresa = request.body.empresa.rutEmpresa;
        const giroEmpresa = request.body.empresa.giroEmpresa;

        // // console.log(rutEmpresa);
// 
        // // console.log(nombreEmpresa);
        // // console.log(giroEmpresa);
        const empresaRepetida = await Empresa.findOne({
          where: {
            rutEmpresa: rutEmpresa
          }
        })

        if(empresaRepetida){
          return response.status(401).json({
            ok: false,
            msg: 'No se agregó la empresa, porque ya está registrada.'
        })
        }

        // Crear en la bdd
        const newEmpresa = await Empresa.create({
            nombreEmpresa,
            rutEmpresa,
            giroEmpresa,
        })

        

        return response.json( {ok: true, newEmpresa});
    }catch(error){
        return response.status(401).json({
            ok: false,
            msg: 'No se ha podido registrar la empresa.'
        })
    }
}
  export const getEmpresaPorRut = async (req, res) => {

    try{  
          // // console.log('res',res);
  
          const { rut } = req.params;
          const empresa = await Empresa.findOne({
            where: {
              rutEmpresa: rut
          },});
  
          if(!empresa) return res.status(404).json({ ok:false, message: 'La empresa no existe'})
  
          return res.json({ok: true, empresa: empresa});
  
        }catch(error){
          return res.status(400).json({ok: false, message: error.message})
        }
    
   }

   export const getEmpresa = async (req, res) => {

    try{  
          // // console.log('res',res);
  
          const { id } = req.params;
          const empresa = await Empresa.findOne({
            where: {
              id_empresa: id
          },});
  
          if(!empresa) return res.status(404).json({ ok: false, msg: 'La empresa no existe'})
  
        
          return res.json({ok: true, empresa: empresa});
  
  
        }catch(error){
          return res.status(500).json({ok: false, msg: error.message})
        }
    
   }
  
   export const updateEmpresa = async (req, res) => {
  
    try{
  
      // // console.log('request body empresa update', request.body.empresa);
      const { id, nombre, rut, giro} = request.body.empresa;
  
      const empresa = await Empresa.findByPk(id);

      if(!empresa) return res.status(404).json({ message: 'La empresa no existe'})
  
      empresa.nombreEmpresa = nombre;
      empresa.rutEmpresa = rut;   
      empresa.giroEmpresa = giro;

      await empresa.save();
      
      return res.status(500).json({ok: true, message: 'Empresa actualizada'});
  
    } catch (error){
  
      return res.status(500).json({ok: false, message: error.message});
  
    }
  
  }

  export const getEmpresasSolicitadoEstudiante = async (req, res) => {

    const solicitudes = await SolicitudEstudiante.findAll({
        where: {
            estadoAutorizacion: true
        }
    });

    let data = [];

    for(let i=0; i<solicitudes.length ;i++){
        const encargado = await EncargadoEmpresa.findByPk(solicitudes[i].id_encargadoEmpresa);

        const usuario = await Usuario.findOne({
            where: {
                id: encargado.id_usuario
            }
        })
        // // console.log(encargado);
        const empresa = await Empresa.findByPk(encargado.id_empresa);
        
         data.push({
            id_solicitudEstudiante: solicitudes[i].id_solicitudEstudiante,
            nombreProyecto: solicitudes[i].nombreProyecto,
            descripcionRequerimientoPractica: solicitudes[i].descripcionRequerimientoPractica,
            nombreEmpresa: empresa.nombreEmpresa, 
            id_empresa: empresa.id_empresa,
            // nombreEncargado: usuario.nombre,
            // apellidoEncargado: usuario.apellidop,
        })
    }

    //  // console.log(data)

   return res.json(data)
}