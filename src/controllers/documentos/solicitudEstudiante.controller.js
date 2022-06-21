import { SolicitudEstudiante } from '../../models/documentos/SolicitudEstudiante.js'

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
  
      console.log('request body solicitud estudiante update', req.body.solicitudEstudiante);
      const id = req.params;
      const { estadoAutorizacion, comentarioAutorizacion, descripcionRequerimientoPractica} = req.body.solicitudEstudiante;
  
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
    const id = req.params
    const solicitud = await SolicitudEstudiante.findByPk(id);
    res.json({ok: true, solicitud: solicitud})
  }