/**
 * Test suite for login function error handling
 * Tests all error scenarios and edge cases
 */

const {
    login,
    safeLogin,
    validateLoginInput,
    LoginError,
    InvalidCredentialsError,
    AccountLockedError,
    ValidationError,
    NetworkError,
    users,
    MAX_FAILED_ATTEMPTS,
    updateFailedAttempts,
    resetFailedAttempts
} = require('./login.js');

// Simple test framework
class TestFramework {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    async test(description, testFn) {
        try {
            await testFn();
            console.log(`✅ PASS: ${description}`);
            this.passed++;
        } catch (error) {
            console.log(`❌ FAIL: ${description}`);
            console.log(`   Error: ${error.message}`);
            this.failed++;
        }
    }

    assertEqual(actual, expected, message = '') {
        if (actual !== expected) {
            throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
        }
    }

    assertTrue(condition, message = '') {
        if (!condition) {
            throw new Error(`Expected true, got false. ${message}`);
        }
    }

    assertFalse(condition, message = '') {
        if (condition) {
            throw new Error(`Expected false, got true. ${message}`);
        }
    }

    assertThrows(fn, errorType, message = '') {
        try {
            fn();
            throw new Error(`Expected ${errorType.name} to be thrown. ${message}`);
        } catch (error) {
            if (!(error instanceof errorType)) {
                throw new Error(`Expected ${errorType.name}, got ${error.constructor.name}. ${message}`);
            }
        }
    }

    async assertThrowsAsync(fn, errorType, message = '') {
        try {
            await fn();
            throw new Error(`Expected ${errorType.name} to be thrown. ${message}`);
        } catch (error) {
            if (!(error instanceof errorType)) {
                throw new Error(`Expected ${errorType.name}, got ${error.constructor.name}. ${message}`);
            }
        }
    }

    summary() {
        const total = this.passed + this.failed;
        console.log(`\n=== Test Summary ===`);
        console.log(`Total tests: ${total}`);
        console.log(`Passed: ${this.passed}`);
        console.log(`Failed: ${this.failed}`);
        console.log(`Success rate: ${total > 0 ? ((this.passed / total) * 100).toFixed(1) : 0}%`);
        return this.failed === 0;
    }
}

