import { Router } from 'express';
import { check } from 'express-validator';
import { getUsers, createUser, loginUser } from  '../controllers/user.controller.js';
import { createEstudiante } from '../controllers/estudiante.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();


router.get('/users', getUsers);

router.post('/users', createUser);


router.post('/estudiantes', createEstudiante);


router.post('/', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 4}),
    validarCampos
], loginUser);

export default router;