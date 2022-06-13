import { Router } from 'express';
import { check } from 'express-validator';
import { getUsers, createUser, loginUser, revalidarToken, deleteUser, updateUser, getUsuarioPorId, getUsuarioPorRut, olvidePassword, crearNuevoPassword } from  '../controllers/user.controller.js';
import { createEstudiante, getEstudiantePorId } from '../controllers/estudiante.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { createAdmin } from '../controllers/admin.controller.js';
import { createProfesorGuiaCP, getProfesorGuiaCPPorId } from '../controllers/profesorGuiaCP.controller.js';
import { createProfesorComisionCorreccion, getProfesorCCPorId } from '../controllers/profesorComisionCorreccion.controller.js'
import { createEncargadoPractica } from '../controllers/encargadoPractica.controller.js';
import { createEncargadoEmpresa } from '../controllers/encargadoEmpresa.controller.js';
import { createComisionPracticaTitulacion } from '../controllers/comisionPracticaTitulacion.controller.js';
import { createAsistenteAcademica } from '../controllers/asistenteAcademica.controller.js';
import { createEmpresa } from '../controllers/empresa.controller.js';

const router = Router();


// AUTH
router.post('/auth', loginUser);
router.get('/auth/renew', validarJWT, revalidarToken);
// forgot password
router.put('/auth/forgot-password', olvidePassword );

router.put('/auth/new-password/:resetToken', crearNuevoPassword);


// Empresa
router.post('/empresas', createEmpresa);

// Encargado Empresa
router.post('/encargado-empresas', createEncargadoEmpresa)

// Admin
router.post('/admins', createAdmin);

// AsistenteAcademica
router.post('/asistenteAcademicas', createAsistenteAcademica);

// ComisionPracticaTitulacion
router.post('/comisionTitulacionPracticas', createComisionPracticaTitulacion);

// EncargadoEmpresa
router.post('/encargadoEmpresas', createEncargadoEmpresa);

// EncargadoPractica
router.post('/encargadoPracticaCPs', createEncargadoPractica)

// Estudiantes
router.post('/estudiantes', createEstudiante);
router.get('/estudiantes:id', getEstudiantePorId);

// ProfesorCC
router.post('/profesorCCs', createProfesorComisionCorreccion)
router.get('/profesorCCs:id', getProfesorCCPorId);


// ProfesorGuiaCP
router.post('/profesorGuiaCPs', createProfesorGuiaCP)
router.get('/profesorGuiaCPs:id', getProfesorGuiaCPPorId)

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

export default router;