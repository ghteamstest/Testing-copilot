# Testing Copilot

This repository is designed for testing GitHub Copilot functionality and capabilities, featuring a comprehensive login system with robust error handling.

## Purpose

This project serves as a testing ground to evaluate and demonstrate various GitHub Copilot features, including:

- Code completion and suggestions
- Documentation generation
- Code refactoring assistance
- Bug detection and fixes
- Test case generation
- **Error handling implementation** (NEW)

## Features

### Login System with Error Handling

This repository now includes a comprehensive login function with advanced error handling capabilities:

- **Input Validation**: Comprehensive validation for usernames and passwords
- **Authentication Errors**: Proper handling of invalid credentials
- **Account Lockout Protection**: Automatic account locking after failed attempts
- **Network Error Handling**: Graceful handling of connection issues
- **Security Features**: XSS prevention, audit logging, and information disclosure protection
- **Comprehensive Testing**: Full test suite with 100% pass rate

### Files Added

- `login.js` - Main login function with error handling
- `test-login.js` - Comprehensive test suite 
- `ERROR_HANDLING_DOCS.md` - Detailed documentation
- `package.json` - Node.js project configuration

## Getting Started

### Prerequisites
- Node.js 12.0.0 or higher

### Installation & Usage

```bash
# Install dependencies (if any were added)
npm install

# Run the login demo
npm run demo

# Run the test suite
npm test

# Start the application
npm start
```

### Quick Test

```javascript
const { safeLogin } = require('./login.js');

// Test successful login
const result = await safeLogin('admin', 'admin123');
console.log(result);

// Test error handling
const errorResult = await safeLogin('admin', 'wrongpassword');
console.log(errorResult.error);
```

## Error Handling Examples

The login system demonstrates various error handling patterns:

- **ValidationError**: Empty/invalid inputs
- **InvalidCredentialsError**: Wrong username/password
- **AccountLockedError**: Too many failed attempts
- **NetworkError**: Connection issues
- **LoginError**: Base error class with metadata

See [ERROR_HANDLING_DOCS.md](./ERROR_HANDLING_DOCS.md) for detailed documentation.

## Testing

All error scenarios are thoroughly tested:

```bash
npm test
```

**Test Results**: 22/22 tests passing (100% success rate)

## GitHub Copilot Testing

This repository can be used to experiment with GitHub Copilot in various development scenarios:

1. Create new files and test Copilot's code suggestions
2. Write comments and let Copilot generate code
3. Refactor existing code with Copilot's assistance
4. Generate documentation and tests
5. **Test error handling patterns and security implementations**

## Contributing

This is a testing repository. Feel free to experiment and add examples of Copilot functionality.

## License

This project is for testing purposes only.