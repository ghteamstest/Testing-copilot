# Testing Copilot

This repository is designed for testing GitHub Copilot functionality and capabilities with a complete Node.js application.

## Purpose

This project serves as a comprehensive testing ground to evaluate and demonstrate various GitHub Copilot features, including:

- Code completion and suggestions
- Documentation generation
- Code refactoring assistance
- Bug detection and fixes
- Test case generation
- Integration testing
- Error handling patterns

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
```bash
npm install
```

### Running the Application
```bash
npm start
```

### Running Tests
```bash
npm test
```

## 📁 Project Structure

```
src/
├── index.js          # Main application entry point
├── calculator.js     # Mathematical operations and calculations
├── stringUtils.js    # String manipulation utilities
└── dataProcessor.js  # Array and data processing functions

tests/
├── calculator.test.js      # Unit tests for Calculator class
├── stringUtils.test.js     # Unit tests for StringUtils class
├── dataProcessor.test.js   # Unit tests for DataProcessor class
└── integration.test.js     # Integration tests

docs/
└── COPILOT_TESTING_GUIDE.md  # Comprehensive testing guide
```

## 🧪 Testing Copilot Features

This repository includes practical examples for testing:

### 1. **Code Completion**
- Mathematical operations with the Calculator class
- String manipulation with StringUtils
- Array processing with DataProcessor

### 2. **Test Generation**
- Comprehensive unit tests for all modules
- Edge case testing and error handling
- Integration testing across modules

### 3. **Documentation**
- JSDoc comments throughout
- Usage examples and patterns
- Comprehensive guides

## 🎯 Example Usage

```javascript
const { Calculator } = require('./src/calculator');
const { StringUtils } = require('./src/stringUtils');
const { DataProcessor } = require('./src/dataProcessor');

// Mathematical operations
const calc = new Calculator();
console.log(calc.add(2, 3));        // 5
console.log(calc.factorial(5));     // 120

// String manipulation
console.log(StringUtils.reverse('hello'));        // 'olleh'
console.log(StringUtils.isPalindrome('racecar')); // true

// Data processing
const processor = new DataProcessor();
const numbers = [1, 2, 3, 4, 5];
console.log(processor.sum(numbers));           // 15
console.log(processor.filterEven(numbers));    // [2, 4]
```

## 📖 Documentation

For detailed testing scenarios and Copilot usage patterns, see:
- [Copilot Testing Guide](docs/COPILOT_TESTING_GUIDE.md)

## Getting Started

This repository can be used to experiment with GitHub Copilot in various development scenarios:

1. **Code Completion**: Start typing functions and let Copilot suggest implementations
2. **Test Generation**: Write test descriptions and let Copilot generate test cases
3. **Refactoring**: Select code and request Copilot to improve or refactor it
4. **Documentation**: Add comments and let Copilot generate comprehensive docs

## Contributing

This is a testing repository. Feel free to experiment and add examples of Copilot functionality:

- Add new utility functions
- Create additional test cases
- Experiment with different coding patterns
- Test edge cases and error scenarios

## License

This project is for testing purposes only.