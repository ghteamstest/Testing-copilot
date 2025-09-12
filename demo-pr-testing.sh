#!/bin/bash
# PR Testing Demo Script
# This script demonstrates how to use the PR testing framework

echo "=== PR Testing Framework Demo ==="
echo

# Test directory exists
if [ ! -d "pr-testing" ]; then
    echo "Error: pr-testing directory not found!"
    echo "Please run this script from the repository root."
    exit 1
fi

echo "1. Running JavaScript PR Tests..."
echo "================================="
cd pr-testing
node -e "
const PRTester = require('./pr-test-examples.js');
const tester = new PRTester();
console.log('Starting PR tests with example data...');
tester.runAllTests();
console.log('✓ JavaScript tests completed');
"

echo
echo "2. Running Python PR Validation..."
echo "=================================="
python3 pr-validation.py

echo
echo "3. Framework Usage Examples..."
echo "============================="
echo "✓ Created comprehensive PR testing framework"
echo "✓ JavaScript module for interactive PR testing"
echo "✓ Python scripts for PR data validation"
echo "✓ Documented test scenarios and workflows"
echo "✓ Integration examples for GitHub Copilot testing"

echo
echo "=== Demo Complete ==="
echo "The PR testing framework is ready to use!"
echo "See pr-testing/README.md for detailed usage instructions."