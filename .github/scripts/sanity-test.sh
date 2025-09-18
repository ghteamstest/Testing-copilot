#!/bin/bash

# PR Sanity Test Script
# This script performs comprehensive sanity checks on the repository

set -e

echo "🚀 Starting PR Sanity Tests..."
echo "================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to print test results
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ $2${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# Test 1: Check if repository has basic files
echo "📁 Testing repository structure..."

if [ -f "Readme.md" ]; then
    print_result 0 "README.md exists"
else
    print_result 1 "README.md is missing"
fi

if [ -d ".git" ]; then
    print_result 0 "Git repository initialized"
else
    print_result 1 "Git repository not found"
fi

# Test 2: Check README content quality
echo ""
echo "📖 Testing README content..."

if [ -f "Readme.md" ]; then
    # Check for title
    if grep -q "# Testing Copilot" Readme.md; then
        print_result 0 "README has proper main title"
    else
        print_result 1 "README missing main title"
    fi
    
    # Check for minimum content length
    word_count=$(wc -w < Readme.md)
    if [ "$word_count" -gt 50 ]; then
        print_result 0 "README has sufficient content ($word_count words)"
    else
        print_result 1 "README content is too short ($word_count words)"
    fi
    
    # Check for required sections
    required_sections=("Purpose" "Getting Started" "Contributing")
    for section in "${required_sections[@]}"; do
        if grep -q "## $section" Readme.md; then
            print_result 0 "README has '$section' section"
        else
            print_result 1 "README missing '$section' section"
        fi
    done
fi

# Test 3: Check for any suspicious files
echo ""
echo "🔍 Testing for unwanted files..."

# Check for common temporary/build files that shouldn't be committed
unwanted_patterns=("*.tmp" "*.log" "node_modules" ".DS_Store" "*.swp" "*.swo")
found_unwanted=false

for pattern in "${unwanted_patterns[@]}"; do
    if find . -name "$pattern" -type f | grep -q .; then
        print_result 1 "Found unwanted files matching: $pattern"
        found_unwanted=true
    fi
done

if [ "$found_unwanted" = false ]; then
    print_result 0 "No unwanted temporary files found"
fi

# Test 4: Git repository health
echo ""
echo "🔧 Testing Git repository health..."

# Check if we're in a clean state (for local testing)
if git status --porcelain | grep -q .; then
    print_result 1 "Repository has uncommitted changes"
else
    print_result 0 "Repository is in clean state"
fi

# Check if current branch has commits
if git log --oneline -1 >/dev/null 2>&1; then
    print_result 0 "Repository has commit history"
else
    print_result 1 "Repository has no commit history"
fi

# Final results
echo ""
echo "================================"
echo "🏁 Sanity Test Results:"
echo -e "  ${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "  ${RED}Failed: $TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All sanity tests passed!${NC}"
    exit 0
else
    echo -e "${RED}💥 Some sanity tests failed!${NC}"
    exit 1
fi