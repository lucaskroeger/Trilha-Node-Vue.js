const MovimentoService = require('../../src/services/MovimentoService');

// Mock dependencies
jest.mock('../../src/config/db');
jest.mock('../../src/utils/logger');

const mockDb = require('../../src/config/db');

describe('MovimentoService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('registrarEntrada', () => {
        it('should register entrada successfully', async () => {
            // Arrange
            const movimentoData = {
                produto_id: 1,
                quantidade: 10
            };

            mockDb.query
                .mockResolvedValueOnce([[{ id: 1, quantidade: 5 }]]) // Product exists
                .mockResolvedValueOnce([{ insertId: 1 }]) // Insert entrada
                .mockResolvedValueOnce([{ affectedRows: 1 }]) // Update product quantity
                .mockResolvedValueOnce([[{ quantidade: 15 }]]); // Get new quantity

            // Act
            const result = await MovimentoService.registrarEntrada(movimentoData);

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(
                'SELECT id, quantidade FROM produtos WHERE id = ?',
                [1]
            );
            expect(mockDb.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO entradas'),
                [1, 10]
            );
            expect(mockDb.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE produtos SET quantidade = quantidade + ?'),
                [10, 1]
            );
            expect(result).toEqual({
                id: 1,
                produto_id: 1,
                quantidade: 10,
                nova_quantidade: 15
            });
        });

        it('should throw error for non-existent product', async () => {
            // Arrange
            const movimentoData = {
                produto_id: 999,
                quantidade: 10
            };

            mockDb.query.mockResolvedValueOnce([[]]); // Product doesn't exist

            // Act & Assert
            await expect(MovimentoService.registrarEntrada(movimentoData))
                .rejects.toThrow('Produto não encontrado');
        });
    });

    describe('registrarSaida', () => {
        it('should register saida successfully', async () => {
            // Arrange
            const movimentoData = {
                produto_id: 1,
                quantidade: 3
            };

            mockDb.query
                .mockResolvedValueOnce([[{ id: 1, quantidade: 10 }]]) // Product exists with sufficient stock
                .mockResolvedValueOnce([{ insertId: 1 }]) // Insert saida
                .mockResolvedValueOnce([{ affectedRows: 1 }]) // Update product quantity
                .mockResolvedValueOnce([[{ quantidade: 7 }]]); // Get new quantity

            // Act
            const result = await MovimentoService.registrarSaida(movimentoData);

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(
                'SELECT id, quantidade FROM produtos WHERE id = ?',
                [1]
            );
            expect(mockDb.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO saidas'),
                [1, 3]
            );
            expect(mockDb.query).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE produtos SET quantidade = quantidade - ?'),
                [3, 1]
            );
            expect(result).toEqual({
                id: 1,
                produto_id: 1,
                quantidade: 3,
                nova_quantidade: 7
            });
        });

        it('should throw error for non-existent product', async () => {
            // Arrange
            const movimentoData = {
                produto_id: 999,
                quantidade: 5
            };

            mockDb.query.mockResolvedValueOnce([[]]); // Product doesn't exist

            // Act & Assert
            await expect(MovimentoService.registrarSaida(movimentoData))
                .rejects.toThrow('Produto não encontrado');
        });

        it('should throw error for insufficient stock', async () => {
            // Arrange
            const movimentoData = {
                produto_id: 1,
                quantidade: 15
            };

            mockDb.query.mockResolvedValueOnce([[{ id: 1, quantidade: 10 }]]); // Product exists but insufficient stock

            // Act & Assert
            await expect(MovimentoService.registrarSaida(movimentoData))
                .rejects.toThrow('Quantidade insuficiente em estoque');
        });
    });
}); 