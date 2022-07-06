import { SolicitudCartaVacante } from "../../models/documentos/SolicitudCartaVacante.js";
import { SolicitudEstudiante } from "../../models/documentos/SolicitudEstudiante.js";
import { Empresa } from "../../models/Empresa.js";
import { Estudiante } from "../../models/Estudiante.js";
import { EncargadoEmpresa } from "../../models/EncargadoEmpresa.js";
import { Usuario } from "../../models/Usuario.js";
import {transporter} from '../../middlewares/mailer.js'

export const createSolicitudCartaVacante = async (req, res) =>{

    try {
        
        console.log(' body crear solicitud carta vacante ',req.body);

        const { periodoRealizar, anioRealizar, ciudadRealizar,
            //  id_empresa,
              id_solicitudEstudiante, id_estudiante } = req.body.solicitud;

        // const solicitud = await SolicitudCartaVacante.findOne({
        //     where: {
        //         asunto: asunto
        //     }
        // })

        // if(solicitud){
        //     return res.status(400).json({
        //         ok: false,
        //         msg: 'No se pudo registrar esta solicitud, debido a que ese nombre de proyecto ya existe.'
        //     })
        // }

        const newSolicitud = await SolicitudCartaVacante.create({
            periodoRealizar, anioRealizar, ciudadRealizar, estado: 'pendiente',
            // id_empresa,
             id_solicitudEstudiante, id_estudiante
        })

        return res.status(200).json({
            ok: true,
            msg: 'Solicitud de carta de vacante registrada'
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: error.message
        })
    }

}

export const getSolicitudesCartaVacante = async (req, res) => {
    const solicitudes = await SolicitudCartaVacante.findAll();
    res.json(solicitudes)
}

export const getListaCartaVacantes = async (req, res) => {

    // console.log('HOLA BRO')

    const solicitudes = await SolicitudCartaVacante.findAll();

    let datos = [];

    for(let i=0; i<solicitudes.length ;i++){
        const solicitudEstudiante = await SolicitudEstudiante.findByPk(solicitudes[i].id_solicitudEstudiante)

        const encargado = await EncargadoEmpresa.findByPk(solicitudEstudiante.id_encargadoEmpresa);

        const usuarioEncargado = await Usuario.findOne({
            where: {
                id: encargado.id_usuario
            }
        })
        // console.log(encargado);
        const empresa = await Empresa.findByPk(encargado.id_empresa);

        const estudiante = await Estudiante.findByPk(solicitudes[i].id_estudiante);

        // console.log('HOLA ')

        const usuarioEstudiante = await Usuario.findOne({
            where: {
                id: estudiante.id_usuario
            }
        })
        
         datos.push({
            id_solicitudEstudiante: solicitudes[i].id_solicitudEstudiante,
            estado: solicitudes[i].estado,
            nombreEmpresa: empresa.nombreEmpresa, 
            rutEmpresa: empresa.rutEmpresa,
            giroEmpresa: empresa.giroEmpresa,
            nombreProyecto: solicitudEstudiante.nombreProyecto,
            cargoEncargado: encargado.cargo,
            correoEncargado: usuarioEncargado.correo,
            telefonoEncargado: encargado.telefono,
            nombreEncargado: usuarioEncargado.nombre,
            apellidoEncargado: usuarioEncargado.apellidop,
            rutEstudiante: usuarioEstudiante.rut,
            nombreEstudiante: usuarioEstudiante.nombre,
            apellidoEstudiante: usuarioEstudiante.apellidop
        })
    }

    //  console.log(datos)

    res.json(datos)
}

export const getSolicitudCartaVacante = async (req, res) => {
    try {
    console.log(req.params)
    const id = req.params.id
    const solicitud = await SolicitudCartaVacante.findByPk(id);
    res.json({ok: true, solicitud: solicitud})
        
    } catch (error) {
        res.json({ok: false, msg: error.message})
    }
}

export const enviarCorreoCartaVacantePendiente = async (req, res) =>{
    try {

        const correoEnviar = req.body.correo;

        await transporter.sendMail({
         from: '"Sistema Capis - DEPARTAMENTO DE INGENIERÍA EN SISTEMAS Y COMPUTACIÓN - UNIVERSIDAD CATÓLICA DEL NORTE" <walter.sierra.vega@gmail.com>', // sender address
         to: correoEnviar, // list of receivers
         subject: "Solicitud de vacante para práctica preprofesional pendiente.", // Subject line
         text: "Se ha enviado una carta de solicitud de vacante para realizar la práctica pre-profesional de un estudiante del DISC.", // plain text body
         html: `Se ha enviado una carta de solicitud de vacante para realizar la práctica pre-profesional de un estudiante del DISC.
         <br><b> Por favor, ingrese al Sistema CAPIS, una vez allí: Inicie sesión => Acceda a la opción 'Responder carta de solicitud de vacante'. </b>
    
           <p>
                       Departamento de Ingeniería de Sistemas y Computación
                       <br>
                       Universidad Católica del Norte
                       <br>
                       Fono: +56 55 2355136
                       <br>
                       Angamos 0610, Pabellón Y-1
                       <br>
                       Antofagasta, Chile.
                   </p>
         `, // html body
       });
       
       res.json({ok: true, message: 'Se ha enviado el correo exitosamente'})
     } catch (error2) {
       res.json({ok: false, message: 'Ha ocurrido un error'})
     }
}

export const autorizarSolicitudCartaVacante = async (req, res) =>{
    const id_solicitudCartaVacante = req.params;

    const solicitud = await SolicitudCartaVacante.findByPk(id_solicitudCartaVacante);

    solicitud.estado = 'aprobado';
    solicitud.save();

    return res.json({ok: true, message: 'Se ha autorizado la solicitud.'})

}

export const reprobarSolicitudCartaVacante = async (req, res) =>{
    const id_solicitudCartaVacante = req.params;

    const solicitud = await SolicitudCartaVacante.findByPk(id_solicitudCartaVacante);

    solicitud.estado = 'reprobado';
    solicitud.save();

    return res.json({ok: true, message: 'Se ha reprobado la solicitud.'})

}

export const dejarPendienteSolicitudCartaVacante = async (req, res) =>{
    const id_solicitudCartaVacante = req.params;

    const solicitud = await SolicitudCartaVacante.findByPk(id_solicitudCartaVacante);

    solicitud.estado = 'pendiente';
    solicitud.save();

    return res.json({ok: true, message: 'Se ha dejado pendiente la solicitud.'})

}


