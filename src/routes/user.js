const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { getUsers, createUser, loginUser } = require ( '../controllers/user.controller');

router.get('/users', getUsers);
router.post('/users', createUser);
router.post('/', [check('correo', 'El correo es obligatorio')], loginUser);

module.exports = router;