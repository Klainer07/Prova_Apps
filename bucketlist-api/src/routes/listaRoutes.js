const express = require('express');
const router = express.Router();
const listaController = require('../controllers/listaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, listaController.criarLista);
router.get('/', authMiddleware, listaController.obterListas);
router.put('/:id', authMiddleware, listaController.atualizarLista);
router.delete('/:id', authMiddleware, listaController.deletarLista);

module.exports = router;
