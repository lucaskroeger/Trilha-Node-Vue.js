# Test Suite Documentation

This directory contains comprehensive unit and integration tests for the Estoque API.

## Test Structure

```
tests/
├── unit/                    # Unit tests
│   ├── AuthService.test.js
│   ├── ProdutoService.test.js
│   └── MovimentoService.test.js
├── integration/             # Integration tests
│   ├── auth.integration.test.js
│   ├── produtos.integration.test.js
│   └── movimentos.integration.test.js
├── setup.js                 # Test environment setup
├── test-db-setup.sql        # Test database schema
└── README.md               # This file
```

## Running Tests

### All Tests
```bash
npm test
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests Only
```bash
npm run test:integration
```

### With Coverage
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

### CI Mode
```bash
npm run test:ci
```

## Test Categories

### Unit Tests (`tests/unit/`)

Unit tests focus on testing individual functions and methods in isolation. They use mocks to isolate the code under test from external dependencies.

**Coverage:**
- **AuthService**: Login, registration, password hashing, JWT generation
- **ProdutoService**: CRUD operations, validation, error handling
- **MovimentoService**: Stock movements, quantity calculations

**Key Features:**
- Mocked database connections
- Mocked external dependencies (bcrypt, jwt)
- Fast execution
- Isolated testing

### Integration Tests (`tests/integration/`)

Integration tests verify that different parts of the application work together correctly. They test the full request-response cycle.

**Coverage:**
- **Auth Integration**: User registration, login, token validation
- **Produtos Integration**: Full CRUD operations with authentication
- **Movimentos Integration**: Stock management workflows

**Key Features:**
- Real database connections
- Full HTTP request/response testing
- Authentication flow testing
- Data persistence verification

## Test Database Setup

Integration tests require a test database. The test setup automatically:

1. Uses the `estoque_test` database
2. Creates necessary tables via `test-db-setup.sql`
3. Cleans up test data after each test suite
4. Uses separate database credentials for isolation

## Test Environment Variables

Tests use the following environment variables (set in `tests/setup.js`):

```javascript
NODE_ENV=test
JWT_SECRET=test-secret-key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysql
DB_NAME=estoque_test
DB_PORT=3307
```

## Test Patterns

### Unit Test Pattern
```javascript
describe('ServiceName', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('methodName', () => {
        it('should do something when condition', async () => {
            // Arrange
            const mockData = { /* test data */ };
            mockDb.query.mockResolvedValueOnce([mockData]);

            // Act
            const result = await Service.method(mockData);

            // Assert
            expect(result).toEqual(expectedResult);
            expect(mockDb.query).toHaveBeenCalledWith(expectedQuery, expectedParams);
        });
    });
});
```

### Integration Test Pattern
```javascript
describe('Endpoint Integration Tests', () => {
    let authToken;

    beforeAll(async () => {
        // Setup test data
        const userData = { /* user data */ };
        const response = await request(app)
            .post('/api/auth/register')
            .send(userData);
        authToken = response.body.token;
    });

    afterAll(async () => {
        // Cleanup test data
        await db.query('DELETE FROM table WHERE condition');
        await db.end();
    });

    it('should do something', async () => {
        const response = await request(app)
            .get('/api/endpoint')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);

        expect(response.body).toHaveProperty('expectedProperty');
    });
});
```

## Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Cleanup**: Always clean up test data after tests
3. **Descriptive Names**: Test names should clearly describe what is being tested
4. **Arrange-Act-Assert**: Follow the AAA pattern for test structure
5. **Mock External Dependencies**: Unit tests should mock external dependencies
6. **Real Database**: Integration tests should use real database connections
7. **Error Testing**: Test both success and error scenarios
8. **Edge Cases**: Test boundary conditions and edge cases

## Coverage Goals

- **Unit Tests**: 90%+ coverage of service methods
- **Integration Tests**: 100% coverage of API endpoints
- **Error Handling**: Test all error scenarios
- **Authentication**: Test all authentication flows
- **Validation**: Test all input validation rules

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running on port 3307
- Check database credentials in test setup
- Verify test database exists

### Test Timeouts
- Integration tests have a 30-second timeout
- Increase timeout in `tests/setup.js` if needed

### Mock Issues
- Clear mocks in `beforeEach` hooks
- Ensure mocks are properly configured
- Check mock return values

### Environment Issues
- Ensure `.env` file exists with required variables
- Check that test environment variables are set correctly 