const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.criarItem);
router.get('/', itemController.obterItens);
router.put('/:id', itemController.atualizarItem);
router.delete('/:id', itemController.deletarItem);

module.exports = router;
