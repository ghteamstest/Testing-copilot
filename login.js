/**
 * Login functionality with comprehensive error handling
 * This module demonstrates proper error handling patterns for user authentication
 */

// Custom error classes for different types of login failures
class LoginError extends Error {
    constructor(message, errorCode = 'LOGIN_ERROR') {
        super(message);
        this.name = 'LoginError';
        this.errorCode = errorCode;
        this.timestamp = new Date().toISOString();
    }
}

class InvalidCredentialsError extends LoginError {
    constructor(message = 'Invalid username or password') {
        super(message, 'INVALID_CREDENTIALS');
        this.name = 'InvalidCredentialsError';
    }
}

class AccountLockedError extends LoginError {
    constructor(message = 'Account is locked due to too many failed attempts') {
        super(message, 'ACCOUNT_LOCKED');
        this.name = 'AccountLockedError';
    }
}

class ValidationError extends LoginError {
    constructor(message = 'Invalid input data') {
        super(message, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
    }
}

class NetworkError extends LoginError {
    constructor(message = 'Network connection failed') {
        super(message, 'NETWORK_ERROR');
        this.name = 'NetworkError';
    }
}

// Mock database of users for demonstration
const users = new Map([
    ['admin', { password: 'admin123', failedAttempts: 0, isLocked: false }],
    ['user1', { password: 'password123', failedAttempts: 0, isLocked: false }],
    ['lockeduser', { password: 'test123', failedAttempts: 5, isLocked: true }]
]);

// Configuration
const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Validates input parameters for login
 * @param {string} username - The username to validate
 * @param {string} password - The password to validate
 * @throws {ValidationError} If validation fails
 */
function validateLoginInput(username, password) {
    const errors = [];

    // Check for empty or undefined values
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        errors.push('Username is required and must be a non-empty string');
    }

    if (!password || typeof password !== 'string' || password.length === 0) {
        errors.push('Password is required and must be a non-empty string');
    }

    // Additional validation rules
    if (username && username.length > 50) {
        errors.push('Username must be 50 characters or less');
    }

    if (password && password.length > 128) {
        errors.push('Password must be 128 characters or less');
    }

    // Check for potentially malicious input
    if (username && /[<>'"&]/.test(username)) {
        errors.push('Username contains invalid characters');
    }

    if (errors.length > 0) {
        throw new ValidationError(`Validation failed: ${errors.join(', ')}`);
    }
}

/**
 * Simulates network authentication request
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {Promise<boolean>} True if authentication succeeds
 * @throws {NetworkError} If network simulation fails
 */
async function authenticateWithServer(username, password) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Simulate occasional network failures (10% chance)
    if (Math.random() < 0.1) {
        throw new NetworkError('Failed to connect to authentication server');
    }

    // Simulate server authentication logic
    const user = users.get(username);
    return user && user.password === password && !user.isLocked;
}

/**
 * Logs login attempts for security auditing
 * @param {string} username - The username
 * @param {boolean} success - Whether the login was successful
 * @param {string} errorCode - Error code if login failed
 */
function logLoginAttempt(username, success, errorCode = null) {
    const timestamp = new Date().toISOString();
    const status = success ? 'SUCCESS' : 'FAILED';
    const error = errorCode ? ` (${errorCode})` : '';
    
    console.log(`[${timestamp}] LOGIN ${status}: ${username}${error}`);
}

/**
 * Updates failed login attempt counter
 * @param {string} username - The username
 */
function updateFailedAttempts(username) {
    const user = users.get(username);
    if (user) {
        user.failedAttempts++;
        if (user.failedAttempts >= MAX_FAILED_ATTEMPTS) {
            user.isLocked = true;
            user.lockoutTime = Date.now();
            console.log(`Account ${username} has been locked due to ${user.failedAttempts} failed attempts`);
        }
    }
}

/**
 * Resets failed login attempts on successful login
 * @param {string} username - The username
 */
function resetFailedAttempts(username) {
    const user = users.get(username);
    if (user) {
        user.failedAttempts = 0;
        user.isLocked = false;
        user.lockoutTime = null;
    }
}

/**
 * Main login function with comprehensive error handling
 * @param {string} username - The username for login
 * @param {string} password - The password for login
 * @returns {Promise<Object>} Login result object
 */
