const ProdutoService = require('../services/ProdutoService');
const logger = require('../utils/logger');

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Produto:
//  *       type: object
//  *       required:
//  *         - nome
//  *         - quantidade
//  *         - preco
//  *         - categoria_id
//  *       properties:
//  *         id:
//  *           type: integer
//  *           description: ID único do produto
//  *         nome:
//  *           type: string
//  *           description: Nome do produto
//  *         quantidade:
//  *           type: integer
//  *           minimum: 0
//  *           description: Quantidade em estoque
//  *         preco:
//  *           type: number
//  *           format: float
//  *           description: Preço do produto
//  *         categoria:
//  *           type: string
//  *           description: Nome da categoria
//  */

// /**
//  * @swagger
//  * /api/produtos:
//  *   get:
//  *     summary: Listar todos os produtos
//  *     tags: [Produtos]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: Lista de produtos
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Produto'
//  */
module.exports = {
    async listar(req, res, next) {
        try {
            const produtos = await ProdutoService.listar();
            logger.info('Products listed successfully', { count: produtos.length });
            res.json(produtos);
        } catch (error) {
            logger.error('Error listing products', { error: error.message });
            next(error);
        }
    },

    async listarCategorias(req, res, next) {
        try {
            const categorias = await ProdutoService.listarCategorias();
            logger.info('Categories listed successfully', { count: categorias.length });
            res.json(categorias);
        } catch (error) {
            logger.error('Error listing categories', { error: error.message });
            next(error);
        }
    },

    // /**
    //  * @swagger
    //  * /api/produtos/{id}:
    //  *   get:
    //  *     summary: Obter produto por ID
    //  *     tags: [Produtos]
    //  *     security:
    //  *       - bearerAuth: []
    //  *     parameters:
    //  *       - in: path
    //  *         name: id
    //  *         required: true
    //  *         schema:
    //  *           type: integer
    //  *         description: ID do produto
    //  *     responses:
    //  *       200:
    //  *         description: Produto encontrado
    //  *         content:
    //  *           application/json:
    //  *             schema:
    //  *               $ref: '#/components/schemas/Produto'
    //  *       404:
    //  *         description: Produto não encontrado
    //  */
    async obter(req, res, next) {
        try {
            const produto = await ProdutoService.obter(req.params.id);
            if (!produto) {
                logger.warn('Product not found', { id: req.params.id });
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            res.json(produto);
        } catch (error) {
            logger.error('Error getting product', { id: req.params.id, error: error.message });
            next(error);
        }
    },

    // /**
    //  * @swagger
    //  * /api/produtos:
    //  *   post:
    //  *     summary: Criar novo produto
    //  *     tags: [Produtos]
    //  *     security:
    //  *       - bearerAuth: []
    //  *     requestBody:
    //  *       required: true
    //  *       content:
    //  *         application/json:
    //  *           schema:
    //  *             type: object
    //  *             required:
    //  *               - nome
    //  *               - quantidade
    //  *               - preco
    //  *               - categoria_id
    //  *             properties:
    //  *               nome:
    //  *                 type: string
    //  *               quantidade:
    //  *                 type: integer
    //  *                 minimum: 0
    //  *               preco:
    //  *                 type: number
    //  *                 format: float
    //  *               categoria_id:
    //  *                 type: integer
    //  *     responses:
    //  *       201:
    //  *         description: Produto criado com sucesso
    //  *       400:
    //  *         description: Dados inválidos
    //  */
    async criar(req, res, next) {
        try {
            const novo = await ProdutoService.criar(req.body);
            logger.info('Product created successfully', { id: novo.id, nome: novo.nome });
            res.status(201).json(novo);
        } catch (error) {
            logger.error('Error creating product', { error: error.message });
            next(error);
        }
    },

    // /**
    //  * @swagger
    //  * /api/produtos/{id}:
    //  *   put:
    //  *     summary: Atualizar produto
    //  *     tags: [Produtos]
    //  *     security:
    //  *       - bearerAuth: []
    //  *     parameters:
    //  *       - in: path
    //  *         name: id
    //  *         required: true
    //  *         schema:
    //  *           type: integer
    //  *     requestBody:
    //  *       required: true
    //  *       content:
    //  *         application/json:
    //  *           schema:
    //  *             type: object
    //  *             properties:
    //  *               nome:
    //  *                 type: string
    //  *               quantidade:
    //  *                 type: integer
    //  *                 minimum: 0
    //  *               preco:
    //  *                 type: number
    //  *                 format: float
    //  *               categoria_id:
    //  *                 type: integer
    //  *     responses:
    //  *       200:
    //  *         description: Produto atualizado com sucesso
    //  *       404:
    //  *         description: Produto não encontrado
    //  */
    async atualizar(req, res, next) {
        try {
            const atualizado = await ProdutoService.atualizar(req.params.id, req.body);
            if (!atualizado) {
                logger.warn('Product not found for update', { id: req.params.id });
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            logger.info('Product updated successfully', { id: req.params.id });
            res.json(atualizado);
        } catch (error) {
            logger.error('Error updating product', { id: req.params.id, error: error.message });
            next(error);
        }
    },

    // /**
    //  * @swagger
    //  * /api/produtos/{id}:
    //  *   delete:
    //  *     summary: Remover produto
    //  *     tags: [Produtos]
    //  *     security:
    //  *       - bearerAuth: []
    //  *     parameters:
    //  *       - in: path
    //  *         name: id
    //  *         required: true
    //  *         schema:
    //  *           type: integer
    //  *     responses:
    //  *       204:
    //  *         description: Produto removido com sucesso
    //  *       404:
    //  *         description: Produto não encontrado
    //  */
    async remover(req, res, next) {
        try {
            const removido = await ProdutoService.remover(req.params.id);
            if (!removido) {
                logger.warn('Product not found for deletion', { id: req.params.id });
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            logger.info('Product deleted successfully', { id: req.params.id });
            res.status(204).send();
        } catch (error) {
            logger.error('Error deleting product', { id: req.params.id, error: error.message });
            next(error);
        }
    }
};
