const request = require('supertest');
const app = require('../../src/app');

// Skip integration tests if database is not available
const db = require('../../src/config/db');

describe('Movimentos Integration Tests', () => {
    let adminToken;
    let testCategoryId;
    let testProductId;

    beforeAll(async () => {
        // Check if database is available
        try {
            await db.query('SELECT 1');
        } catch (error) {
            console.warn('Database not available, skipping integration tests');
            return;
        }

        // Create test category
        try {
            const [categoryResult] = await db.query(
                'INSERT INTO categorias (nome) VALUES (?)',
                ['Test Category']
            );
            testCategoryId = categoryResult.insertId;

            // Create admin user
            const adminData = {
                nome: 'Admin User',
                email: 'movimentosadmin@test.com',
                senha: 'password123',
                role: 'admin'
            };

            const adminResponse = await request(app)
                .post('/api/auth/register')
                .send(adminData);

            adminToken = adminResponse.body.token;

            // Create test product
            const productData = {
                nome: 'Test Product',
                quantidade: 20,
                preco: 25.50,
                categoria_id: testCategoryId
            };

            const productResponse = await request(app)
                .post('/api/produtos')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(productData);

            testProductId = productResponse.body.id;
        } catch (error) {
            console.warn('Could not setup test data:', error.message);
        }
    });

    afterAll(async () => {
        // Clean up test data
        try {
            if (testProductId) {
                await db.query('DELETE FROM entradas WHERE produto_id = ?', [testProductId]);
                await db.query('DELETE FROM saidas WHERE produto_id = ?', [testProductId]);
                await db.query('DELETE FROM produtos WHERE id = ?', [testProductId]);
            }
            if (testCategoryId) {
                await db.query('DELETE FROM categorias WHERE id = ?', [testCategoryId]);
            }
            await db.query('DELETE FROM usuarios WHERE email = ?', ['movimentosadmin@test.com']);
            await db.end();
        } catch (error) {
            console.warn('Could not clean up test data:', error.message);
        }
    });

    describe('POST /api/movimentos/entrada', () => {
        it('should return 401 without authentication', async () => {
            const entradaData = {
                produto_id: testProductId || 1,
                quantidade: 5
            };

            await request(app)
                .post('/api/movimentos/entrada')
                .send(entradaData)
                .expect(401);
        });

        it('should register entrada successfully', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const entradaData = {
                produto_id: testProductId,
                quantidade: 5
            };

            const response = await request(app)
                .post('/api/movimentos/entrada')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(entradaData)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.produto_id).toBe(testProductId);
            expect(response.body.quantidade).toBe(5);
            expect(response.body).toHaveProperty('nova_quantidade');
        });

        it('should fail with non-existent product', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const entradaData = {
                produto_id: 99999,
                quantidade: 5
            };

            const response = await request(app)
                .post('/api/movimentos/entrada')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(entradaData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        it('should fail with invalid data', async () => {
            const invalidData = {
                produto_id: testProductId || 1,
                quantidade: -5 // Negative quantity
            };

            const response = await request(app)
                .post('/api/movimentos/entrada')
                .set('Authorization', `Bearer ${adminToken || 'fake-token'}`)
                .send(invalidData);

            // If we have a valid token, expect 400 for validation error
            // If we don't have a valid token, expect 401 for auth error
            if (adminToken) {
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty('error', 'Validation Error');
            } else {
                expect(response.statusCode).toBe(401);
                expect(response.body).toHaveProperty('error');
            }
        });
    });

    describe('POST /api/movimentos/saida', () => {
        it('should return 401 without authentication', async () => {
            const saidaData = {
                produto_id: testProductId || 1,
                quantidade: 3
            };

            await request(app)
                .post('/api/movimentos/saida')
                .send(saidaData)
                .expect(401);
        });

        it('should register saida successfully', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const saidaData = {
                produto_id: testProductId,
                quantidade: 3
            };

            const response = await request(app)
                .post('/api/movimentos/saida')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(saidaData)
                .expect(201);

            expect(response.body).toHaveProperty('id');
            expect(response.body.produto_id).toBe(testProductId);
            expect(response.body.quantidade).toBe(3);
            expect(response.body).toHaveProperty('nova_quantidade');
        });

        it('should fail with insufficient stock', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const saidaData = {
                produto_id: testProductId,
                quantidade: 1000 // More than available stock
            };

            const response = await request(app)
                .post('/api/movimentos/saida')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(saidaData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        it('should fail with non-existent product', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            const saidaData = {
                produto_id: 99999,
                quantidade: 3
            };

            const response = await request(app)
                .post('/api/movimentos/saida')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(saidaData)
                .expect(400);

            expect(response.body).toHaveProperty('error');
        });

        it('should fail with invalid data', async () => {
            const invalidData = {
                produto_id: testProductId || 1,
                quantidade: 0 // Zero quantity
            };

            const response = await request(app)
                .post('/api/movimentos/saida')
                .set('Authorization', `Bearer ${adminToken || 'fake-token'}`)
                .send(invalidData);

            // If we have a valid token, expect 400 for validation error
            // If we don't have a valid token, expect 401 for auth error
            if (adminToken) {
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty('error', 'Validation Error');
            } else {
                expect(response.statusCode).toBe(401);
                expect(response.body).toHaveProperty('error');
            }
        });
    });

    describe('Stock Management', () => {
        it('should correctly update stock after entrada and saida', async () => {
            // Skip if database not available
            if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
                console.log('Skipping test - database not available');
                return;
            }

            // Get initial stock
            const initialResponse = await request(app)
                .get(`/api/produtos/${testProductId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            const initialStock = initialResponse.body.quantidade;

            // Add stock
            await request(app)
                .post('/api/movimentos/entrada')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    produto_id: testProductId,
                    quantidade: 10
                });

            // Remove stock
            await request(app)
                .post('/api/movimentos/saida')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    produto_id: testProductId,
                    quantidade: 5
                });

            // Check final stock
            const finalResponse = await request(app)
                .get(`/api/produtos/${testProductId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            const finalStock = finalResponse.body.quantidade;
            expect(finalStock).toBe(initialStock + 10 - 5);
        });
    });
}); 