async function login(username, password) {
    const startTime = Date.now();
    
    try {
        // Step 1: Input validation
        validateLoginInput(username, password);
        
        // Step 2: Check if account exists and is not locked
        const user = users.get(username);
        if (!user) {
            logLoginAttempt(username, false, 'USER_NOT_FOUND');
            throw new InvalidCredentialsError('Invalid username or password');
        }

        if (user.isLocked) {
            // Check if lockout period has expired
            if (user.lockoutTime && (Date.now() - user.lockoutTime) > LOCKOUT_DURATION) {
                // Reset lockout
                user.isLocked = false;
                user.failedAttempts = 0;
                user.lockoutTime = null;
                console.log(`Account ${username} lockout has expired and been reset`);
            } else {
                logLoginAttempt(username, false, 'ACCOUNT_LOCKED');
                throw new AccountLockedError(`Account is locked. Too many failed attempts. Try again later.`);
            }
        }

        // Step 3: Authenticate with server (simulated)
        let isAuthenticated = false;
        try {
            isAuthenticated = await authenticateWithServer(username, password);
        } catch (error) {
            if (error instanceof NetworkError) {
                logLoginAttempt(username, false, 'NETWORK_ERROR');
                throw error;
            }
            // Re-throw unexpected errors
            throw new LoginError(`Authentication service error: ${error.message}`, 'SERVICE_ERROR');
        }

        // Step 4: Handle authentication result
        if (!isAuthenticated) {
            updateFailedAttempts(username);
            logLoginAttempt(username, false, 'INVALID_CREDENTIALS');
            throw new InvalidCredentialsError('Invalid username or password');
        }

        // Step 5: Successful login
        resetFailedAttempts(username);
        logLoginAttempt(username, true);
        
        const sessionToken = generateSessionToken();
        const duration = Date.now() - startTime;
        
        return {
            success: true,
            message: 'Login successful',
            sessionToken: sessionToken,
            username: username,
            loginTime: new Date().toISOString(),
            duration: `${duration}ms`
        };

    } catch (error) {
        // Ensure all errors are properly logged and formatted
        const duration = Date.now() - startTime;
        
        if (error instanceof LoginError) {
            // Re-throw our custom errors with additional context
            error.duration = `${duration}ms`;
            throw error;
        } else {
            // Handle unexpected errors
            const unexpectedError = new LoginError(
                `Unexpected error during login: ${error.message}`,
                'UNEXPECTED_ERROR'
            );
            unexpectedError.originalError = error;
            unexpectedError.duration = `${duration}ms`;
            
            logLoginAttempt(username || 'unknown', false, 'UNEXPECTED_ERROR');
            throw unexpectedError;
        }
    }
}

/**
 * Generates a mock session token
 * @returns {string} Session token
 */
function generateSessionToken() {
    return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Utility function to safely attempt login with full error context
 * @param {string} username - The username
 * @param {string} password - The password
 * @returns {Promise<Object>} Safe login result
 */
async function safeLogin(username, password) {
    try {
        const result = await login(username, password);
        return {
            success: true,
            data: result,
            error: null
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            error: {
                name: error.name,
                message: error.message,
                code: error.errorCode,
                timestamp: error.timestamp,
                duration: error.duration
            }
        };
    }
}

// Export functions and classes for testing and usage
module.exports = {
    login,
    safeLogin,
    validateLoginInput,
    LoginError,
    InvalidCredentialsError,
    AccountLockedError,
    ValidationError,
    NetworkError,
    // Export for testing purposes
    users,
    MAX_FAILED_ATTEMPTS,
    updateFailedAttempts,
    resetFailedAttempts
};

// Example usage demonstration
if (require.main === module) {
    console.log('=== Login Function Error Handling Demo ===\n');
    
    async function demonstrateErrorHandling() {
        const testCases = [
            { username: 'admin', password: 'admin123', description: 'Valid credentials' },
            { username: 'admin', password: 'wrongpass', description: 'Invalid password' },
            { username: '', password: 'password', description: 'Empty username' },
            { username: 'admin', password: '', description: 'Empty password' },
            { username: 'nonexistent', password: 'password', description: 'Non-existent user' },
            { username: 'lockeduser', password: 'test123', description: 'Locked account' },
            { username: 'user<script>', password: 'pass', description: 'Malicious username' }
        ];

        for (const testCase of testCases) {
            console.log(`Testing: ${testCase.description}`);
            const result = await safeLogin(testCase.username, testCase.password);
            
            if (result.success) {
                console.log(`✅ Success: ${result.data.message}`);
                console.log(`   Token: ${result.data.sessionToken}`);
            } else {
                console.log(`❌ Error: ${result.error.name} - ${result.error.message}`);
                console.log(`   Code: ${result.error.code}, Duration: ${result.error.duration}`);
            }
            console.log('');
        }
    }

    demonstrateErrorHandling().catch(console.error);
}