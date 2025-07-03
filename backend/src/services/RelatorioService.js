const db = require('../config/db');
const logger = require('../utils/logger');

module.exports = {
  async produtosMaisVendidos() {
    try {
      const [rows] = await db.query(`
                SELECT 
                    p.id,
                    p.nome,
                    COALESCE(SUM(s.quantidade), 0) as quantidadeVendida
                FROM produtos p
                LEFT JOIN saidas s ON p.id = s.produto_id
                GROUP BY p.id, p.nome
                ORDER BY quantidadeVendida DESC
                LIMIT 10
            `);
      return rows;
    } catch (error) {
      logger.error('Error in produtosMaisVendidos', { error: error.message });
      throw error;
    }
  },

  async estoqueBaixo() {
    try {
      const [rows] = await db.query(`
                SELECT 
                    p.id,
                    p.nome,
                    p.quantidade,
                    COALESCE(p.estoque_minimo, 10) as estoqueMinimo
                FROM produtos p
                WHERE p.quantidade <= COALESCE(p.estoque_minimo, 10)
                ORDER BY p.quantidade ASC
            `);
      return rows;
    } catch (error) {
      logger.error('Error in estoqueBaixo', { error: error.message });
      throw error;
    }
  },

  async produtosPorCategoria() {
    try {
      const [rows] = await db.query(`
                SELECT 
                    c.nome,
                    COUNT(p.id) as quantidade
                FROM categorias c
                LEFT JOIN produtos p ON c.id = p.categoria_id
                GROUP BY c.id, c.nome
                ORDER BY quantidade DESC
            `);
      return rows;
    } catch (error) {
      logger.error('Error in produtosPorCategoria', { error: error.message });
      throw error;
    }
  },

  async valorTotalEstoque() {
    try {
      const [rows] = await db.query(`
                SELECT 
                    SUM(p.quantidade * p.preco) as valorTotal,
                    COUNT(p.id) as totalProdutos,
                    COUNT(CASE WHEN p.quantidade = 0 THEN 1 END) as produtosSemEstoque,
                    COUNT(CASE WHEN p.quantidade <= COALESCE(p.estoque_minimo, 10) THEN 1 END) as produtosEstoqueBaixo
                FROM produtos p
            `);
      return rows[0];
    } catch (error) {
      logger.error('Error in valorTotalEstoque', { error: error.message });
      throw error;
    }
  },

  async resumoGeral() {
    try {
      const [rows] = await db.query(`
                SELECT 
                    COUNT(p.id) as totalProdutos,
                    COUNT(CASE WHEN p.quantidade = 0 THEN 1 END) as produtosSemEstoque,
                    COUNT(CASE WHEN p.quantidade <= COALESCE(p.estoque_minimo, 10) THEN 1 END) as produtosEstoqueBaixo,
                    SUM(p.quantidade * p.preco) as valorTotalEstoque,
                    COUNT(DISTINCT c.id) as totalCategorias
                FROM produtos p
                LEFT JOIN categorias c ON p.categoria_id = c.id
            `);
      return rows[0];
    } catch (error) {
      logger.error('Error in resumoGeral', { error: error.message });
      throw error;
    }
  }
};
