const db = require('../config/db');
const logger = require('../utils/logger');

module.exports = {
    async listar() {
        try {
            // Buscar entradas
            const [entradas] = await db.query(`
                SELECT 
                    e.id,
                    e.produto_id,
                    p.nome as produto_nome,
                    e.quantidade,
                    e.data,
                    'entrada' as tipo
                FROM entradas e
                JOIN produtos p ON e.produto_id = p.id
                ORDER BY e.data DESC
            `);

            // Buscar saídas
            const [saidas] = await db.query(`
                SELECT 
                    s.id,
                    s.produto_id,
                    p.nome as produto_nome,
                    s.quantidade,
                    s.data,
                    'saida' as tipo
                FROM saidas s
                JOIN produtos p ON s.produto_id = p.id
                ORDER BY s.data DESC
            `);

            // Combinar e ordenar por data
            const movimentos = [...entradas, ...saidas].sort((a, b) => new Date(b.data) - new Date(a.data));

            return movimentos;
        } catch (error) {
            logger.error('Error in listar movimentos', { error: error.message });
            throw error;
        }
    },

    async registrarEntrada({ produto_id, quantidade }) {
        try {
            // Verificar se o produto existe
            const [produtoCheck] = await db.query('SELECT id, quantidade FROM produtos WHERE id = ?', [produto_id]);
            if (produtoCheck.length === 0) {
                throw new Error('Produto não encontrado');
            }

            // Inserir registro de entrada
            const [entradaResult] = await db.query(`
        INSERT INTO entradas (produto_id, quantidade, data)
        VALUES (?, ?, NOW())
      `, [produto_id, quantidade]);

            // Atualizar quantidade do produto
            await db.query(`
        UPDATE produtos SET quantidade = quantidade + ?
        WHERE id = ?
      `, [quantidade, produto_id]);

            // Obter nova quantidade
            const [novaQuantidade] = await db.query('SELECT quantidade FROM produtos WHERE id = ?', [produto_id]);

            return {
                id: entradaResult.insertId,
                produto_id,
                quantidade,
                nova_quantidade: novaQuantidade[0].quantidade
            };
        } catch (error) {
            logger.error('Error in registrarEntrada', { produto_id, quantidade, error: error.message });
            throw error;
        }
    },

    async registrarSaida({ produto_id, quantidade }) {
        try {
            // Verificar se o produto existe e tem estoque suficiente
            const [produtoCheck] = await db.query('SELECT id, quantidade FROM produtos WHERE id = ?', [produto_id]);
            if (produtoCheck.length === 0) {
                throw new Error('Produto não encontrado');
            }

            if (produtoCheck[0].quantidade < quantidade) {
                throw new Error('Quantidade insuficiente em estoque');
            }

            // Inserir registro de saída
            const [saidaResult] = await db.query(`
        INSERT INTO saidas (produto_id, quantidade, data)
        VALUES (?, ?, NOW())
      `, [produto_id, quantidade]);

            // Atualizar quantidade do produto
            await db.query(`
        UPDATE produtos SET quantidade = quantidade - ?
        WHERE id = ?
      `, [quantidade, produto_id]);

            // Obter nova quantidade
            const [novaQuantidade] = await db.query('SELECT quantidade FROM produtos WHERE id = ?', [produto_id]);

            return {
                id: saidaResult.insertId,
                produto_id,
                quantidade,
                nova_quantidade: novaQuantidade[0].quantidade
            };
        } catch (error) {
            logger.error('Error in registrarSaida', { produto_id, quantidade, error: error.message });
            throw error;
        }
    }
};
