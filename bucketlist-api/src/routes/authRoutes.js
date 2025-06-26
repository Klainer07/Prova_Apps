const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para login
router.post('/login', authController.login);

// Rota para registro (pode ser /register ou /registrar, escolha 1 e padronize)
router.post('/registrar', authController.registrar);

module.exports = router;
