const request = require('supertest');
const app = require('../../src/app');

// Skip integration tests if database is not available
const db = require('../../src/config/db');

describe('Auth Integration Tests', () => {
    beforeAll(async () => {
        // Check if database is available
        try {
            await db.query('SELECT 1');
            console.log('Database available for integration tests');
        } catch (error) {
            console.warn('Database not available, skipping integration tests');
            process.env.SKIP_INTEGRATION_TESTS = 'true';
            return;
        }

        // Clean up database before tests
        try {
            await db.query('DELETE FROM usuarios WHERE email LIKE ?', ['test%@example.com']);
        } catch (error) {
            console.warn('Could not clean up database:', error.message);
            process.env.SKIP_INTEGRATION_TESTS = 'true';
        }
    });

    afterAll(async () => {
        // Clean up after tests
        try {
            await db.query('DELETE FROM usuarios WHERE email LIKE ?', ['test%@example.com']);
            await db.end();
        } catch (error) {
            console.warn('Could not clean up database:', error.message);
        }
    });

    describe('POST /api/auth/register', () => {
        it('should register a new user successfully', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const userData = {
                nome: 'Test User',
                email: 'test@example.com',
                senha: 'password123',
                role: 'user'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.nome).toBe(userData.nome);
            expect(response.body.email).toBe(userData.email);
            expect(response.body.role).toBe(userData.role);
            expect(response.body).not.toHaveProperty('senha');
        });

        it('should fail with invalid email format', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const userData = {
                nome: 'Test User',
                email: 'invalid-email',
                senha: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Validation Error');
        });

        it('should fail with short password', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const userData = {
                nome: 'Test User',
                email: 'test2@example.com',
                senha: '123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Validation Error');
        });

        it('should fail with duplicate email', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            // First registration
            const userData = {
                nome: 'Test User',
                email: 'duplicate@example.com',
                senha: 'password123'
            };

            await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            // Second registration with same email
            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('POST /api/auth/login', () => {
        beforeEach(async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                return;
            }

            // Create a test user for login tests
            const userData = {
                nome: 'Login Test User',
                email: 'logintest@example.com',
                senha: 'password123'
            };

            try {
                await request(app)
                    .post('/api/auth/register')
                    .send(userData);
            } catch (error) {
                console.warn('Could not create test user:', error.message);
            }
        });

        it('should login successfully with valid credentials', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const loginData = {
                email: 'logintest@example.com',
                senha: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(200);

            expect(response.body).toHaveProperty('token');
            expect(typeof response.body.token).toBe('string');
        });

        it('should fail with invalid email', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const loginData = {
                email: 'nonexistent@example.com',
                senha: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(401);

            expect(response.body).toHaveProperty('error');
        });

        it('should fail with invalid password', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const loginData = {
                email: 'logintest@example.com',
                senha: 'wrongpassword'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(401);

            expect(response.body).toHaveProperty('error');
        });

        it('should fail with invalid email format', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const loginData = {
                email: 'invalid-email',
                senha: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body).toHaveProperty('error', 'Validation Error');
        });
    });
}); 