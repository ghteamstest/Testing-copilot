/**
 * PR Test - A simple test file to demonstrate GitHub Copilot functionality
 * 
 * This file contains various test scenarios that can be used to evaluate
 * GitHub Copilot's capabilities in:
 * - Code completion
 * - Bug detection
 * - Test generation
 * - Documentation
 */

// Simple calculator functions for testing
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
}

// Array utility functions
function findMax(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error("Input must be a non-empty array");
    }
    return Math.max(...numbers);
}

function reverseString(str) {
    if (typeof str !== 'string') {
        throw new Error("Input must be a string");
    }
    return str.split('').reverse().join('');
}

// Simple test runner
function runTests() {
    console.log("Running PR Tests...");
    
    try {
        // Test basic arithmetic
        console.assert(add(2, 3) === 5, "Addition test failed");
        console.assert(subtract(5, 3) === 2, "Subtraction test failed");
        console.assert(multiply(4, 3) === 12, "Multiplication test failed");
        console.assert(divide(10, 2) === 5, "Division test failed");
        
        // Test array utilities
        console.assert(findMax([1, 5, 3, 9, 2]) === 9, "FindMax test failed");
        console.assert(reverseString("hello") === "olleh", "ReverseString test failed");
        
        // Test error handling
        try {
            divide(10, 0);
            console.assert(false, "Division by zero should throw error");
        } catch (e) {
            console.assert(e.message === "Division by zero is not allowed", "Error message mismatch");
        }
        
        console.log("✅ All tests passed!");
        return true;
    } catch (error) {
        console.error("❌ Test failed:", error.message);
        return false;
    }
}

// Export functions for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        add,
        subtract,
        multiply,
        divide,
        findMax,
        reverseString,
        runTests
    };
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}