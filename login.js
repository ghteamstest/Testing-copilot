/**
 * Login function with comprehensive error handling
 * @param {string} username - The username for login
 * @param {string} password - The password for login
 * @param {object} options - Optional configuration (timeout, etc.)
 * @returns {Promise<object>} - Returns user data on success
 * @throws {Error} - Throws specific errors for different failure scenarios
 */
async function login(username, password, options = {}) {
  const { timeout = 5000 } = options;

  // Input validation
  if (username === null || username === undefined) {
    throw new Error('Username is required');
  }

  if (password === null || password === undefined) {
    throw new Error('Password is required');
  }

  if (typeof username !== 'string' || username.trim() === '') {
    throw new Error('Username must be a non-empty string');
  }

  if (typeof password !== 'string' || password.trim() === '') {
    throw new Error('Password must be a non-empty string');
  }

  // Simulate API call with timeout handling
  try {
    const loginPromise = authenticateUser(username, password);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Login timeout exceeded')), timeout)
    );

    const result = await Promise.race([loginPromise, timeoutPromise]);
    
    if (!result.success) {
      throw new Error('Invalid credentials');
    }

    return result.user;
  } catch (error) {
    // Handle different error types
    if (error.message === 'Login timeout exceeded') {
      throw error;
    }
    
    if (error.message === 'Invalid credentials') {
      throw error;
    }

    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      throw new Error('Connection error: Unable to reach authentication server');
    }

    if (error.code === 'ETIMEDOUT') {
      throw new Error('Connection timeout: Authentication server not responding');
    }

    // Generic error handling
    throw new Error(`Login failed: ${error.message}`);
  }
}

/**
 * Simulated authentication function
 * In a real application, this would make an API call
 */
async function authenticateUser(username, password) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Simulate authentication logic
  if (username === 'admin' && password === 'password123') {
    return {
      success: true,
      user: {
        id: 1,
        username: 'admin',
        email: 'admin@example.com'
      }
    };
  }

  return {
    success: false
  };
}

module.exports = { login };
