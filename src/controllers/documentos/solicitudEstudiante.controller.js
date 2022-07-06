import { SolicitudEstudiante } from '../../models/documentos/SolicitudEstudiante.js'
import { Empresa } from '../../models/Empresa.js';
import { EncargadoEmpresa } from '../../models/EncargadoEmpresa.js';
import { Usuario } from '../../models/Usuario.js';

export const createSolicitudEstudiante = async (req, res) =>{

    try {
        
        console.log(' body crear solicitud estudiante ',req.body);

        const {nombreProyecto, problemaResolver, 
            area, solucion, entregableFinal, 
            importancia, plazo, infoAdicional, 
            disposicionMonetaria, 
            modalidad, fechaEnvio, id_encargadoEmpresa } = req.body.solicitud;

        const solicitud = await SolicitudEstudiante.findOne({
            where: {
                nombreProyecto: nombreProyecto
            }
        })

        if(solicitud){
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar esta solicitud, debido a que ese nombre de proyecto ya existe.'
            })
        }

        const newSolicitud = await SolicitudEstudiante.create({
            nombreProyecto,
            problemaResolver,
            area,
            solucion,
            entregableFinal,
            importancia,
            plazo,
            infoAdicional,
            disposicionMonetaria,
            modalidad,
            fechaEnvio,
            id_encargadoEmpresa
        })

        const encargadoEmpresa = await EncargadoEmpresa.findByPk(id_encargadoEmpresa)
        const iduser = encargadoEmpresa.id_usuario;
        const usuario = await Usuario.findOne({where:{
            id : iduser
        }})
        usuario.estado = true;
        await usuario.save(); 


        return res.status(200).json({
            ok: true,
            msg: 'Solicitud registrada'
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: error
        })
    }

}

export const updateSolicitudEstudiante = async (req, res) => {

    try{
  
      console.log('request body solicitud estudiante update', req.body);
      console.log('param', req.params.id);
      const id = req.params.id;
      const { estadoAutorizacion, comentarioAutorizacion, descripcionRequerimientoPractica} = req.body;
  
      const solicitud = await SolicitudEstudiante.findByPk(id);
  
      solicitud.estadoAutorizacion = estadoAutorizacion;
      solicitud.comentarioAutorizacion = comentarioAutorizacion;
      solicitud.descripcionRequerimientoPractica = descripcionRequerimientoPractica;
      await solicitud.save();
      
      return res.json({ok:true, msg: 'Solicitud actualizada'});
  
    } catch (error){
  
      return res.status(500).json({ok: false, msg: error.message});
  
    }
  
}

  export const getSolicitudesEstudiante = async (req, res) => {
        const solicitudes = await SolicitudEstudiante.findAll();
        res.json(solicitudes)
  }

  export const getSolicitudEstudiante = async (req, res) => {
    try {
    console.log(req.params)
    const id = req.params.id
    const solicitud = await SolicitudEstudiante.findByPk(id);
    res.json({ok: true, solicitud: solicitud})
        
    } catch (error) {
        res.json({ok: false, msg: error.message})
    }
  }

  export const getSolicitudesEstudianteTabla = async (req, res) => {
    const solicitudes = await SolicitudEstudiante.findAll();

    let data = [];

    for(let i=0; i<solicitudes.length ;i++){
        const encargado = await EncargadoEmpresa.findByPk(solicitudes[i].id_encargadoEmpresa);

        const usuario = await Usuario.findOne({
            where: {
                id: encargado.id_usuario
            }
        })
        // console.log(encargado);
        const empresa = await Empresa.findByPk(encargado.id_empresa);
        
         data.push({
            id_solicitudEstudiante: solicitudes[i].id_solicitudEstudiante,
            nombreProyecto: solicitudes[i].nombreProyecto,
            estado: solicitudes[i].estadoAutorizacion,
            telefono: encargado.telefono,
            nombreEncargado: usuario.nombre,
            apellidoEncargado: usuario.apellidop,
            nombreEmpresa: empresa.nombreEmpresa, 

        })
    }

    //  console.log(data)

    res.json(data)
}

export const getListaVacantes = async (req, res) => {

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
        // console.log(encargado);
        const empresa = await Empresa.findByPk(encargado.id_empresa);
        
        // if(data.findIndex(id_empresa !== empresa.id_empresa )){
        //     continue;
        // }

         data.push({
            id_solicitudEstudiante: solicitudes[i].id_solicitudEstudiante,
            nombreProyecto: solicitudes[i].nombreProyecto,
            descripcionRequerimientoPractica: solicitudes[i].descripcionRequerimientoPractica,
            id_encargadoEmpresa: encargado.id_encargadoEmpresa,
            telefono: encargado.telefono,
            nombreEmpresa: empresa.nombreEmpresa,
            id_empresa: empresa.id_empresa, 
            correo: usuario.correo, 
            nombreEncargado: usuario.nombre,
            apellidoEncargado: usuario.apellidop,

        })
    }

     console.log(data)

    res.json(data)
}



