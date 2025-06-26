const express = require('express');
const router = express.Router();
const listaController = require('../controllers/listaController');

router.post('/', listaController.criarLista);
router.get('/', listaController.obterListas);
router.put('/:id', listaController.atualizarLista);
router.delete('/:id', listaController.deletarLista);

module.exports = router;
