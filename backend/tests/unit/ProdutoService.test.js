const ProdutoService = require('../../src/services/ProdutoService');

// Mock dependencies
jest.mock('../../src/config/db');
jest.mock('../../src/utils/logger');

const mockDb = require('../../src/config/db');

describe('ProdutoService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('listar', () => {
        it('should return list of products', async () => {
            // Arrange
            const mockProducts = [
                { id: 1, nome: 'Produto 1', quantidade: 10, preco: 25.50, categoria: 'Eletrônicos' },
                { id: 2, nome: 'Produto 2', quantidade: 5, preco: 15.00, categoria: 'Livros' }
            ];

            mockDb.query.mockResolvedValueOnce([mockProducts]);

            // Act
            const result = await ProdutoService.listar();

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(expect.stringContaining('SELECT p.id, p.nome'));
            expect(result).toEqual(mockProducts);
        });

        it('should handle database errors', async () => {
            // Arrange
            const dbError = new Error('Database connection failed');
            mockDb.query.mockRejectedValueOnce(dbError);

            // Act & Assert
            await expect(ProdutoService.listar()).rejects.toThrow('Database connection failed');
        });
    });

    describe('obter', () => {
        it('should return product by id', async () => {
            // Arrange
            const mockProduct = { id: 1, nome: 'Produto 1', quantidade: 10, preco: 25.50, categoria: 'Eletrônicos' };
            mockDb.query.mockResolvedValueOnce([[mockProduct]]);

            // Act
            const result = await ProdutoService.obter(1);

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(
                expect.stringContaining('SELECT p.id, p.nome'),
                [1]
            );
            expect(result).toEqual(mockProduct);
        });

        it('should return null for non-existent product', async () => {
            // Arrange
            mockDb.query.mockResolvedValueOnce([[]]);

            // Act
            const result = await ProdutoService.obter(999);

            // Assert
            expect(result).toBeUndefined();
        });
    });

    describe('criar', () => {
        it('should create product successfully', async () => {
            // Arrange
            const productData = {
                nome: 'Novo Produto',
                quantidade: 20,
                preco: 30.00,
                categoria_id: 1
            };

            mockDb.query
                .mockResolvedValueOnce([[{ id: 1 }]]) // Category exists
                .mockResolvedValueOnce([{ insertId: 3 }]); // Insert product

            // Act
            const result = await ProdutoService.criar(productData);

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(
                'SELECT id FROM categorias WHERE id = ?',
                [1]
            );
            expect(mockDb.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO produtos'),
                ['Novo Produto', 20, 30.00, 1]
            );
            expect(result).toEqual({
                id: 3,
                ...productData
            });
        });

        it('should throw error for non-existent category', async () => {
            // Arrange
            const productData = {
                nome: 'Novo Produto',
                quantidade: 20,
                preco: 30.00,
                categoria_id: 999
            };

            mockDb.query.mockResolvedValueOnce([[]]); // Category doesn't exist

            // Act & Assert
            await expect(ProdutoService.criar(productData)).rejects.toThrow('Categoria não encontrada');
        });
    });

    describe('atualizar', () => {
        it('should update product successfully', async () => {
            // Arrange
            const productData = {
                nome: 'Produto Atualizado',
                quantidade: 15,
                preco: 35.00,
                categoria_id: 2
            };

            mockDb.query
                .mockResolvedValueOnce([[{ id: 1 }]]) // Product exists
                .mockResolvedValueOnce([[{ id: 2 }]]) // Category exists
                .mockResolvedValueOnce([{ affectedRows: 1 }]); // Update successful

            // Act
            const result = await ProdutoService.atualizar(1, productData);

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(
                'SELECT id FROM produtos WHERE id = ?',
                [1]
            );
            expect(result).toEqual({
                id: 1,
                ...productData
            });
        });

        it('should return null for non-existent product', async () => {
            // Arrange
            const productData = { nome: 'Produto', quantidade: 10, preco: 20.00, categoria_id: 1 };
            mockDb.query.mockResolvedValueOnce([[]]); // Product doesn't exist

            // Act
            const result = await ProdutoService.atualizar(999, productData);

            // Assert
            expect(result).toBeNull();
        });

        it('should throw error for non-existent category', async () => {
            // Arrange
            const productData = { nome: 'Produto', quantidade: 10, preco: 20.00, categoria_id: 999 };

            mockDb.query
                .mockResolvedValueOnce([[{ id: 1 }]]) // Product exists
                .mockResolvedValueOnce([[]]); // Category doesn't exist

            // Act & Assert
            await expect(ProdutoService.atualizar(1, productData)).rejects.toThrow('Categoria não encontrada');
        });
    });

    describe('remover', () => {
        it('should delete product successfully', async () => {
            // Arrange
            mockDb.query
                .mockResolvedValueOnce([[{ id: 1 }]]) // Product exists
                .mockResolvedValueOnce([{ affectedRows: 1 }]); // Delete successful

            // Act
            const result = await ProdutoService.remover(1);

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(
                'SELECT id FROM produtos WHERE id = ?',
                [1]
            );
            expect(mockDb.query).toHaveBeenCalledWith(
                'DELETE FROM produtos WHERE id = ?',
                [1]
            );
            expect(result).toBe(true);
        });

        it('should return false for non-existent product', async () => {
            // Arrange
            mockDb.query.mockResolvedValueOnce([[]]); // Product doesn't exist

            // Act
            const result = await ProdutoService.remover(999);

            // Assert
            expect(result).toBe(false);
        });
    });
}); 