// GitHub Copilot Testing Examples
// This file contains basic functions to test Copilot's code completion and suggestions

/**
 * Simple function to demonstrate basic arithmetic
 */
function add(a, b) {
    return a + b;
}

/**
 * Function to demonstrate string manipulation
 */
function greetUser(name) {
    return `Hello, ${name}! Welcome to GitHub Copilot testing.`;
}

/**
 * Function to demonstrate array operations
 */
function findMax(numbers) {
    if (numbers.length === 0) return null;
    return Math.max(...numbers);
}

// Export functions for testing
module.exports = {
    add,
    greetUser,
    findMax
};