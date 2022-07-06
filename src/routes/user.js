import { Router } from 'express';
import { check } from 'express-validator';
import multer from 'multer';
import util from 'util';
import fs from 'fs';

import { getUsers, createUser, loginUser, revalidarToken, deleteUser, updateUser, getUsuarioPorId, getUsuarioPorRut, olvidePassword, crearNuevoPassword } from  '../controllers/user.controller.js';
import { createEstudiante, deleteEstudiante, deleteEstudiantePorIdUsuario, getEstudiantePorId, updateEstudiantePorId } from '../controllers/estudiante.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { createAdmin, deleteAdminPorId } from '../controllers/admin.controller.js';
import { createProfesorGuiaCP, deleteProfesorGuiaCPPorIdUsuario, getProfesorGuiaCPPorIdUsuario, updateProfesorGuiaPorId } from '../controllers/profesorGuiaCP.controller.js';
import { createProfesorComisionCorreccion, deleteProfesorCCPorIdUsuario, getProfesorCCPorIdUsuario, updateProfesorCCPorId } from '../controllers/profesorComisionCorreccion.controller.js'
import { createEncargadoPractica, deleteEncargadoPracticaPorIdUsuario } from '../controllers/encargadoPractica.controller.js';
import { createEncargadoEmpresa, deleteEncargadoEmpresaPorIdUsuario, getEncargadoEmpresa, getEncargadoEmpresaPorIdUsuario, updateEncargadoEmpresaPorId } from '../controllers/encargadoEmpresa.controller.js';
import { createComisionPracticaTitulacion, deleteComisionPracticaTitulacionPorIdUsuario, getComisionPorId, updateComisionPracticaTitulacionPorId } from '../controllers/comisionPracticaTitulacion.controller.js';
import { createAsistenteAcademica, deleteAsistenteAcademicaPorId } from '../controllers/asistenteAcademica.controller.js';
import { createEmpresa, getEmpresa, getEmpresaPorRut, getEmpresasSolicitadoEstudiante } from '../controllers/empresa.controller.js';
import { createSolicitudEstudiante, getListaVacantes, getSolicitudesEstudiante, getSolicitudesEstudianteTabla, getSolicitudEstudiante, updateSolicitudEstudiante } from '../controllers/documentos/solicitudEstudiante.controller.js';
import { createEmpresa, getEmpresa, getEmpresaPorRut } from '../controllers/empresa.controller.js';
import { createSolicitudEstudiante, getSolicitudesEstudiante, getSolicitudesEstudianteTabla, getSolicitudEstudiante, updateSolicitudEstudiante } from '../controllers/documentos/solicitudEstudiante.controller.js';

import { storagePractica, storageCapstone, storageDocPracticaEstudiante, getListFilesDocPE, deleteFileDocPE, downloadDocPE, storageDocCapstoneEstudiante, getListFilesDocCE, deleteFileDocCE, downloadDocCE,storageDocPracticaProfesor,getListFilesDocPP,deleteFileDocPP,downloadDocPP, storageDocCapstoneProfesor,getListFilesDocCP,deleteFileDocCP,downloadDocCP,storageInformePractica,getListFilesInformeEstudiante,deleteFileInformeEstudiante,downloadInformeEstudiante } from '../controllers/documentos/documentos.controllers.js';
import { createEmpresa, getEmpresa, getEmpresaPorRut, getEmpresasSolicitadoEstudiante } from '../controllers/empresa.controller.js';
import { createSolicitudEstudiante, getListaVacantes, getSolicitudesEstudiante, getSolicitudesEstudianteTabla, getSolicitudEstudiante, updateSolicitudEstudiante } from '../controllers/documentos/solicitudEstudiante.controller.js';
import { createPublicacion, deletePublicacion, getPublicacion, getPublicaciones, updatePublicacion } from '../controllers/documentos/publicacion.controller.js';
import { autorizarSolicitudCartaVacante, createSolicitudCartaVacante, dejarPendienteSolicitudCartaVacante, enviarCorreoCartaVacantePendiente, getListaCartaVacantes, getSolicitudCartaVacante, getSolicitudesCartaVacante, reprobarSolicitudCartaVacante } from '../controllers/documentos/solicitudCartaVacante.controller.js';

const router = Router();


// AUTH
router.post('/auth', loginUser);
router.get('/auth/renew', validarJWT, revalidarToken);
// forgot password
router.put('/auth/forgot-password', olvidePassword );
// change password
router.put('/auth/new-password/:resetToken', crearNuevoPassword);


