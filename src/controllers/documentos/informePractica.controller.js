import { InformePractica } from "../../models/documentos/InformePractica.js"


export const createInforme = async (req, res) =>{

    try {

        console.log('data: ', req.body);
        const id = req.body.id_estudiante;
        const ruta = './documentos/capstone-profesor/'+req.body.ruta;

        const informeNew = await InformePractica.create({
            
            ruta: ruta,
            id_estudiante:  id
        })

        return res.status(200).json({ok: true, msg: 'Se ha almacenado el informe exitosamente.'})

    } catch (error) {
        return res.json({ok: false, msg: error.msg})
    }

  }