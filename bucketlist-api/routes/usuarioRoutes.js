const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');


router.post('/register', usuarioController.criarUsuario);
router.post('/login', usuarioController.login);

// coisa pra debug
router.get('/', usuarioController.obterUsuarios);
router.put('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;