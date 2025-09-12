/**
 * Simple JavaScript greeting module for testing GitHub Copilot functionality.
 * This module demonstrates basic JavaScript syntax and functions.
 */

/**
 * Greets the user with a personalized message.
 * @param {string} name - The name to greet. Defaults to "World".
 * @returns {string} A greeting message.
 */
function greet(name = "World") {
    return `Hello, ${name}!`;
}

/**
 * Creates a greeting for multiple people.
 * @param {string[]} names - Array of names to greet.
 * @returns {string} A greeting message for all names.
 */
function greetMany(names) {
    if (!names || names.length === 0) {
        return greet();
    }
    
    if (names.length === 1) {
        return greet(names[0]);
    }
    
    const lastIndex = names.length - 1;
    const allButLast = names.slice(0, lastIndex).join(", ");
    return `Hello, ${allButLast} and ${names[lastIndex]}!`;
}

/**
 * Main function that demonstrates the greeting functionality.
 */
function main() {
    console.log(greet());
    console.log(greet("GitHub Copilot"));
    console.log(greetMany(["Alice", "Bob", "Charlie"]));
}

// Run if this is the main module (Node.js environment)
if (typeof require !== 'undefined' && require.main === module) {
    main();
}

// Export for use as a module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { greet, greetMany };
}