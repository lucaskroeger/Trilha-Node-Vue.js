// Test setup file
require('dotenv').config();

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DB_HOST = 'localhost';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = 'mysql';
process.env.DB_NAME = 'estoque_test';
process.env.DB_PORT = '3307';

// Increase timeout for integration tests
jest.setTimeout(30000);

// Suppress console logs during tests
global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};

// Skip integration tests if database is not available
const db = require('../src/config/db');

// Test database connection
db.getConnection()
    .then(connection => {
        console.log('Test database connected successfully');
        connection.release();
    })
    .catch(err => {
        console.warn('Test database not available, integration tests will be skipped');
        // Mark integration tests to be skipped
        process.env.SKIP_INTEGRATION_TESTS = 'true';
    });

// Clean up database connections after all tests
afterAll(async () => {
    try {
        await db.end();
    } catch (error) {
        // Ignore errors during cleanup
    }
}); 