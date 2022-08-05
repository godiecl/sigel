import { SolicitudCartaVacante } from "../../models/documentos/SolicitudCartaVacante.js";
import { SolicitudEstudiante } from "../../models/documentos/SolicitudEstudiante.js";
import { Empresa } from "../../models/Empresa.js";
import { Estudiante } from "../../models/Estudiante.js";
import { EncargadoEmpresa } from "../../models/EncargadoEmpresa.js";
import { Usuario } from "../../models/Usuario.js";
import {transporter} from '../../middlewares/mailer.js';
import { Seguro } from "../../models/documentos/Seguro.js";

export const createSolicitudCartaVacante = async (req, res) =>{

    try {
        
        // console.log(' body crear solicitud carta vacante ',req.body);

        const { periodoRealizar, anioRealizar, ciudadRealizar,
            //  id_empresa,
              id_solicitudEstudiante, id_estudiante } = req.body.solicitud;

        const solicitud = await SolicitudCartaVacante.findOne({
            where: {
                id_estudiante: id_estudiante,
                periodoRealizar: periodoRealizar,
                anioRealizar: anioRealizar,
                id_solicitudEstudiante: id_solicitudEstudiante,
            }
        })

        if(solicitud){
            return res.json({
                ok: false,
                msg: 'No se pudo registrar esta solicitud, debido a que ya postulaste a esta empresa este periodo.'
            })
        }

        const newSolicitud = await SolicitudCartaVacante.create({
            periodoRealizar, anioRealizar, ciudadRealizar, estado: 'pendiente', estadoRespuesta: 'pendiente',
            // id_empresa,
             id_solicitudEstudiante, id_estudiante
        })

        return res.status(200).json({
            ok: true,
            msg: 'Solicitud de carta de vacante registrada'
        })

    } catch (error) {
        // console.log(error)
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

    // // console.log('HOLA BRO')

    try {

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
        // // console.log(encargado);
        const empresa = await Empresa.findByPk(encargado.id_empresa);

        const estudiante = await Estudiante.findByPk(solicitudes[i].id_estudiante);

        // // console.log('HOLA ')

        const usuarioEstudiante = await Usuario.findOne({
            where: {
                id: estudiante.id_usuario
            }
        })
        
         datos.push({
            id_solicitudEstudiante: solicitudes[i].id_solicitudEstudiante,
            id_solicitudCartaVacante: solicitudes[i].id_solicitudCartaVacante,
            periodoRealizar: solicitudes[i].periodoRealizar,
            anioRealizar: solicitudes[i].anioRealizar,
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

    //  // console.log(datos)

    return res.json({ok: true, datos: datos})
        
    } catch (error) {
        return res.json({ok: false, msg: error.message})
    }

    
}

export const getSolicitudCartaVacante = async (req, res) => {
    try {
    // to do: optimizar
    // // console.log(req.params)
    const id = req.params.id
    const solicitud = await SolicitudCartaVacante.findByPk(id);
    const estudiante = await Estudiante.findByPk(solicitud.id_estudiante);
    const usuario = await Usuario.findByPk(estudiante.id_usuario);
    const solicitudE = await SolicitudEstudiante.findByPk(solicitud.id_solicitudEstudiante);
    const encargado = await EncargadoEmpresa.findByPk(solicitudE.id_encargadoEmpresa)
    const empresa = await Empresa.findByPk(encargado.id_empresa);
    const nombreEmpresa = empresa.nombreEmpresa
   return res.json({ok: true, solicitud: solicitud, solicitudE: solicitudE, usuario: usuario, nombreEmpresa: nombreEmpresa, encargado: encargado})
        
    } catch (error) {
       return res.json({ok: false, msg: error.message})
    }
}

export const verSolicitudCartaVacante = async (req, res) => {
    try {
    // to do: optimizar
    // // console.log(req.params)
    const id = req.params.id
    const solicitud = await SolicitudCartaVacante.findByPk(id);
    const estudiante = await Estudiante.findByPk(solicitud.id_estudiante);
    const usuario = await Usuario.findByPk(estudiante.id_usuario);
    const solicitudE = await SolicitudEstudiante.findByPk(solicitud.id_solicitudEstudiante);
    const encargado = await EncargadoEmpresa.findByPk(solicitudE.id_encargadoEmpresa)
    const empresa = await Empresa.findByPk(encargado.id_empresa);
    const usuarioEnc = await Usuario.findByPk(encargado.id_usuario);
    const nombreEmpresa = empresa.nombreEmpresa
   return res.json({ok: true, 
    nombreEstudiante: usuario.nombre, apellidopEstudiante: usuario.apellidop, apellidomEstudiante: usuario.apellidom, 
    rutEstudiante: usuario.rut, carreraEstudiante: estudiante.carrera, nombreEmpresa: nombreEmpresa,
    nombreEncargado: usuarioEnc.nombre, apellidopEncargado: usuarioEnc.apellidop, apellidomEncargado: usuarioEnc.apellidom, 
    cargoEncargado: encargado.cargo, 
    })
        
    } catch (error) {
        return res.json({ok: false, msg: error.message})
    }
}

export const responderSolicitudCartaVacante = async (req, res) => {
    try {
    // to do: optimizar
    console.log('params:    ',req.params)
    console.log('body: ',req.body)
    const id = req.params.id
    const solicitud = await SolicitudCartaVacante.findByPk(id);
    const seguro = await Seguro.findOne({
        where: {
            id_estudiante: solicitud.id_estudiante,
            vigencia: 'activo'
        }
    })
    if(seguro){
        return res.status(400).json({
            ok: false,
            msg: 'No se puede responder esta solicitud, debido a que el estudiante ya esta rindiendo su práctica.'
        })
    }
    solicitud.fechaInicio = req.body.fechaInicio;
    solicitud.fechaFinal = req.body.fechaFinal;
    solicitud.estadoRespuesta = 'completada'
    solicitud.save();

    const newSeguro = await Seguro.create({
        id_estudiante: solicitud.id_estudiante,
        id_solicitudCartaVacante: solicitud.id_solicitudCartaVacante,
        estado: 'pendiente',
    })

   return res.json({ok: true, msg: 'Se ha respondido la carta y se ha creado el seguro.'})
    } catch (error) {
       return res.json({ok: false, msg: error.message})
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
       
       return res.json({ok: true, message: 'Se ha enviado el correo exitosamente'})
     } catch (error2) {
       return res.json({ok: false, message: 'Ha ocurrido un error'})
     }
}

export const autorizarSolicitudCartaVacante = async (req, res) =>{
    try {
        // console.log(req.params);
    const id_solicitudCartaVacante = req.params.id;

    const solicitud = await SolicitudCartaVacante.findByPk(id_solicitudCartaVacante);

    solicitud.estado = 'aprobado';
    solicitud.save();

    return res.json({ok: true, message: 'Se ha autorizado la solicitud.'})
    } catch (error) {
        return res.json({ok: false, message: error.message })
    }

}

export const reprobarSolicitudCartaVacante = async (req, res) =>{
    try {
        
    const id_solicitudCartaVacante = req.params.id;

    const solicitud = await SolicitudCartaVacante.findByPk(id_solicitudCartaVacante);

    solicitud.estado = 'reprobado';
    solicitud.save();

    return res.json({ok: true, message: 'Se ha reprobado la solicitud.'})
    } catch (error) {
        
        return res.json({ok: false, message: error.message })
    }

}

export const dejarPendienteSolicitudCartaVacante = async (req, res) =>{
    try {
    const id_solicitudCartaVacante = req.params.id;

    const solicitud = await SolicitudCartaVacante.findByPk(id_solicitudCartaVacante);

    solicitud.estado = 'pendiente';
    solicitud.save();

    return res.json({ok: true, message: 'Se ha dejado pendiente la solicitud.'})
        
    } catch (error) {
        return res.json({ok: false, message: error.message })
    }
    

}


export const getListaResponderCartaVacante = async (req, res)=>{

    try {
        // NOMBRE ESTUDIANTE, NOMBRE PROYECTO, PERIODO, ESTADO

    // console.log(req.params);

    const id_encargadoEmp = req.params.id;

    // // console.log(id_encargadoEmp)
    
    const solicitudes = await SolicitudEstudiante.findAll({
        where: {
            id_encargadoEmpresa: id_encargadoEmp
        }
    })

    // console.log('------------------------------------------')
    // console.log('lol ',solicitudes)

    let datos = [];

    for(let i=0; i<solicitudes.length ;i++){

        const solicitud = await SolicitudCartaVacante.findAll({
            where: {
                estado: 'aprobado',
                id_solicitudEstudiante: solicitudes[i].id_solicitudEstudiante
            }
        })
        // console.log('solicitudes carta vacante: ', solicitud);

        

        

        for(let j=0; j< solicitud.length; j++){
            const estudiante = await Estudiante.findByPk(solicitud[j].id_estudiante);
            const usuarioEstudiante = await Usuario.findOne({
                where: {
                    id: estudiante.id_usuario
                }
            })
            
             datos.push({
                id_solicitudCartaVacante: solicitud[j].id_solicitudCartaVacante,
                nombreProyecto: solicitudes[i].nombreProyecto,
                periodoRealizar: solicitud[j].periodoRealizar,
                anioRealizar: solicitud[j].anioRealizar,
                estadoRespuesta: solicitud[j].estadoRespuesta,
                nombreEstudiante: usuarioEstudiante.nombre,
                apellidopEstudiante: usuarioEstudiante.apellidop,
                apellidomEstudiante: usuarioEstudiante.apellidom,
            })
        }
        
        // console.log('estudiante', estudiante)

        // console.log('HOLA ')
        
    }

    // console.log(datos)

    return res.json({ok: true, datos: datos})
        
    } catch (error) {
    
        return res.json({ok: false, msg: error.message})
    }

}