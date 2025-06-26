const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Aplica primeiro a autenticação e depois a autorização
router.get('/', authMiddleware, isAdmin, usuarioController.obterUsuarios);
router.put('/:id', authMiddleware, isAdmin, usuarioController.atualizarUsuario);
router.delete('/:id', authMiddleware, isAdmin, usuarioController.deletarUsuario);

module.exports = router;
