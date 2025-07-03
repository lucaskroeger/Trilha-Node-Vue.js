const AuthService = require('../../src/services/AuthService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('../../src/config/db');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockDb = require('../../src/config/db');

describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should return JWT token for valid credentials', async () => {
            // Arrange
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                senha: 'hashedPassword',
                role: 'user'
            };

            mockDb.query.mockResolvedValueOnce([[mockUser]]);
            bcrypt.compare.mockResolvedValueOnce(true);
            jwt.sign.mockReturnValueOnce('mock.jwt.token');

            // Act
            const result = await AuthService.login({
                email: 'test@example.com',
                senha: 'password123'
            });

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(
                'SELECT * FROM usuarios WHERE email = ?',
                ['test@example.com']
            );
            expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
            expect(jwt.sign).toHaveBeenCalledWith(
                { id: 1, email: 'test@example.com', role: 'user' },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            expect(result).toBe('mock.jwt.token');
        });

        it('should throw error for invalid email', async () => {
            // Arrange
            mockDb.query.mockResolvedValueOnce([[]]);

            // Act & Assert
            await expect(AuthService.login({
                email: 'invalid@example.com',
                senha: 'password123'
            })).rejects.toThrow('Credenciais inválidas');
        });

        it('should throw error for invalid password', async () => {
            // Arrange
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                senha: 'hashedPassword',
                role: 'user'
            };

            mockDb.query.mockResolvedValueOnce([[mockUser]]);
            bcrypt.compare.mockResolvedValueOnce(false);

            // Act & Assert
            await expect(AuthService.login({
                email: 'test@example.com',
                senha: 'wrongpassword'
            })).rejects.toThrow('Credenciais inválidas');
        });
    });

    describe('register', () => {
        it('should create new user successfully', async () => {
            // Arrange
            const userData = {
                nome: 'Test User',
                email: 'test@example.com',
                senha: 'password123',
                role: 'user'
            };

            mockDb.query
                .mockResolvedValueOnce([[]]) // Email check - not exists
                .mockResolvedValueOnce([{ insertId: 1 }]); // Insert user

            bcrypt.hash.mockResolvedValueOnce('hashedPassword');

            // Act
            const result = await AuthService.register(userData);

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(
                'SELECT id FROM usuarios WHERE email = ?',
                ['test@example.com']
            );
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(mockDb.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO usuarios'),
                ['Test User', 'test@example.com', 'hashedPassword', 'user']
            );
            expect(result).toEqual({
                id: 1,
                nome: 'Test User',
                email: 'test@example.com',
                role: 'user'
            });
        });

        it('should throw error for existing email', async () => {
            // Arrange
            const userData = {
                nome: 'Test User',
                email: 'existing@example.com',
                senha: 'password123'
            };

            mockDb.query.mockResolvedValueOnce([[{ id: 1 }]]); // Email exists

            // Act & Assert
            await expect(AuthService.register(userData)).rejects.toThrow('Email já cadastrado');
        });

        it('should use default role when not provided', async () => {
            // Arrange
            const userData = {
                nome: 'Test User',
                email: 'test@example.com',
                senha: 'password123'
            };

            mockDb.query
                .mockResolvedValueOnce([[]]) // Email check
                .mockResolvedValueOnce([{ insertId: 1 }]); // Insert

            bcrypt.hash.mockResolvedValueOnce('hashedPassword');

            // Act
            const result = await AuthService.register(userData);

            // Assert
            expect(mockDb.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO usuarios'),
                ['Test User', 'test@example.com', 'hashedPassword', 'user']
            );
            expect(result.role).toBe('user');
        });
    });
}); 