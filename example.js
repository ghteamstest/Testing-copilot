/**
 * Example usage of the login function with error handling
 */

const { login } = require('./login');

/**
 * Example of handling login with proper error handling
 */
async function handleLogin(email, password) {
    try {
        console.log(`Attempting to login with email: ${email}`);
        
        const result = await login(email, password);
        
        if (result.success) {
            console.log('🎉 Login successful!');
            console.log('User:', result.user);
            
            // Handle successful login (e.g., redirect to dashboard)
            return result.user;
        } else {
            console.log('💥 Login failed!');
            console.log('Error:', result.error);
            
            // Handle different types of errors appropriately
            switch(result.error.code) {
                case 'VALIDATION_ERROR':
                    // Show user-friendly validation messages
                    console.log('Please check your input and try again.');
                    break;
                case 'AUTH_ERROR':
                    // Show authentication error
                    console.log('Invalid credentials. Please try again.');
                    break;
                case 'RATE_LIMIT_ERROR':
                    // Show rate limit message
                    console.log('Too many attempts. Please wait before trying again.');
                    break;
                case 'NETWORK_ERROR':
                    // Show network error message
                    console.log('Connection problem. Please check your internet and retry.');
                    break;
                default:
                    // Generic error message
                    console.log('An unexpected error occurred. Please try again later.');
            }
            
            return null;
        }
    } catch (error) {
        // This should rarely happen as our login function catches all errors
        console.error('Unexpected error in handleLogin:', error);
        return null;
    }
}

/**
 * Demo function showing various login scenarios
 */
async function runLoginDemo() {
    console.log('=== Login Function Error Handling Demo ===\n');
    
    // Test successful login
    await handleLogin('user@example.com', 'password123');
    console.log('\n' + '-'.repeat(50) + '\n');
    
    // Test authentication error
    await handleLogin('user@example.com', 'wrongpassword');
    console.log('\n' + '-'.repeat(50) + '\n');
    
    // Test validation error
    await handleLogin('invalid-email', 'password123');
    console.log('\n' + '-'.repeat(50) + '\n');
    
    // Test missing credentials
    await handleLogin('', '');
}

// Run the demo
if (require.main === module) {
    runLoginDemo().catch(console.error);
}

module.exports = { handleLogin };