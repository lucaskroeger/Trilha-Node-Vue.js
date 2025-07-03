const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const auth = require('../middlewares/auth');
const { validate, schemas } = require('../middlewares/validation');

// /**
//  * @swagger
//  * tags:
//  *   name: Produtos
//  *   description: Endpoints de gerenciamento de produtos
//  */

router.get('/', auth(['admin', 'user']), ProdutoController.listar);
router.get('/categorias', auth(['admin', 'user']), ProdutoController.listarCategorias);
router.get('/:id', auth(['admin', 'user']), ProdutoController.obter);
router.post('/', auth(['admin']), validate(schemas.produto), ProdutoController.criar);
router.put('/:id', auth(['admin']), validate(schemas.produto), ProdutoController.atualizar);
router.delete('/:id', auth(['admin']), ProdutoController.remover);

module.exports = router;
