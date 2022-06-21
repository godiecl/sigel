import { Router } from 'express';
import { check } from 'express-validator';
import { getUsers, createUser, loginUser, revalidarToken, deleteUser, updateUser, getUsuarioPorId, getUsuarioPorRut, olvidePassword, crearNuevoPassword } from  '../controllers/user.controller.js';
import { createEstudiante, deleteEstudiante, deleteEstudiantePorIdUsuario, getEstudiantePorId, updateEstudiantePorId } from '../controllers/estudiante.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { createAdmin, deleteAdminPorId } from '../controllers/admin.controller.js';
import { createProfesorGuiaCP, deleteProfesorGuiaCPPorIdUsuario, getProfesorGuiaCPPorIdUsuario, updateProfesorGuiaPorId } from '../controllers/profesorGuiaCP.controller.js';
import { createProfesorComisionCorreccion, deleteProfesorCCPorIdUsuario, getProfesorCCPorIdUsuario, updateProfesorCCPorId } from '../controllers/profesorComisionCorreccion.controller.js'
import { createEncargadoPractica, deleteEncargadoPracticaPorIdUsuario } from '../controllers/encargadoPractica.controller.js';
import { createEncargadoEmpresa, deleteEncargadoEmpresaPorIdUsuario, getEncargadoEmpresaPorIdUsuario, updateEncargadoEmpresaPorId } from '../controllers/encargadoEmpresa.controller.js';
import { createComisionPracticaTitulacion, deleteComisionPracticaTitulacionPorIdUsuario, updateComisionPracticaTitulacionPorId } from '../controllers/comisionPracticaTitulacion.controller.js';
import { createAsistenteAcademica, deleteAsistenteAcademicaPorId } from '../controllers/asistenteAcademica.controller.js';
import { createEmpresa } from '../controllers/empresa.controller.js';
import { createSolicitudEstudiante } from '../controllers/documentos/solicitudEstudiante.controller.js';
import { createPublicacion } from '../controllers/documentos/publicacion.controller.js';

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

// EncargadoEmpresa
router.post('/encargadoEmpresas', createEncargadoEmpresa);
router.get('/encargadoEmpresas/:id', getEncargadoEmpresaPorIdUsuario);
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

router.post('/', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 4}),
    validarCampos
], loginUser);


// DOCUMENTOS
// solicitud estudiante
router.post('/solicitud-estudiantes', createSolicitudEstudiante)

// publicacion 
router.post('/publicaciones', createPublicacion)

export default router;