# PR Testing with GitHub Copilot

This directory contains test files and examples specifically designed for testing GitHub Copilot functionality during Pull Request workflows.

## Structure

```
├── examples/           # Sample code files in different languages
│   ├── cpp_sample.cpp      # C++ examples with classes and templates
│   └── javascript_sample.js # JavaScript utilities and async patterns
├── scripts/            # Test execution scripts
│   └── run_tests.sh        # Main test runner script
└── tests/              # Unit tests and test cases
    └── test_basic.py       # Python unit tests with various patterns
```

## Usage

### Running Tests

1. **All Tests**: Execute the main test runner
   ```bash
   chmod +x scripts/run_tests.sh
   ./scripts/run_tests.sh
   ```

2. **Python Tests Only**:
   ```bash
   python3 tests/test_basic.py
   ```

3. **JavaScript Syntax Check**:
   ```bash
   node -c examples/javascript_sample.js
   ```

4. **C++ Compilation Check**:
   ```bash
   g++ -std=c++14 examples/cpp_sample.cpp -o test_cpp
   ```

### Testing GitHub Copilot in PRs

These files are designed to help test various GitHub Copilot scenarios:

1. **Code Completion**: Open any file and start typing - Copilot should suggest completions
2. **Function Generation**: Add function comments and let Copilot generate implementations
3. **Test Case Generation**: Add test method stubs and let Copilot suggest test cases
4. **Code Refactoring**: Select code and ask Copilot to suggest improvements
5. **Documentation**: Add comment blocks and let Copilot generate documentation

## Example Testing Scenarios

### Scenario 1: Adding New Functions
1. Open `tests/test_basic.py`
2. Add a new test method with just the method signature
3. Let Copilot suggest the test implementation

### Scenario 2: Extending Classes
1. Open `examples/javascript_sample.js`
2. Add a new method stub to any existing class
3. Let Copilot suggest the implementation

### Scenario 3: Error Handling
1. Open any file
2. Add try-catch blocks or error handling patterns
3. Let Copilot suggest appropriate error handling code

## Languages Covered

- **Python**: Object-oriented programming, unit testing, type hints
- **JavaScript**: ES6+ features, async/await, classes, modules
- **C++**: Modern C++ features, templates, smart pointers, STL

## Best Practices for PR Testing

1. **Small Changes**: Make incremental changes to test specific Copilot features
2. **Clear Context**: Provide clear comments and function signatures for better suggestions
3. **Multiple Languages**: Test across different programming languages
4. **Edge Cases**: Include error handling and edge case scenarios
5. **Documentation**: Test documentation generation capabilities

## Contributing to Tests

When adding new test files:

1. Follow the existing code style and patterns
2. Include comprehensive comments for better Copilot context
3. Add both positive and negative test cases
4. Update this README if adding new testing scenarios