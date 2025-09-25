/**
 * Login module with comprehensive error handling
 * Demonstrates various error handling patterns for authentication
 */

/**
 * Custom error classes for different login scenarios
 */
class LoginError extends Error {
    constructor(message, code, statusCode = 400) {
        super(message);
        this.name = 'LoginError';
        this.code = code;
        this.statusCode = statusCode;
    }
}

class NetworkError extends LoginError {
    constructor(message) {
        super(message, 'NETWORK_ERROR', 503);
        this.name = 'NetworkError';
    }
}

class AuthenticationError extends LoginError {
    constructor(message) {
        super(message, 'AUTH_ERROR', 401);
        this.name = 'AuthenticationError';
    }
}

class ValidationError extends LoginError {
    constructor(message) {
        super(message, 'VALIDATION_ERROR', 400);
        this.name = 'ValidationError';
    }
}

class RateLimitError extends LoginError {
    constructor(message) {
        super(message, 'RATE_LIMIT_ERROR', 429);
        this.name = 'RateLimitError';
    }
}

/**
 * Simulated user database for testing
 */
const mockUsers = {
    'user@example.com': {
        password: 'password123',
        id: 1,
        name: 'Test User',
        lastLogin: null,
        loginAttempts: 0
    },
    'admin@example.com': {
        password: 'admin456',
        id: 2,
        name: 'Admin User',
        lastLogin: null,
        loginAttempts: 0
    }
};

/**
 * Rate limiting storage (in production, this would be in Redis or similar)
 */
const rateLimitStore = new Map();

/**
 * Validates input credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @throws {ValidationError} When validation fails
 */
function validateCredentials(email, password) {
    if (!email) {
        throw new ValidationError('Email is required');
    }
    
    if (!password) {
        throw new ValidationError('Password is required');
    }
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new ValidationError('Invalid email format');
    }
    
    if (password.length < 6) {
        throw new ValidationError('Password must be at least 6 characters long');
    }
}

/**
 * Checks rate limiting for login attempts
 * @param {string} email - User email
 * @throws {RateLimitError} When rate limit is exceeded
 */
function checkRateLimit(email) {
    const key = `login_attempts_${email}`;
    const attempts = rateLimitStore.get(key) || { count: 0, lastAttempt: 0 };
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    
    // Reset counter if window has passed
    if (now - attempts.lastAttempt > windowMs) {
        attempts.count = 0;
    }
    
    // Check if rate limit exceeded (max 5 attempts per 15 minutes)
    if (attempts.count >= 5) {
        const timeLeft = Math.ceil((windowMs - (now - attempts.lastAttempt)) / 1000 / 60);
        throw new RateLimitError(`Too many login attempts. Try again in ${timeLeft} minutes.`);
    }
    
    // Update attempts
    attempts.count++;
    attempts.lastAttempt = now;
    rateLimitStore.set(key, attempts);
}

/**
 * Simulates network delay and potential failures
 * @throws {NetworkError} When network simulation fails
 */
async function simulateNetworkCall() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
    
    // Simulate occasional network failures (10% chance)
    if (Math.random() < 0.1) {
        throw new NetworkError('Network connection failed. Please check your internet connection.');
    }
}

/**
 * Authenticates user credentials
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User information if authentication succeeds
 * @throws {AuthenticationError} When credentials are invalid
 */
function authenticateUser(email, password) {
    const user = mockUsers[email];
    
    if (!user) {
        throw new AuthenticationError('Invalid email or password');
    }
    
    if (user.password !== password) {
        user.loginAttempts++;
        throw new AuthenticationError('Invalid email or password');
    }
    
    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lastLogin = new Date().toISOString();
    
    return {
        id: user.id,
        name: user.name,
        email: email,
        lastLogin: user.lastLogin
    };
}

/**
 * Main login function with comprehensive error handling
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} options - Additional options
 * @param {boolean} options.skipRateLimit - Skip rate limiting (for testing)
 * @param {boolean} options.skipNetworkSim - Skip network simulation (for testing)
 * @returns {Promise<Object>} Login result with user data or error information
 */
async function login(email, password, options = {}) {
    const result = {
        success: false,
        user: null,
        error: null,
        timestamp: new Date().toISOString()
    };
    
    try {
        // Step 1: Validate input
        validateCredentials(email, password);
        
        // Step 2: Check rate limiting
        if (!options.skipRateLimit) {
            checkRateLimit(email);
        }
        
        // Step 3: Simulate network call
        if (!options.skipNetworkSim) {
            await simulateNetworkCall();
        }
        
        // Step 4: Authenticate user
        const userData = authenticateUser(email, password);
        
        result.success = true;
        result.user = userData;
        
        console.log(`✅ Login successful for ${email}`);
        return result;
        
    } catch (error) {
        // Log error for monitoring (in production, use proper logging)
        console.error(`❌ Login failed for ${email}:`, error.message);
        
        result.error = {
            message: error.message,
            code: error.code || 'UNKNOWN_ERROR',
            statusCode: error.statusCode || 500,
            type: error.name || 'Error'
        };
        
        // Handle specific error types
        if (error instanceof ValidationError) {
            console.log('🔍 Validation error - check input format');
        } else if (error instanceof AuthenticationError) {
            console.log('🔐 Authentication failed - invalid credentials');
        } else if (error instanceof RateLimitError) {
            console.log('🚫 Rate limit exceeded - too many attempts');
        } else if (error instanceof NetworkError) {
            console.log('🌐 Network error - connection issue');
        } else {
            console.log('⚠️  Unexpected error occurred');
        }
        
        return result;
    }
}

/**
 * Example usage demonstrating error handling
 */
async function demonstrateErrorHandling() {
    console.log('🚀 Demonstrating login function with error handling\n');
    
    const testCases = [
        // Successful login
        { email: 'user@example.com', password: 'password123', description: 'Valid credentials' },
        
        // Validation errors
        { email: '', password: 'password123', description: 'Missing email' },
        { email: 'user@example.com', password: '', description: 'Missing password' },
        { email: 'invalid-email', password: 'password123', description: 'Invalid email format' },
        { email: 'user@example.com', password: '123', description: 'Password too short' },
        
        // Authentication errors
        { email: 'nonexistent@example.com', password: 'password123', description: 'Non-existent user' },
        { email: 'user@example.com', password: 'wrongpassword', description: 'Wrong password' },
    ];
    
    for (const testCase of testCases) {
        console.log(`\n📝 Testing: ${testCase.description}`);
        console.log(`   Email: ${testCase.email || '(empty)'}`);
        console.log(`   Password: ${testCase.password || '(empty)'}`);
        
        const result = await login(testCase.email, testCase.password, { 
            skipRateLimit: true, 
            skipNetworkSim: true 
        });
        
        if (result.success) {
            console.log(`   ✅ Result: Login successful for ${result.user.name}`);
        } else {
            console.log(`   ❌ Result: ${result.error.type} - ${result.error.message}`);
        }
    }
    
    console.log('\n🎯 Error handling demonstration complete!');
}

// Export functions for use in other modules
module.exports = {
    login,
    LoginError,
    NetworkError,
    AuthenticationError,
    ValidationError,
    RateLimitError,
    demonstrateErrorHandling
};

// Run demonstration if this file is executed directly
if (require.main === module) {
    demonstrateErrorHandling().catch(console.error);
}