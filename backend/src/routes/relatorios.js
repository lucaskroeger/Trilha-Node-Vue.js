const express = require('express');
const router = express.Router();
const RelatorioController = require('../controllers/RelatorioController');
const auth = require('../middlewares/auth');

router.get('/mais-vendidos', auth(['admin', 'user']), RelatorioController.produtosMaisVendidos);
router.get('/estoque-baixo', auth(['admin', 'user']), RelatorioController.estoqueBaixo);
router.get('/por-categoria', auth(['admin', 'user']), RelatorioController.produtosPorCategoria);
router.get('/valor-estoque', auth(['admin', 'user']), RelatorioController.valorTotalEstoque);
router.get('/resumo', auth(['admin', 'user']), RelatorioController.resumoGeral);

module.exports = router;