// Empresa
router.post('/empresas', createEmpresa);
router.get('/empresas:id', getEmpresa);
router.get('/empresas/:rut', getEmpresaPorRut);
router.get('/emp-solicitado-estudiante', getEmpresasSolicitadoEstudiante)


// EncargadoEmpresa
router.post('/encargadoEmpresas', createEncargadoEmpresa);
router.get('/encargadoEmpresas/:id', getEncargadoEmpresaPorIdUsuario);
router.get('/encargadoEmpresas:id', getEncargadoEmpresa );
router.patch('/encargadoEmpresas', updateEncargadoEmpresaPorId);
router.delete('/encargadoEmpresas:id', deleteEncargadoEmpresaPorIdUsuario);

// Encargado Empresa
// router.post('/encargado-empresas', createEncargadoEmpresa);
// router.delete('/encargado-empresas:id', deleteEncargadoEmpresaPorIdUsuario)

// Admin
router.post('/admins', createAdmin);
router.delete('/admins:id', deleteAdminPorId);

// AsistenteAcademica
router.post('/asistenteAcademicas', createAsistenteAcademica);
router.delete('/asistenteAcademicas:id', deleteAsistenteAcademicaPorId);

// ComisionPracticaTitulacion
router.post('/comisionTitulacionPracticas', createComisionPracticaTitulacion);
router.patch('/comisionTitulacionPracticas', updateComisionPracticaTitulacionPorId);
router.delete('/comisionTitulacionPracticas:id', deleteComisionPracticaTitulacionPorIdUsuario);
router.get('/comisionTitulacionPracticas:id', getComisionPorId);

// EncargadoPractica
router.post('/encargadoPracticaCPs', createEncargadoPractica);
router.delete('/encargadoPracticaCPs:id', deleteEncargadoPracticaPorIdUsuario);

// Estudiantes
router.post('/estudiantes', createEstudiante);
router.get('/estudiantes/:id', getEstudiantePorId);
// router.delete('/estudiantes:id', deleteEstudiante);
router.patch('/estudiantes', updateEstudiantePorId);
router.delete('/estudiantes:id', deleteEstudiantePorIdUsuario);

// ProfesorCC
router.post('/profesorCCs', createProfesorComisionCorreccion)
router.get('/profesorCCs/:id', getProfesorCCPorIdUsuario);
router.patch('/profesorCCs', updateProfesorCCPorId);
router.delete('/profesorCCs:id', deleteProfesorCCPorIdUsuario);


// ProfesorGuiaCP
router.post('/profesorGuiaCPs', createProfesorGuiaCP)
router.get('/profesorGuiaCPs/:id', getProfesorGuiaCPPorIdUsuario)
router.patch('/profesorGuiaCPs', updateProfesorGuiaPorId)
router.delete('/profesorGuiaCPs:id', deleteProfesorGuiaCPPorIdUsuario)

// Usuarios
router.get('/users', getUsers);
router.post('/users', createUser);
router.delete('/users:id', deleteUser);
router.patch('/users:id', updateUser);
router.get('/users:id', getUsuarioPorId);
router.get('/users/rut:rut', getUsuarioPorRut);

//Archivos 
//contenido práctica
const uploadPractica = multer({storage:storagePractica})
router.post('/upload-contenido/practica',uploadPractica.single('myFile'),(req,res)=>{
     res.send({data:'OK'})
});
//contenido capstone
const uploadCapstone = multer({storage:storageCapstone})
router.post('/upload-contenido/capstone',uploadCapstone.single('myFile'),(req,res)=>{
    res.send({data:'OK'})
});
//----------------------------------------------------subir Doc practica Estudiante
const uploadDocPracticaEstudiante = multer({storage:storageDocPracticaEstudiante})
router.post('/upload-doc/practica-estudiante',uploadDocPracticaEstudiante.single('myFile'),(req,res)=>{
    res.send({data:'OK'})
});
//ver archivos practica Estudiante
router.get('/doc/practica-estudiante', getListFilesDocPE);
//descargar doc practica Estudiante
router.post('/download-doc/practica-estudiante',downloadDocPE);
//Eliminar documento practica estudiante
router.post('/delete-doc/practica-estudiante',deleteFileDocPE);

//------------------------------------------------------Subir Doc capstone estudiante
const uploadDocCapstoneEstudiante = multer({storage:storageDocCapstoneEstudiante})
router.post('/upload-doc/capstone-estudiante',uploadDocCapstoneEstudiante.single('myFile'),(req,res)=>{
    res.send({data:'OK'})
});
//ver archivos practica Estudiante
router.get('/doc/capstone-estudiante', getListFilesDocCE);
//descargar doc practica Estudiante
router.post('/download-doc/capstone-estudiante',downloadDocCE);
//Eliminar documento practica estudiante
router.post('/delete-doc/capstone-estudiante',deleteFileDocCE);

