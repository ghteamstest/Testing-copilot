/**
 * A simple Hello World example for testing GitHub Copilot functionality.
 * This file demonstrates basic JavaScript syntax and serves as a starting point
 * for testing Copilot's code completion and suggestion features.
 */

/**
 * A simple greeting function that says hello to the specified name.
 * @param {string} name - The name to greet. Defaults to "World".
 * @returns {string} A greeting message.
 */
function greet(name = "World") {
    return `Hello, ${name}!`;
}

/**
 * Main function to demonstrate the greeting functionality.
 */
function main() {
    // Basic greeting
    console.log(greet());
    
    // Personalized greeting
    console.log(greet("GitHub Copilot"));
    
    // Different greetings for testing
    const names = ["Developer", "Coder", "AI Assistant"];
    names.forEach(name => console.log(greet(name)));
}

// Run main function when script is executed directly
main();

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { greet, main };
}