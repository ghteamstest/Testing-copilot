/**
 * Demo script showing proper error handling with the login function
 * Demonstrates real-world usage patterns and error management
 */

const { login, handleLoginError } = require('./auth.js');

/**
 * Demonstrates proper error handling patterns for login functionality
 */
async function demonstrateLoginErrorHandling() {
    console.log('🔐 Login Function Error Handling Demonstration\n');
    
    // Test scenarios to demonstrate different error types
    const testScenarios = [
        {
            description: 'Valid credentials - Success case',
            username: 'testuser',
            password: 'testpassword123',
            expectedOutcome: 'success'
        },
        {
            description: 'Valid email credentials - Success case',
            username: 'user@example.com', 
            password: 'testpassword123',
            expectedOutcome: 'success'
        },
        {
            description: 'Empty username - Validation error',
            username: '',
            password: 'password123',
            expectedOutcome: 'validation_error'
        },
        {
            description: 'Short password - Validation error',
            username: 'testuser',
            password: '123',
            expectedOutcome: 'validation_error'
        },
        {
            description: 'Invalid email format - Validation error',
            username: 'invalid-email@',
            password: 'password123',
            expectedOutcome: 'validation_error'
        },
        {
            description: 'Wrong credentials - Authentication error',
            username: 'wronguser',
            password: 'wrongpass123',
            expectedOutcome: 'auth_error'
        },
        {
            description: 'Server error simulation - Network error',
            username: 'server_error',
            password: 'password123',
            expectedOutcome: 'network_error'
        },
        {
            description: 'Network connectivity issue - Network error',
            username: 'network_error',
            password: 'password123',
            expectedOutcome: 'network_error'
        },
        {
            description: 'Timeout scenario - Network error',
            username: 'testuser',
            password: 'testpassword123',
            options: { timeout: 1 },
            expectedOutcome: 'network_error'
        }
    ];
    
    // Run each test scenario
    for (let i = 0; i < testScenarios.length; i++) {
        const scenario = testScenarios[i];
        console.log(`${i + 1}. ${scenario.description}`);
        console.log(`   Username: "${scenario.username}"`);
        console.log(`   Password: "${scenario.password.replace(/./g, '*')}"`);
        
        try {
            const result = await login(
                scenario.username, 
                scenario.password, 
                scenario.options || {}
            );
            
            // Handle successful login
            console.log('   ✅ Result: SUCCESS');
            console.log(`   👤 User: ${result.user.username} (${result.user.email})`);
            console.log(`   🎫 Token: ${result.token.substring(0, 20)}...`);
            console.log(`   ⏰ Expires: ${new Date(result.expiresAt).toLocaleString()}`);
            
        } catch (error) {
            // Handle login errors using the error handler
            const errorResponse = handleLoginError(error);
            
            console.log('   ❌ Result: ERROR');
            console.log(`   📝 Message: ${errorResponse.message}`);
            console.log(`   🏷️  Code: ${errorResponse.code}`);
            
            // Show additional error details if available
            if (errorResponse.field) {
                console.log(`   🎯 Field: ${errorResponse.field}`);
            }
            if (errorResponse.statusCode) {
                console.log(`   📊 Status Code: ${errorResponse.statusCode}`);
            }
            if (errorResponse.details) {
                console.log(`   🔍 Details: ${JSON.stringify(errorResponse.details)}`);
            }
        }
        
        console.log(''); // Empty line for readability
    }
}

/**
 * Shows best practices for integrating login with error handling in an application
 */
async function showBestPractices() {
    console.log('📋 Best Practices for Login Error Handling\n');
    
    // Example: Web application login handler
    async function webAppLoginHandler(username, password) {
        try {
            const result = await login(username, password);
            
            // Success: Set user session, redirect, etc.
            console.log('✅ Login successful - redirecting to dashboard');
            return {
                success: true,
                redirectUrl: '/dashboard',
                user: result.user
            };
            
        } catch (error) {
            const errorResponse = handleLoginError(error);
            
            // Log error for monitoring (sanitized)
            console.log('📊 Login attempt failed:', {
                code: errorResponse.code,
                username: username.substring(0, 3) + '***',
                timestamp: new Date().toISOString()
            });
            
            // Return user-friendly error response
            return {
                success: false,
                message: errorResponse.message,
                field: errorResponse.field || null
            };
        }
    }
    
    // Demonstrate the handler
    console.log('Example: Web application login handler');
    const result1 = await webAppLoginHandler('testuser', 'testpassword123');
    console.log('Response:', result1);
    console.log('');
    
    const result2 = await webAppLoginHandler('', 'testpassword123');
    console.log('Response:', result2);
    console.log('');
    
    // Example: CLI application with retry logic
    async function cliLoginWithRetry(username, password, maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`🔄 Login attempt ${attempt}/${maxRetries}`);
                const result = await login(username, password);
                console.log('✅ Login successful!');
                return result;
                
            } catch (error) {
                const errorResponse = handleLoginError(error);
                
                if (errorResponse.code === 'VALIDATION_ERROR') {
                    // Don't retry validation errors
                    console.log(`❌ Validation error: ${errorResponse.message}`);
                    throw error;
                }
                
                if (errorResponse.code === 'NETWORK_ERROR' && attempt < maxRetries) {
                    // Retry network errors
                    console.log(`⚠️  Network error, retrying in 2 seconds...`);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    continue;
                }
                
                // Don't retry auth errors or final attempt
                console.log(`❌ Login failed: ${errorResponse.message}`);
                throw error;
            }
        }
    }
    
    console.log('Example: CLI application with retry logic');
    try {
        await cliLoginWithRetry('network_error', 'password123', 2);
    } catch (error) {
        console.log('Final result: Login failed after retries');
    }
}

// Run the demonstration
async function main() {
    try {
        await demonstrateLoginErrorHandling();
        console.log(''.padEnd(60, '='));
        await showBestPractices();
        
        console.log('🎉 Demonstration completed successfully!');
    } catch (error) {
        console.error('Demo error:', error.message);
    }
}

// Run if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { demonstrateLoginErrorHandling, showBestPractices };