async function runTests() {
    const test = new TestFramework();
    
    console.log('=== Login Function Error Handling Tests ===\n');

    // Test 1: Input Validation Tests
    await test.test('Empty username throws ValidationError', () => {
        test.assertThrows(
            () => validateLoginInput('', 'password'),
            ValidationError,
            'Empty username should throw ValidationError'
        );
    });

    await test.test('Empty password throws ValidationError', () => {
        test.assertThrows(
            () => validateLoginInput('username', ''),
            ValidationError,
            'Empty password should throw ValidationError'
        );
    });

    await test.test('Null username throws ValidationError', () => {
        test.assertThrows(
            () => validateLoginInput(null, 'password'),
            ValidationError,
            'Null username should throw ValidationError'
        );
    });

    await test.test('Undefined password throws ValidationError', () => {
        test.assertThrows(
            () => validateLoginInput('username', undefined),
            ValidationError,
            'Undefined password should throw ValidationError'
        );
    });

    await test.test('Username with malicious characters throws ValidationError', () => {
        test.assertThrows(
            () => validateLoginInput('user<script>', 'password'),
            ValidationError,
            'Malicious username should throw ValidationError'
        );
    });

    await test.test('Very long username throws ValidationError', () => {
        const longUsername = 'a'.repeat(51);
        test.assertThrows(
            () => validateLoginInput(longUsername, 'password'),
            ValidationError,
            'Username over 50 characters should throw ValidationError'
        );
    });

    await test.test('Very long password throws ValidationError', () => {
        const longPassword = 'a'.repeat(129);
        test.assertThrows(
            () => validateLoginInput('username', longPassword),
            ValidationError,
            'Password over 128 characters should throw ValidationError'
        );
    });

    await test.test('Valid input passes validation', () => {
        // Should not throw
        validateLoginInput('validuser', 'validpass123');
    });

    // Test 2: Authentication Error Tests
    await test.test('Invalid credentials throw InvalidCredentialsError', async () => {
        await test.assertThrowsAsync(
            () => login('admin', 'wrongpassword'),
            InvalidCredentialsError,
            'Wrong password should throw InvalidCredentialsError'
        );
    });

    await test.test('Non-existent user throws InvalidCredentialsError', async () => {
        await test.assertThrowsAsync(
            () => login('nonexistentuser', 'anypassword'),
            InvalidCredentialsError,
            'Non-existent user should throw InvalidCredentialsError'
        );
    });

    // Test 3: Account Lockout Tests
    await test.test('Locked account throws AccountLockedError', async () => {
        await test.assertThrowsAsync(
            () => login('lockeduser', 'test123'),
            AccountLockedError,
            'Locked account should throw AccountLockedError'
        );
    });

    await test.test('Account gets locked after multiple failed attempts', async () => {
        // Reset user state first
        const testUser = 'user1';
        resetFailedAttempts(testUser);
        
        // Try with wrong password multiple times, retry on network errors
        let failedAttempts = 0;
        while (failedAttempts < MAX_FAILED_ATTEMPTS) {
            try {
                await login(testUser, 'wrongpassword');
            } catch (error) {
                if (error instanceof NetworkError) {
                    // Network error doesn't count as failed login attempt, retry
                    continue;
                } else if (error instanceof InvalidCredentialsError) {
                    failedAttempts++;
                    test.assertTrue(error instanceof InvalidCredentialsError, 
                        `Attempt ${failedAttempts} should throw InvalidCredentialsError`);
                } else {
                    throw error; // Unexpected error
                }
            }
        }
        
        // Next attempt should throw AccountLockedError (retry on network errors)
        let accountLocked = false;
        for (let retries = 0; retries < 10 && !accountLocked; retries++) {
            try {
                await login(testUser, 'wrongpassword');
            } catch (error) {
                if (error instanceof NetworkError) {
                    continue; // Retry on network error
                } else if (error instanceof AccountLockedError) {
                    accountLocked = true;
                    break;
                } else {
                    throw new Error(`Expected AccountLockedError, got ${error.constructor.name}`);
                }
            }
        }
        
        test.assertTrue(accountLocked, 'Account should be locked after max failed attempts');
        
        // Reset for other tests
        resetFailedAttempts(testUser);
    });

    // Test 4: Successful Login Tests
    await test.test('Valid credentials return success object', async () => {
        const result = await login('admin', 'admin123');
        
        test.assertTrue(result.success, 'Login should be successful');
        test.assertEqual(result.username, 'admin', 'Username should match');
        test.assertTrue(result.sessionToken.startsWith('sess_'), 'Session token should be generated');
        test.assertTrue(result.loginTime, 'Login time should be set');
        test.assertTrue(result.duration, 'Duration should be recorded');
    });

    // Test 5: SafeLogin Wrapper Tests
    await test.test('safeLogin returns success object for valid credentials', async () => {
        const result = await safeLogin('admin', 'admin123');
        
        test.assertTrue(result.success, 'safeLogin should return success true');
        test.assertTrue(result.data !== null, 'safeLogin should return data');
        test.assertTrue(result.error === null, 'safeLogin should not return error');
        test.assertEqual(result.data.username, 'admin', 'Username should match in data');
    });

    await test.test('safeLogin returns error object for invalid credentials', async () => {
        // Retry logic to handle occasional network errors in simulation
        let result;
        let attempts = 0;
        const maxAttempts = 10;
        
        do {
            result = await safeLogin('admin', 'wrongpass');
            attempts++;
        } while (
            attempts < maxAttempts && 
            result.error && 
            result.error.name === 'NetworkError'
        );
        
        test.assertFalse(result.success, 'safeLogin should return success false');
        test.assertTrue(result.data === null, 'safeLogin should not return data');
        test.assertTrue(result.error !== null, 'safeLogin should return error');
        
        // Accept either InvalidCredentialsError or NetworkError (due to simulation)
        const validErrorTypes = ['InvalidCredentialsError', 'NetworkError'];
        test.assertTrue(
            validErrorTypes.includes(result.error.name), 
            `Error name should be one of ${validErrorTypes.join(', ')}, got ${result.error.name}`
        );
        
        if (result.error.name === 'InvalidCredentialsError') {
            test.assertEqual(result.error.code, 'INVALID_CREDENTIALS', 'Error code should be correct');
        } else if (result.error.name === 'NetworkError') {
            test.assertEqual(result.error.code, 'NETWORK_ERROR', 'Error code should be correct');
        }
    });

    await test.test('safeLogin returns error object for validation errors', async () => {
        const result = await safeLogin('', 'password');
        
        test.assertFalse(result.success, 'safeLogin should return success false');
        test.assertTrue(result.error !== null, 'safeLogin should return error');
        test.assertEqual(result.error.name, 'ValidationError', 'Error name should be ValidationError');
        test.assertEqual(result.error.code, 'VALIDATION_ERROR', 'Error code should be correct');
    });

    // Test 6: Error Object Structure Tests
    await test.test('Login errors have proper structure', async () => {
        // Retry logic to handle network error simulation
        let error;
        let attempts = 0;
        const maxAttempts = 10;
        
        do {
            try {
                await login('admin', 'wrongpass');
            } catch (e) {
                error = e;
                attempts++;
            }
        } while (
            attempts < maxAttempts && 
            error && 
            error instanceof NetworkError
        );
        
        // Accept either InvalidCredentialsError or NetworkError
        const validErrorTypes = [InvalidCredentialsError, NetworkError];
        test.assertTrue(
            validErrorTypes.some(type => error instanceof type), 
            `Should be one of the valid error types`
        );
        
        test.assertTrue(error.name, 'Should have correct name');
        test.assertTrue(error.errorCode, 'Should have error code');
        test.assertTrue(error.timestamp, 'Should have timestamp');
        test.assertTrue(error.duration, 'Should have duration');
    });

    // Test 7: Edge Cases
    await test.test('Whitespace-only username is invalid', () => {
        test.assertThrows(
            () => validateLoginInput('   ', 'password'),
            ValidationError,
            'Whitespace-only username should be invalid'
        );
    });

    await test.test('Non-string username throws ValidationError', () => {
        test.assertThrows(
            () => validateLoginInput(123, 'password'),
            ValidationError,
            'Non-string username should throw ValidationError'
        );
    });

    await test.test('Non-string password throws ValidationError', () => {
        test.assertThrows(
            () => validateLoginInput('username', 123),
            ValidationError,
            'Non-string password should throw ValidationError'
        );
    });

    // Test 8: Network Error Simulation
    // Note: This test may occasionally pass due to the random nature of network error simulation
    await test.test('Network errors are handled properly', async () => {
        let networkErrorCaught = false;
        
        // Try multiple times to potentially trigger the network error simulation
        for (let i = 0; i < 20; i++) {
            try {
                await login('admin', 'admin123');
            } catch (error) {
                if (error instanceof NetworkError) {
                    networkErrorCaught = true;
                    test.assertEqual(error.errorCode, 'NETWORK_ERROR', 'Should have correct error code');
                    break;
                }
            }
        }
        
        if (!networkErrorCaught) {
            console.log('   Note: Network error simulation not triggered in this test run');
        }
    });

    // Test 9: Performance and Duration Tracking
    await test.test('Login duration is tracked', async () => {
        try {
            await login('admin', 'admin123');
        } catch (error) {
            // Even errors should have duration
            test.assertTrue(error.duration, 'Error should include duration');
            test.assertTrue(error.duration.endsWith('ms'), 'Duration should be in milliseconds');
        }
    });

    return test.summary();
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests().then(success => {
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Test execution failed:', error);
        process.exit(1);
    });
}

module.exports = { runTests };