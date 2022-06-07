import { Router } from 'express';
import { check } from 'express-validator';
import { getUsers, createUser, loginUser, revalidarToken } from  '../controllers/user.controller.js';
import { createEstudiante } from '../controllers/estudiante.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { createAdmin } from '../controllers/admin.controller.js';

const router = Router();


// AUTH
router.post('/auth', loginUser);
router.get('/auth/renew', validarJWT, revalidarToken);

// Usuarios
router.get('/users', getUsers);
router.post('/users', createUser);

// Estudiantes
router.post('/estudiantes', createEstudiante);

// Admin
router.post('/admins', createAdmin)



router.post('/', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 4}),
    validarCampos
], loginUser);

export default router;