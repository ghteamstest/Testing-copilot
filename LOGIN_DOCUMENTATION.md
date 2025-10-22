# Login Function with Error Handling

This module provides a robust login function with comprehensive error handling.

## Features

The login function includes error handling for the following scenarios:

### Input Validation Errors

- **Null/Undefined Username**: Throws `"Username is required"` when username is null or undefined
- **Null/Undefined Password**: Throws `"Password is required"` when password is null or undefined
- **Empty Username**: Throws `"Username must be a non-empty string"` when username is empty or only whitespace
- **Empty Password**: Throws `"Password must be a non-empty string"` when password is empty or only whitespace
- **Invalid Type**: Throws appropriate errors when username or password are not strings

### Authentication Errors

- **Invalid Credentials**: Throws `"Invalid credentials"` when username/password combination is incorrect

### Timeout Errors

- **Login Timeout**: Throws `"Login timeout exceeded"` when the authentication takes longer than the specified timeout (default: 5000ms)

### Connection Errors

- **Connection Refused**: Throws `"Connection error: Unable to reach authentication server"` for ECONNREFUSED errors
- **DNS Errors**: Throws `"Connection error: Unable to reach authentication server"` for ENOTFOUND errors
- **Timeout Errors**: Throws `"Connection timeout: Authentication server not responding"` for ETIMEDOUT errors

## Usage

```javascript
const { login } = require('./login');

// Successful login
try {
  const user = await login('admin', 'password123');
  console.log('Login successful:', user);
} catch (error) {
  console.error('Login failed:', error.message);
}

// Login with custom timeout
try {
  const user = await login('admin', 'password123', { timeout: 10000 });
  console.log('Login successful:', user);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

## Error Examples

```javascript
// Null username
await login(null, 'password');
// Error: Username is required

// Empty password
await login('user', '');
// Error: Password must be a non-empty string

// Invalid credentials
await login('wronguser', 'wrongpass');
// Error: Invalid credentials

// Timeout
await login('admin', 'password123', { timeout: 1 });
// Error: Login timeout exceeded
```

## Running Tests

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

The test suite includes:
- 10 input validation tests
- 2 authentication tests
- 1 timeout handling test
- 3 edge case tests

All tests verify that appropriate errors are thrown with correct error messages.