//------------------------------------------------------Subir Doc practica profesor
const uploadDocPracticaProfesor = multer({storage:storageDocPracticaProfesor})
router.post('/upload-doc/practica-profesor',uploadDocPracticaProfesor.single('myFile'),(req,res)=>{
    res.send({data:'OK'})
});
//ver archivos practica Estudiante
router.get('/doc/practica-profesor', getListFilesDocPP);
//descargar doc practica Estudiante
router.post('/download-doc/practica-profesor',downloadDocPP);
//Eliminar documento practica estudiante
router.post('/delete-doc/practica-profesor',deleteFileDocPP);

//------------------------------------------------------Subir Doc capstone profesor
const uploadDocCapstoneProfesor = multer({storage:storageDocCapstoneProfesor})
router.post('/upload-doc/capstone-profesor',uploadDocCapstoneProfesor.single('myFile'),(req,res)=>{
    res.send({data:'OK'})
});
//ver archivos practica profesor
router.get('/doc/capstone-profesor', getListFilesDocCP);
//descargar doc practica profesor
router.post('/download-doc/capstone-profesor',downloadDocCP);
//Eliminar documento practica profesor
router.post('/delete-doc/capstone-profesor',deleteFileDocCP);
//------

router.post('/', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 4}),
    validarCampos
], loginUser);


// DOCUMENTOS
// solicitud estudiante
router.post('/solicitud-estudiantes', createSolicitudEstudiante)
router.patch('/solicitud-estudiantes:id', updateSolicitudEstudiante)
router.get('/solicitud-estudiantes', getSolicitudesEstudiante)
router.get('/solicitud-estudiantes/tabla', getSolicitudesEstudianteTabla )
router.get('/solicitud-estudiantes:id', getSolicitudEstudiante)
router.get('/lista-vacantes', getListaVacantes)

// publicacion 
router.post('/publicaciones', createPublicacion)
router.get('/publicaciones', getPublicaciones)
router.get('/publicaciones:id', getPublicacion)
router.delete('/publicaciones:id', deletePublicacion)
router.patch('/publicaciones:id', updatePublicacion)

// solicitud carta vacante
router.post('/solicitud-carta-vacantes', createSolicitudCartaVacante)
router.get('/solicitud-carta-vacantes', getSolicitudesCartaVacante)
router.get('/solicitud-carta-vacantes:id', getSolicitudCartaVacante)
router.get('/lista-carta-vacante', getListaCartaVacantes)
router.post('/correo-carta-vacante', enviarCorreoCartaVacantePendiente )
router.patch('/aprobar-solicitud-carta-vacante:id', autorizarSolicitudCartaVacante)
router.patch('/reprobar-solicitud-carta-vacante:id', reprobarSolicitudCartaVacante)
router.patch('/pendiente-solicitud-carta-vacante:id', dejarPendienteSolicitudCartaVacante)


//INFORME
//subir informe de práctica estudiante
const uploadInformeEstudiante = multer({storage:storageInformePractica})
router.post('/upload-informe/informe-estudiante',uploadInformeEstudiante.single('myFile'),(req,res)=>{
    res.send({data:'OK'})
});
//ver informes de práctica estudiante
router.get('/get-informe/informe-estudiante', getListFilesInformeEstudiante);
//descargar informe de práctica estudiante
router.post('/download-informe/informe-estudiante',downloadInformeEstudiante);
//Eliminar informe de práctica estudiante
router.post('/delete-informe/informe-estudiante',deleteFileInformeEstudiante);

// solicitud carta vacante
router.post('/solicitud-carta-vacantes', createSolicitudCartaVacante)
router.get('/solicitud-carta-vacantes', getSolicitudesCartaVacante)
router.get('/solicitud-carta-vacantes:id', getSolicitudCartaVacante)
router.get('/lista-carta-vacante', getListaCartaVacantes)
router.post('/correo-carta-vacante', enviarCorreoCartaVacantePendiente )
router.patch('/aprobar-solicitud-carta-vacante:id', autorizarSolicitudCartaVacante)
router.patch('/reprobar-solicitud-carta-vacante:id', reprobarSolicitudCartaVacante)
router.patch('/pendiente-solicitud-carta-vacante:id', dejarPendienteSolicitudCartaVacante)


export default router;