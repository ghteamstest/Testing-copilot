#!/bin/bash

# Test runner script for GitHub Copilot PR testing
# This script runs various tests and examples to validate the functionality

set -e

echo "======================================"
echo "GitHub Copilot PR Test Runner"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "SUCCESS")
            echo -e "${GREEN}✓ $message${NC}"
            ;;
        "ERROR")
            echo -e "${RED}✗ $message${NC}"
            ;;
        "INFO")
            echo -e "${YELLOW}ℹ $message${NC}"
            ;;
    esac
}

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Project root: $PROJECT_ROOT"
echo

# Test 1: Python tests
print_status "INFO" "Running Python tests..."
if command -v python3 &> /dev/null; then
    if cd "$PROJECT_ROOT" && python3 -m pytest tests/ -v 2>/dev/null; then
        print_status "SUCCESS" "Python tests passed"
    elif cd "$PROJECT_ROOT" && python3 tests/test_basic.py; then
        print_status "SUCCESS" "Python tests passed (using unittest)"
    else
        print_status "ERROR" "Python tests failed"
    fi
else
    print_status "ERROR" "Python3 not found"
fi

echo

# Test 2: JavaScript syntax check
print_status "INFO" "Checking JavaScript syntax..."
if command -v node &> /dev/null; then
    if node -c "$PROJECT_ROOT/examples/javascript_sample.js" 2>/dev/null; then
        print_status "SUCCESS" "JavaScript syntax is valid"
    else
        print_status "ERROR" "JavaScript syntax check failed"
    fi
else
    print_status "ERROR" "Node.js not found"
fi

echo

# Test 3: C++ compilation check
print_status "INFO" "Checking C++ compilation..."
if command -v g++ &> /dev/null; then
    if g++ -std=c++14 -c "$PROJECT_ROOT/examples/cpp_sample.cpp" -o /tmp/cpp_test.o 2>/dev/null; then
        print_status "SUCCESS" "C++ code compiles successfully"
        rm -f /tmp/cpp_test.o
    else
        print_status "ERROR" "C++ compilation failed"
    fi
else
    print_status "ERROR" "g++ compiler not found"
fi

echo

# Test 4: File structure validation
print_status "INFO" "Validating project structure..."
required_files=(
    "Readme.md"
    "tests/test_basic.py"
    "examples/javascript_sample.js"
    "examples/cpp_sample.cpp"
)

all_files_exist=true
for file in "${required_files[@]}"; do
    if [[ -f "$PROJECT_ROOT/$file" ]]; then
        print_status "SUCCESS" "Found: $file"
    else
        print_status "ERROR" "Missing: $file"
        all_files_exist=false
    fi
done

echo

# Test 5: Code quality checks
print_status "INFO" "Running basic code quality checks..."

# Check for common patterns that should exist
if grep -q "class.*:" "$PROJECT_ROOT/tests/test_basic.py"; then
    print_status "SUCCESS" "Python classes found"
else
    print_status "ERROR" "No Python classes found"
fi

if grep -q "function\|class" "$PROJECT_ROOT/examples/javascript_sample.js"; then
    print_status "SUCCESS" "JavaScript functions/classes found"
else
    print_status "ERROR" "No JavaScript functions/classes found"
fi

if grep -q "class.*{" "$PROJECT_ROOT/examples/cpp_sample.cpp"; then
    print_status "SUCCESS" "C++ classes found"
else
    print_status "ERROR" "No C++ classes found"
fi

echo

# Summary
echo "======================================"
echo "Test Summary"
echo "======================================"

if $all_files_exist; then
    print_status "SUCCESS" "All required files present"
    print_status "INFO" "PR test environment is ready for GitHub Copilot testing"
    exit 0
else
    print_status "ERROR" "Some files are missing"
    exit 1
fi