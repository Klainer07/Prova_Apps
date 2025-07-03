const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, itemController.criarItem);
router.get('/', authMiddleware, itemController.obterItens);
router.put('/:id', authMiddleware, itemController.atualizarItem);
router.delete('/:id', authMiddleware, itemController.deletarItem);

module.exports = router;
