# Testing Copilot

This repository is designed for testing GitHub Copilot functionality and capabilities.

## Purpose

This project serves as a testing ground to evaluate and demonstrate various GitHub Copilot features, including:

- Code completion and suggestions
- Documentation generation
- Code refactoring assistance
- Bug detection and fixes
- Test case generation

## Sanity Tests

This repository now includes a comprehensive sanity test suite to validate GitHub Copilot functionality:

### Quick Start
```bash
# Run all sanity tests
./run_sanity_tests.sh

# Or run individual tests
python3 sanity_test.py
node sanity_test.js
```

### Test Coverage
- **Python tests**: Basic functionality, data processing, algorithms, error handling
- **JavaScript tests**: ES6+ features, async operations, array methods, object manipulation
- **File operations**: Basic file I/O and text processing

### Documentation
See [SANITY_TESTS.md](SANITY_TESTS.md) for detailed information about the test suite.

## Getting Started

This repository can be used to experiment with GitHub Copilot in various development scenarios. Feel free to:

1. Create new files and test Copilot's code suggestions
2. Write comments and let Copilot generate code
3. Refactor existing code with Copilot's assistance
4. Generate documentation and tests
5. Run the sanity tests to validate Copilot functionality

## Files in this Repository

- `sanity_test.py` - Python sanity test suite
- `sanity_test.js` - JavaScript sanity test suite  
- `run_sanity_tests.sh` - Test runner script
- `SANITY_TESTS.md` - Detailed test documentation
- `README.md` - This file

## Contributing

This is a testing repository. Feel free to experiment and add examples of Copilot functionality.

## License

This project is for testing purposes only.