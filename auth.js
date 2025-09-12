/**
 * Authentication module with comprehensive error handling
 * Demonstrates robust login functionality with proper error management
 */

class AuthenticationError extends Error {
    constructor(message, code, details = null) {
        super(message);
        this.name = 'AuthenticationError';
        this.code = code;
        this.details = details;
    }
}

class ValidationError extends Error {
    constructor(message, field = null) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode = null) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

/**
 * Login function with comprehensive error handling
 * @param {string} username - User's username or email
 * @param {string} password - User's password
 * @param {Object} options - Additional options
 * @param {number} options.timeout - Request timeout in milliseconds (default: 5000)
 * @param {string} options.endpoint - API endpoint (default: '/api/auth/login')
 * @returns {Promise<Object>} Login response with user data and token
 * @throws {ValidationError} When input validation fails
 * @throws {AuthenticationError} When authentication fails
 * @throws {NetworkError} When network request fails
 */
async function login(username, password, options = {}) {
    const { timeout = 5000, endpoint = '/api/auth/login' } = options;
    
    try {
        // Input validation with detailed error messages
        validateLoginInputs(username, password);
        
        // Prepare request data
        const requestData = {
            username: username.trim(),
            password: password,
            timestamp: new Date().toISOString()
        };
        
        // Simulate API call with error handling
        const response = await makeAuthRequest(endpoint, requestData, timeout);
        
        // Validate response
        if (!response.success) {
            throw new AuthenticationError(
                response.message || 'Authentication failed',
                response.code || 'AUTH_FAILED',
                response.details
            );
        }
        
        // Return successful login response
        return {
            success: true,
            user: response.user,
            token: response.token,
            expiresAt: response.expiresAt,
            message: 'Login successful'
        };
        
    } catch (error) {
        // Log error for debugging (in production, use proper logging service)
        console.error('Login error:', {
            message: error.message,
            code: error.code || 'UNKNOWN',
            username: username ? username.substring(0, 3) + '***' : 'undefined',
            timestamp: new Date().toISOString()
        });
        
        // Re-throw with proper error types
        if (error instanceof ValidationError || 
            error instanceof AuthenticationError || 
            error instanceof NetworkError) {
            throw error;
        }
        
        // Handle unexpected errors
        throw new AuthenticationError(
            'An unexpected error occurred during login',
            'UNEXPECTED_ERROR',
            { originalError: error.message }
        );
    }
}

/**
 * Validates login input parameters
 * @param {string} username - Username to validate
 * @param {string} password - Password to validate
 * @throws {ValidationError} When validation fails
 */
function validateLoginInputs(username, password) {
    if (typeof username !== 'string') {
        throw new ValidationError('Username is required and must be a string', 'username');
    }
    
    if (typeof password !== 'string') {
        throw new ValidationError('Password is required and must be a string', 'password');
    }
    
    if (password.length === 0) {
        throw new ValidationError('Password cannot be empty', 'password');
    }
    
    const trimmedUsername = username.trim();
    
    if (trimmedUsername.length === 0) {
        throw new ValidationError('Username cannot be empty', 'username');
    }
    
    if (trimmedUsername.length < 3) {
        throw new ValidationError('Username must be at least 3 characters long', 'username');
    }
    
    if (password.length < 8) {
        throw new ValidationError('Password must be at least 8 characters long', 'password');
    }
    
    // Email format validation if username contains @
    if (trimmedUsername.includes('@')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedUsername)) {
            throw new ValidationError('Invalid email format', 'username');
        }
    }
}

/**
 * Makes an authenticated request with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request data
 * @param {number} timeout - Request timeout
 * @returns {Promise<Object>} API response
 * @throws {NetworkError} When network request fails
 * @throws {AuthenticationError} When authentication fails
 */
async function makeAuthRequest(endpoint, data, timeout) {
    // Simulate network request (in real implementation, use fetch or axios)
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            reject(new NetworkError('Request timeout', 408));
        }, timeout);
        
        // Simulate API delay
        setTimeout(() => {
            clearTimeout(timeoutId);
            
            // Simulate different response scenarios for demonstration
            const { username, password } = data;
            
            // Simulate server error
            if (username === 'server_error') {
                reject(new NetworkError('Internal server error', 500));
                return;
            }
            
            // Simulate network connectivity issues
            if (username === 'network_error') {
                reject(new NetworkError('Network connection failed', 0));
                return;
            }
            
            // Simulate invalid credentials
            if ((username !== 'testuser' && username !== 'test@example.com' && username !== 'user@example.com') || 
                password !== 'testpassword123') {
                resolve({
                    success: false,
                    message: 'Invalid username or password',
                    code: 'INVALID_CREDENTIALS'
                });
                return;
            }
            
            // Simulate successful login
            resolve({
                success: true,
                user: {
                    id: 1,
                    username: username,
                    email: username.includes('@') ? username : `${username}@example.com`,
                    role: 'user'
                },
                token: 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9),
                expiresAt: new Date(Date.now() + 3600000).toISOString() // 1 hour from now
            });
        }, 100); // Simulate 100ms network delay
    });
}

/**
 * Helper function to handle login errors gracefully
 * @param {Error} error - The error to handle
 * @returns {Object} User-friendly error response
 */
function handleLoginError(error) {
    const errorResponse = {
        success: false,
        message: 'Login failed',
        code: 'UNKNOWN_ERROR'
    };
    
    if (error instanceof ValidationError) {
        errorResponse.message = error.message;
        errorResponse.code = 'VALIDATION_ERROR';
        errorResponse.field = error.field;
    } else if (error instanceof AuthenticationError) {
        errorResponse.message = error.message;
        errorResponse.code = error.code;
        errorResponse.details = error.details;
    } else if (error instanceof NetworkError) {
        errorResponse.message = error.statusCode === 408 ? 
            'Request timeout. Please try again.' : 
            'Network error. Please check your connection.';
        errorResponse.code = 'NETWORK_ERROR';
        errorResponse.statusCode = error.statusCode;
    } else {
        errorResponse.message = 'An unexpected error occurred. Please try again.';
    }
    
    return errorResponse;
}

module.exports = {
    login,
    handleLoginError,
    AuthenticationError,
    ValidationError,
    NetworkError
};