/**
 * Example usage of the login function with error handling
 */

const { login } = require('./login');

// Example 1: Successful login
async function successfulLoginExample() {
  try {
    const user = await login('admin', 'password123');
    console.log('✓ Login successful:', user);
    return user;
  } catch (error) {
    console.error('✗ Login failed:', error.message);
    throw error;
  }
}

// Example 2: Handling invalid credentials
async function invalidCredentialsExample() {
  try {
    await login('wronguser', 'wrongpass');
  } catch (error) {
    console.error('✗ Expected error:', error.message);
    // Handle invalid credentials gracefully
  }
}

// Example 3: Handling null/empty inputs
async function inputValidationExample() {
  try {
    await login(null, 'password');
  } catch (error) {
    console.error('✗ Expected error:', error.message);
    // Handle validation errors
  }
}

// Example 4: Using custom timeout
async function customTimeoutExample() {
  try {
    const user = await login('admin', 'password123', { timeout: 10000 });
    console.log('✓ Login successful with custom timeout:', user);
  } catch (error) {
    console.error('✗ Login failed:', error.message);
  }
}

// Example 5: Comprehensive error handling in a real application
async function comprehensiveErrorHandling(username, password) {
  try {
    // Attempt login
    const user = await login(username, password);
    
    // Store user session
    console.log('User logged in:', user.username);
    return { success: true, user };
    
  } catch (error) {
    // Log the error for monitoring
    console.error('Login error:', error.message);
    
    // Return user-friendly error messages
    if (error.message === 'Invalid credentials') {
      return { 
        success: false, 
        error: 'The username or password you entered is incorrect.' 
      };
    }
    
    if (error.message.includes('timeout')) {
      return { 
        success: false, 
        error: 'The login service is currently slow. Please try again.' 
      };
    }
    
    if (error.message.includes('Connection error')) {
      return { 
        success: false, 
        error: 'Unable to connect to login service. Please check your connection.' 
      };
    }
    
    if (error.message.includes('required') || error.message.includes('must be')) {
      return { 
        success: false, 
        error: 'Please enter both username and password.' 
      };
    }
    
    // Generic error
    return { 
      success: false, 
      error: 'An unexpected error occurred. Please try again later.' 
    };
  }
}

// Run examples
if (require.main === module) {
  (async () => {
    console.log('=== Login Function Examples ===\n');
    
    console.log('Example 1: Successful login');
    await successfulLoginExample();
    console.log('');
    
    console.log('Example 2: Invalid credentials');
    await invalidCredentialsExample();
    console.log('');
    
    console.log('Example 3: Input validation');
    await inputValidationExample();
    console.log('');
    
    console.log('Example 4: Custom timeout');
    await customTimeoutExample();
    console.log('');
    
    console.log('Example 5: Comprehensive error handling');
    console.log(await comprehensiveErrorHandling('admin', 'password123'));
    console.log(await comprehensiveErrorHandling('wrong', 'creds'));
    console.log(await comprehensiveErrorHandling(null, 'password'));
  })();
}

module.exports = {
  successfulLoginExample,
  invalidCredentialsExample,
  inputValidationExample,
  customTimeoutExample,
  comprehensiveErrorHandling
};
