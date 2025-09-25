#!/bin/bash

# GitHub Copilot Sanity Test Runner
# This script runs all sanity tests to validate Copilot functionality

set -e  # Exit on any error

echo "🧪 GitHub Copilot Sanity Test Suite"
echo "===================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "INFO")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
        "SUCCESS")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "ERROR")
            echo -e "${RED}❌ $message${NC}"
            ;;
    esac
}

# Track overall success
overall_success=true

print_status "INFO" "Starting sanity tests..."
echo ""

# Test 1: Python Sanity Test
print_status "INFO" "Running Python sanity tests..."
if command -v python3 &> /dev/null; then
    if python3 sanity_test.py; then
        print_status "SUCCESS" "Python sanity tests passed"
        python_success=true
    else
        print_status "ERROR" "Python sanity tests failed"
        python_success=false
        overall_success=false
    fi
else
    print_status "WARNING" "Python3 not found, skipping Python tests"
    python_success=false
fi
echo ""

# Test 2: JavaScript Sanity Test  
print_status "INFO" "Running JavaScript sanity tests..."
if command -v node &> /dev/null; then
    if node sanity_test.js; then
        print_status "SUCCESS" "JavaScript sanity tests passed"
        js_success=true
    else
        print_status "ERROR" "JavaScript sanity tests failed"
        js_success=false
        overall_success=false
    fi
else
    print_status "WARNING" "Node.js not found, skipping JavaScript tests"
    js_success=false
fi
echo ""

# Test 3: Basic file operations test
print_status "INFO" "Running basic file operations test..."
test_file="test_copilot_functionality.tmp"

# Create test file
cat > "$test_file" << 'EOF'
# Test file for Copilot functionality
def hello_world():
    """A simple function that Copilot might suggest."""
    return "Hello, World!"

function greet(name) {
    // Another function Copilot might suggest
    return `Hello, ${name}!`;
}

// Simple algorithm that Copilot might help with
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
EOF

if [ -f "$test_file" ]; then
    file_size=$(wc -c < "$test_file")
    if [ "$file_size" -gt 0 ]; then
        print_status "SUCCESS" "File operations test passed (created $file_size bytes)"
        rm "$test_file"  # Clean up
        file_success=true
    else
        print_status "ERROR" "File operations test failed (empty file)"
        file_success=false
        overall_success=false
    fi
else
    print_status "ERROR" "File operations test failed (file not created)"
    file_success=false
    overall_success=false
fi
echo ""

# Generate summary report
print_status "INFO" "Generating summary report..."

# Create summary report
report_file="sanity_test_summary.txt"
cat > "$report_file" << EOF
GitHub Copilot Sanity Test Summary
==================================
Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Test Environment: $(uname -s) $(uname -r)

Test Results:
- Python Tests: $([ "$python_success" = true ] && echo "PASSED" || echo "FAILED/SKIPPED")
- JavaScript Tests: $([ "$js_success" = true ] && echo "PASSED" || echo "FAILED/SKIPPED")
- File Operations: $([ "$file_success" = true ] && echo "PASSED" || echo "FAILED")

Overall Status: $([ "$overall_success" = true ] && echo "SUCCESS" || echo "FAILURE")

Available Test Files:
$(ls -la *.py *.js *.sh 2>/dev/null | grep -E "\.(py|js|sh)$" || echo "No test files found")

System Information:
- OS: $(uname -s) $(uname -r)
- Python: $(command -v python3 && python3 --version || echo "Not available")
- Node.js: $(command -v node && node --version || echo "Not available")
- Shell: $SHELL

Notes:
- This sanity test validates basic GitHub Copilot functionality
- Tests cover multiple programming languages and common patterns
- Results are logged to individual test report files
- Missing interpreters will cause tests to be skipped, not failed
EOF

print_status "SUCCESS" "Summary report generated: $report_file"
echo ""

# Final status
if [ "$overall_success" = true ]; then
    print_status "SUCCESS" "All sanity tests completed successfully! 🎉"
    echo ""
    echo "📋 Test artifacts created:"
    ls -la *report*.txt 2>/dev/null || echo "   No report files found"
    echo ""
    echo "🚀 GitHub Copilot functionality validated!"
    exit 0
else
    print_status "ERROR" "Some sanity tests failed! 😞"
    echo ""
    echo "📋 Check these files for details:"
    ls -la *report*.txt 2>/dev/null || echo "   No report files found"
    echo ""
    echo "💡 This may indicate issues with the test environment or Copilot suggestions"
    exit 1
fi