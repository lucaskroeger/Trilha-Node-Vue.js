const db = require('../config/db');
const logger = require('../utils/logger');

module.exports = {
  async listar() {
    try {
      const [rows] = await db.query(`
                SELECT p.id, p.nome, p.quantidade, p.preco, p.estoque_minimo, c.nome AS categoria, c.id AS categoria_id
                FROM produtos p
                JOIN categorias c ON p.categoria_id = c.id
                ORDER BY p.nome
            `);
      return rows;
    } catch (error) {
      logger.error('Database error in listar produtos', { error: error.message });
      throw error;
    }
  },

  async listarCategorias() {
    try {
      const [rows] = await db.query(`
                SELECT id, nome
                FROM categorias
                ORDER BY nome
            `);
      return rows;
    } catch (error) {
      logger.error('Database error in listar categorias', { error: error.message });
      throw error;
    }
  },

  async obter(id) {
    try {
      const [rows] = await db.query(`
                SELECT p.id, p.nome, p.quantidade, p.preco, p.estoque_minimo, c.nome AS categoria, c.id AS categoria_id
                FROM produtos p
                JOIN categorias c ON p.categoria_id = c.id
                WHERE p.id = ?
            `, [id]);
      return rows[0];
    } catch (error) {
      logger.error('Database error in obter produto', { id, error: error.message });
      throw error;
    }
  },

  async criar(dados) {
    try {
      const { nome, quantidade, preco, categoria_id, estoque_minimo } = dados;

      // Verificar se a categoria existe
      const [categoriaCheck] = await db.query('SELECT id FROM categorias WHERE id = ?', [categoria_id]);
      if (categoriaCheck.length === 0) {
        throw new Error('Categoria não encontrada');
      }

      const [result] = await db.query(`
                INSERT INTO produtos (nome, quantidade, preco, categoria_id, estoque_minimo)
                VALUES (?, ?, ?, ?, ?)
            `, [nome, quantidade, preco, categoria_id, estoque_minimo || 10]);

      return { id: result.insertId, ...dados };
    } catch (error) {
      logger.error('Database error in criar produto', { dados, error: error.message });
      throw error;
    }
  },

  async atualizar(id, dados) {
    try {
      const { nome, quantidade, preco, categoria_id, estoque_minimo } = dados;

      // Verificar se o produto existe
      const [produtoCheck] = await db.query('SELECT id FROM produtos WHERE id = ?', [id]);
      if (produtoCheck.length === 0) {
        return null;
      }

      // Verificar se a categoria existe
      if (categoria_id) {
        const [categoriaCheck] = await db.query('SELECT id FROM categorias WHERE id = ?', [categoria_id]);
        if (categoriaCheck.length === 0) {
          throw new Error('Categoria não encontrada');
        }
      }

      const [result] = await db.query(`
                UPDATE produtos SET nome = ?, quantidade = ?, preco = ?, categoria_id = ?, estoque_minimo = ?
                WHERE id = ?
            `, [nome, quantidade, preco, categoria_id, estoque_minimo || 10, id]);

      return result.affectedRows > 0 ? { id, ...dados } : null;
    } catch (error) {
      logger.error('Database error in atualizar produto', { id, dados, error: error.message });
      throw error;
    }
  },

  async remover(id) {
    try {
      // Verificar se o produto existe
      const [produtoCheck] = await db.query('SELECT id FROM produtos WHERE id = ?', [id]);
      if (produtoCheck.length === 0) {
        return false;
      }

      const [result] = await db.query(`DELETE FROM produtos WHERE id = ?`, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      logger.error('Database error in remover produto', { id, error: error.message });
      throw error;
    }
  }
};
