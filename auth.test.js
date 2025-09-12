/**
 * Test suite for authentication module error handling
 * Validates comprehensive error handling scenarios
 */

const { login, handleLoginError, AuthenticationError, ValidationError, NetworkError } = require('./auth.js');

/**
 * Simple test runner
 */
class TestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }
    
    test(description, testFn) {
        this.tests.push({ description, testFn });
    }
    
    async run() {
        console.log('🧪 Running authentication error handling tests...\n');
        
        for (const { description, testFn } of this.tests) {
            try {
                await testFn();
                console.log(`✅ ${description}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ ${description}`);
                console.log(`   Error: ${error.message}\n`);
                this.failed++;
            }
        }
        
        console.log(`\n📊 Test Results: ${this.passed} passed, ${this.failed} failed`);
        return this.failed === 0;
    }
}

/**
 * Test assertion helper
 */
function assert(condition, message) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

// Create test runner instance
const runner = new TestRunner();

// Validation Error Tests
runner.test('Should throw ValidationError for missing username', async () => {
    try {
        await login('', 'password123');
        assert(false, 'Expected ValidationError to be thrown');
    } catch (error) {
        assert(error instanceof ValidationError, 'Expected ValidationError');
        assert(error.field === 'username', 'Expected username field error');
        assert(error.message.includes('empty'), 'Expected empty username message');
    }
});

runner.test('Should throw ValidationError for missing password', async () => {
    try {
        await login('testuser', '');
        assert(false, 'Expected ValidationError to be thrown');
    } catch (error) {
        assert(error instanceof ValidationError, 'Expected ValidationError');
        assert(error.field === 'password', 'Expected password field error');
    }
});

runner.test('Should throw ValidationError for short username', async () => {
    try {
        await login('ab', 'password123');
        assert(false, 'Expected ValidationError to be thrown');
    } catch (error) {
        assert(error instanceof ValidationError, 'Expected ValidationError');
        assert(error.message.includes('3 characters'), 'Expected minimum length message');
    }
});

runner.test('Should throw ValidationError for short password', async () => {
    try {
        await login('testuser', '123');
        assert(false, 'Expected ValidationError to be thrown');
    } catch (error) {
        assert(error instanceof ValidationError, 'Expected ValidationError');
        assert(error.message.includes('8 characters'), 'Expected minimum length message');
    }
});

runner.test('Should throw ValidationError for invalid email format', async () => {
    try {
        await login('invalid-email@', 'password123');
        assert(false, 'Expected ValidationError to be thrown');
    } catch (error) {
        assert(error instanceof ValidationError, 'Expected ValidationError');
        assert(error.message.includes('email format'), 'Expected email format message');
    }
});

// Authentication Error Tests
runner.test('Should throw AuthenticationError for invalid credentials', async () => {
    try {
        await login('wronguser', 'wrongpass123');
        assert(false, 'Expected AuthenticationError to be thrown');
    } catch (error) {
        assert(error instanceof AuthenticationError, 'Expected AuthenticationError');
        assert(error.code === 'INVALID_CREDENTIALS', 'Expected invalid credentials code');
    }
});

// Network Error Tests
runner.test('Should throw NetworkError for server errors', async () => {
    try {
        await login('server_error', 'password123');
        assert(false, 'Expected NetworkError to be thrown');
    } catch (error) {
        assert(error instanceof NetworkError, 'Expected NetworkError');
        assert(error.statusCode === 500, 'Expected 500 status code');
    }
});

runner.test('Should throw NetworkError for network connectivity issues', async () => {
    try {
        await login('network_error', 'password123');
        assert(false, 'Expected NetworkError to be thrown');
    } catch (error) {
        assert(error instanceof NetworkError, 'Expected NetworkError');
        assert(error.statusCode === 0, 'Expected 0 status code for network error');
    }
});

runner.test('Should throw NetworkError for timeout', async () => {
    try {
        await login('testuser', 'testpassword123', { timeout: 1 }); // Very short timeout
        assert(false, 'Expected NetworkError to be thrown');
    } catch (error) {
        assert(error instanceof NetworkError, 'Expected NetworkError');
        assert(error.statusCode === 408, 'Expected 408 status code for timeout');
    }
});

// Success Case Test
runner.test('Should return success response for valid credentials', async () => {
    const result = await login('testuser', 'testpassword123');
    assert(result.success === true, 'Expected success to be true');
    assert(result.user && result.user.username === 'testuser', 'Expected user data');
    assert(result.token, 'Expected authentication token');
    assert(result.expiresAt, 'Expected expiration timestamp');
});

runner.test('Should return success response for valid email credentials', async () => {
    const result = await login('test@example.com', 'testpassword123');
    assert(result.success === true, 'Expected success to be true');
    assert(result.user && result.user.email === 'test@example.com', 'Expected user email');
});

// Error Handler Tests
runner.test('Should handle ValidationError properly', () => {
    const error = new ValidationError('Invalid username', 'username');
    const result = handleLoginError(error);
    assert(result.success === false, 'Expected success to be false');
    assert(result.code === 'VALIDATION_ERROR', 'Expected validation error code');
    assert(result.field === 'username', 'Expected field information');
});

runner.test('Should handle AuthenticationError properly', () => {
    const error = new AuthenticationError('Invalid credentials', 'AUTH_FAILED');
    const result = handleLoginError(error);
    assert(result.success === false, 'Expected success to be false');
    assert(result.code === 'AUTH_FAILED', 'Expected auth failed code');
});

runner.test('Should handle NetworkError properly', () => {
    const error = new NetworkError('Connection failed', 500);
    const result = handleLoginError(error);
    assert(result.success === false, 'Expected success to be false');
    assert(result.code === 'NETWORK_ERROR', 'Expected network error code');
    assert(result.statusCode === 500, 'Expected status code');
});

runner.test('Should handle unknown errors properly', () => {
    const error = new Error('Unknown error');
    const result = handleLoginError(error);
    assert(result.success === false, 'Expected success to be false');
    assert(result.code === 'UNKNOWN_ERROR', 'Expected unknown error code');
    assert(result.message.includes('unexpected'), 'Expected unexpected error message');
});

// Run tests if this file is executed directly
if (require.main === module) {
    runner.run().then(success => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = { TestRunner, assert };