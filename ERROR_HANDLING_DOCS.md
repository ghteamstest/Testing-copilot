# Login Function Error Handling Documentation

This document describes the comprehensive error handling implementation for the login function in this repository.

## Overview

The login function has been designed with robust error handling to manage various failure scenarios that can occur during user authentication. The implementation follows best practices for security, usability, and maintainability.

## Error Types

### 1. ValidationError
**Error Code:** `VALIDATION_ERROR`

Thrown when input validation fails. Common scenarios:
- Empty or null username/password
- Username/password exceeding length limits
- Invalid characters in username (potential XSS protection)
- Non-string input types

```javascript
// Example usage
try {
    await login('', 'password');
} catch (error) {
    if (error instanceof ValidationError) {
        console.log('Input validation failed:', error.message);
    }
}
```

### 2. InvalidCredentialsError
**Error Code:** `INVALID_CREDENTIALS`

Thrown when authentication fails due to incorrect credentials or non-existent users. This error is intentionally generic to prevent username enumeration attacks.

```javascript
// Example usage
try {
    await login('user', 'wrongpassword');
} catch (error) {
    if (error instanceof InvalidCredentialsError) {
        console.log('Login failed - check your credentials');
    }
}
```

### 3. AccountLockedError
**Error Code:** `ACCOUNT_LOCKED`

Thrown when an account is locked due to too many failed login attempts. Includes lockout duration and retry information.

```javascript
// Example usage
try {
    await login('lockeduser', 'password');
} catch (error) {
    if (error instanceof AccountLockedError) {
        console.log('Account temporarily locked. Try again later.');
    }
}
```

### 4. NetworkError
**Error Code:** `NETWORK_ERROR`

Thrown when network/server communication fails during authentication.

```javascript
// Example usage
try {
    await login('user', 'password');
} catch (error) {
    if (error instanceof NetworkError) {
        console.log('Network error - please try again');
    }
}
```

### 5. LoginError (Base Class)
**Error Code:** `LOGIN_ERROR` or custom codes

Base class for all login-related errors. Provides common functionality like timestamps and duration tracking.

## Error Properties

All login errors include the following properties:

- `name`: Error type name
- `message`: Human-readable error description
- `errorCode`: Machine-readable error code
- `timestamp`: ISO timestamp when error occurred
- `duration`: Time taken before error occurred
- `originalError`: Original error (if wrapped)

## Security Features

### 1. Account Lockout Protection
- Accounts are locked after 3 consecutive failed attempts
- Lockout duration: 5 minutes
- Failed attempts are reset on successful login
- Lockout expiration is automatic

### 2. Input Validation
- Prevents XSS attacks through input sanitization
- Enforces reasonable length limits
- Type checking for all inputs
- SQL injection prevention through parameterized queries (when applicable)

### 3. Information Disclosure Prevention
- Generic error messages for authentication failures
- No distinction between invalid username vs. invalid password
- No user enumeration through error messages

### 4. Audit Logging
- All login attempts are logged with timestamps
- Successful and failed attempts are tracked
- Error codes included for debugging
- Performance metrics recorded

## Usage Examples

### Basic Login with Error Handling

```javascript
const { login } = require('./login.js');

async function authenticateUser(username, password) {
    try {
        const result = await login(username, password);
        console.log('Login successful:', result.sessionToken);
        return result;
    } catch (error) {
        switch (error.errorCode) {
            case 'VALIDATION_ERROR':
                console.log('Please check your input:', error.message);
                break;
            case 'INVALID_CREDENTIALS':
                console.log('Invalid username or password');
                break;
            case 'ACCOUNT_LOCKED':
                console.log('Account locked. Please try again later.');
                break;
            case 'NETWORK_ERROR':
                console.log('Connection error. Please check your internet connection.');
                break;
            default:
                console.log('Login failed:', error.message);
        }
        throw error;
    }
}
```

### Safe Login (No Exceptions)

```javascript
const { safeLogin } = require('./login.js');

async function safeAuthenticateUser(username, password) {
    const result = await safeLogin(username, password);
    
    if (result.success) {
        console.log('Login successful:', result.data.sessionToken);
        return result.data;
    } else {
        console.log('Login failed:', result.error.message);
        return null;
    }
}
```

### Frontend Integration Example

```javascript
// Example for web frontend
async function handleLoginForm(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const result = await safeLogin(username, password);
    
    if (result.success) {
        // Redirect to dashboard
        window.location.href = '/dashboard';
    } else {
        // Display error message
        const errorElement = document.getElementById('error-message');
        
        switch (result.error.code) {
            case 'VALIDATION_ERROR':
                errorElement.textContent = 'Please fill in all fields correctly';
                break;
            case 'INVALID_CREDENTIALS':
                errorElement.textContent = 'Invalid username or password';
                break;
            case 'ACCOUNT_LOCKED':
                errorElement.textContent = 'Account temporarily locked. Please try again later.';
                break;
            case 'NETWORK_ERROR':
                errorElement.textContent = 'Connection error. Please try again.';
                break;
            default:
                errorElement.textContent = 'Login failed. Please try again.';
        }
        errorElement.style.display = 'block';
    }
}
```

## Testing

The implementation includes comprehensive test coverage for all error scenarios:

```bash
# Run all tests
npm test

# Run demo with examples
npm run demo
```

### Test Coverage

- ✅ Input validation errors
- ✅ Authentication failures
- ✅ Account lockout scenarios
- ✅ Network error handling
- ✅ Successful login flows
- ✅ Error object structure validation
- ✅ Edge cases and boundary conditions

## Configuration

Key configuration constants that can be adjusted:

```javascript
const MAX_FAILED_ATTEMPTS = 3;           // Failed attempts before lockout
const LOCKOUT_DURATION = 5 * 60 * 1000;  // Lockout duration in milliseconds
```

## Best Practices

1. **Always use try-catch blocks** when calling the login function
2. **Use safeLogin() for simpler error handling** when you prefer result objects over exceptions
3. **Log all authentication events** for security monitoring
4. **Display generic error messages** to users to prevent information disclosure
5. **Implement rate limiting** at the application/network level for additional protection
6. **Use HTTPS** for all authentication requests in production
7. **Store passwords securely** using proper hashing algorithms (bcrypt, Argon2, etc.)

## Security Considerations

- This implementation is for demonstration purposes
- In production, use proper password hashing
- Implement additional rate limiting at network/application level
- Use secure session management
- Implement proper CSRF protection
- Use secure HTTP headers
- Implement proper logging and monitoring

## Future Enhancements

Potential improvements for production use:

1. **Database Integration**: Replace in-memory user storage with secure database
2. **Password Hashing**: Implement bcrypt or Argon2 for password security
3. **Session Management**: Add proper session token validation and expiration
4. **Multi-Factor Authentication**: Support for 2FA/MFA
5. **Rate Limiting**: Advanced rate limiting with IP-based restrictions
6. **Audit Logging**: Enhanced logging with structured logs
7. **Metrics**: Performance and security metrics collection
8. **Configuration**: Environment-based configuration management