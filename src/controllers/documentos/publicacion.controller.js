import { Publicacion } from "../../models/documentos/Publicacion.js";


export const createPublicacion = async (req, res) =>{

    try {
        
        console.log(' body crear publicacion ',req.body);

        const { remitente, asunto, mensaje, id_comisionPracticaTitulacion } = req.body.publicacion;

        const publicacion = await Publicacion.findOne({
            where: {
                asunto: asunto
            }
        })

        if(publicacion){
            return res.status(400).json({
                ok: false,
                msg: 'No se pudo registrar esta publicacion, debido a que ese asunto ya existe.'
            })
        }

        const newPublicacion = await Publicacion.create({
            remitente, asunto, mensaje, id_comisionPracticaTitulacion
        })

        return res.status(200).json({
            ok: true,
            msg: 'Publicacion registrada'
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }

}

export const getPublicaciones = async (req, res) => {
    const publicaciones = await Publicacion.findAll();
    res.json(publicaciones)
}

export const getPublicacion = async (req, res) => {
    try {
    console.log(req.params)
    const id = req.params.id
    const publicacion = await Publicacion.findByPk(id);
    res.json({ok: true, publicacion: publicacion})
        
    } catch (error) {
        res.json({ok: false, msg: error.message})
    }
}

export const updatePublicacion = async (req, res) => {

    try{
  
      console.log('request body publicacion update', req.body);
      console.log('param', req.params.id);
      const id = req.params.id;
      const { remitente, asunto, mensaje, id_comisionPracticaTitulacion } = req.body.publicacion;
  
      const publicacion = await Publicacion.findByPk(id);
  
      publicacion.remitente = remitente;
      publicacion.asunto = asunto;
      publicacion.mensaje = mensaje;
      publicacion.id_comisionPracticaTitulacion = id_comisionPracticaTitulacion;
      await publicacion.save();
      
      return res.json({ok:true, msg: 'publicacion actualizada'});
  
    } catch (error){
  
      return res.status(500).json({ok: false, msg: error.message});
  
    }
  
}

export const deletePublicacion = async (req, res) =>{

    try {
      console.log('request params publicacion delete', req.params);
      const id = req.params.id;
      const publicacion = await Publicacion.findByPk(id);
    
      await publicacion.destroy();
  
      return res.status(200).json({ok: true, message: 'publicacion borrado'});
      
    } catch (error) {
      return res.status(500).json({ok: false, message: error.message})
    }
  
  }