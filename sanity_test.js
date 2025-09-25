#!/usr/bin/env node
/**
 * JavaScript Sanity Test for GitHub Copilot
 * 
 * This file demonstrates Copilot capabilities in JavaScript including:
 * - Modern ES6+ syntax suggestions
 * - Async/await patterns
 * - Error handling
 * - DOM manipulation concepts
 * - API interaction patterns
 */

class JavaScriptSanityTest {
    constructor() {
        this.testResults = [];
        this.startTime = new Date();
    }

    /**
     * Run all JavaScript sanity tests
     * @returns {Promise<boolean>} True if all tests pass
     */
    async runAllTests() {
        console.log('🚀 Starting JavaScript Copilot Sanity Tests...');
        
        const tests = [
            this.testES6Features,
            this.testAsyncOperations,
            this.testArrayMethods,
            this.testObjectManipulation,
            this.testErrorHandling
        ];

        for (const test of tests) {
            try {
                const result = await test.call(this);
                this.testResults.push({
                    test: test.name,
                    status: result ? 'PASS' : 'FAIL',
                    timestamp: new Date().toISOString()
                });
                const statusEmoji = result ? "✅" : "❌";
                console.log(`${statusEmoji} ${test.name}: ${result ? 'PASSED' : 'FAILED'}`);
            } catch (error) {
                this.testResults.push({
                    test: test.name,
                    status: 'ERROR',
                    error: error.message,
                    timestamp: new Date().toISOString()
                });
                console.log(`💥 ${test.name}: ERROR - ${error.message}`);
            }
        }

        return this.testResults.every(result => result.status === 'PASS');
    }

    /**
     * Test ES6+ features that Copilot commonly suggests
     */
    testES6Features() {
        // Arrow functions
        const add = (a, b) => a + b;
        const multiply = (a, b) => a * b;

        // Template literals
        const name = "Copilot";
        const greeting = `Hello, ${name}! Welcome to the sanity test.`;

        // Destructuring
        const person = { firstName: "John", lastName: "Doe", age: 30 };
        const { firstName, lastName, age } = person;
        const fullName = `${firstName} ${lastName}`;

        // Spread operator
        const numbers = [1, 2, 3];
        const moreNumbers = [...numbers, 4, 5, 6];
        const maxNumber = Math.max(...moreNumbers);

        // Default parameters
        const greetUser = (name = "User", greeting = "Hello") => `${greeting}, ${name}!`;

        return (
            add(2, 3) === 5 &&
            multiply(4, 5) === 20 &&
            greeting.includes("Copilot") &&
            fullName === "John Doe" &&
            age === 30 &&
            moreNumbers.length === 6 &&
            maxNumber === 6 &&
            greetUser() === "Hello, User!" &&
            greetUser("Alice") === "Hello, Alice!"
        );
    }

    /**
     * Test asynchronous operations and promises
     */
    async testAsyncOperations() {
        // Promise-based delay function
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Async function with error handling
        const fetchData = async (url) => {
            try {
                // Simulate API call
                await delay(10);
                return { data: "mock data", status: 200 };
            } catch (error) {
                throw new Error(`Failed to fetch data: ${error.message}`);
            }
        };

        // Promise.all for concurrent operations
        const concurrentOperations = async () => {
            const promises = [
                fetchData("api/users"),
                fetchData("api/posts"),
                fetchData("api/comments")
            ];
            return await Promise.all(promises);
        };

        try {
            const singleResult = await fetchData("api/test");
            const multipleResults = await concurrentOperations();

            return (
                singleResult.status === 200 &&
                singleResult.data === "mock data" &&
                multipleResults.length === 3 &&
                multipleResults.every(result => result.status === 200)
            );
        } catch (error) {
            return false;
        }
    }

    /**
     * Test array methods that Copilot frequently suggests
     */
    testArrayMethods() {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const fruits = ["apple", "banana", "orange", "grape"];

        // Filter methods
        const evenNumbers = numbers.filter(n => n % 2 === 0);
        const longFruits = fruits.filter(fruit => fruit.length > 5);

        // Map methods
        const squaredNumbers = numbers.map(n => n ** 2);
        const uppercaseFruits = fruits.map(fruit => fruit.toUpperCase());

        // Reduce methods
        const sum = numbers.reduce((acc, n) => acc + n, 0);
        const product = numbers.slice(0, 5).reduce((acc, n) => acc * n, 1);

        // Find methods
        const firstEven = numbers.find(n => n % 2 === 0);
        const indexOfOrange = fruits.findIndex(fruit => fruit === "orange");

        // Some and every
        const hasEvenNumbers = numbers.some(n => n % 2 === 0);
        const allPositive = numbers.every(n => n > 0);

        return (
            evenNumbers.length === 5 &&
            longFruits.length === 2 &&  // Fixed: both "banana" and "orange" have length 6
            longFruits.includes("banana") &&
            squaredNumbers[2] === 9 &&
            uppercaseFruits[0] === "APPLE" &&
            sum === 55 &&
            product === 120 &&
            firstEven === 2 &&
            indexOfOrange === 2 &&
            hasEvenNumbers === true &&
            allPositive === true
        );
    }

    /**
     * Test object manipulation patterns
     */
    testObjectManipulation() {
        // Object creation and manipulation
        const createUser = (name, email, age) => ({
            name,
            email,
            age,
            isActive: true,
            lastLogin: new Date(),
            getDisplayName() {
                return `${this.name} (${this.email})`;
            }
        });

        // Object methods and property access
        const user = createUser("Alice Smith", "alice@example.com", 28);
        const displayName = user.getDisplayName();

        // Object destructuring and cloning
        const { name, email, age } = user;
        const userCopy = { ...user, age: 29 };

        // Object keys and values
        const userKeys = Object.keys(user);
        const hasNameProperty = userKeys.includes('name');

        // Dynamic property access
        const propertyName = 'email';
        const emailValue = user[propertyName];

        return (
            user.name === "Alice Smith" &&
            user.isActive === true &&
            displayName.includes("Alice Smith") &&
            userCopy.age === 29 &&
            user.age === 28 &&
            hasNameProperty === true &&
            emailValue === "alice@example.com"
        );
    }

    /**
     * Test error handling patterns
     */
    testErrorHandling() {
        // Try-catch with custom errors
        const validateAge = (age) => {
            if (typeof age !== 'number') {
                throw new TypeError('Age must be a number');
            }
            if (age < 0 || age > 150) {
                throw new RangeError('Age must be between 0 and 150');
            }
            return age;
        };

        // Error handling with promises
        const asyncValidation = async (data) => {
            try {
                if (!data) {
                    throw new Error('Data is required');
                }
                return { valid: true, data };
            } catch (error) {
                return { valid: false, error: error.message };
            }
        };

        // Test error scenarios
        let results = {
            validAge: false,
            invalidTypeAge: false,
            invalidRangeAge: false,
            validAsyncData: false,
            invalidAsyncData: false
        };

        try {
            validateAge(25);
            results.validAge = true;
        } catch (error) {
            // Should not reach here
        }

        try {
            validateAge("invalid");
        } catch (error) {
            results.invalidTypeAge = error instanceof TypeError;
        }

        try {
            validateAge(-5);
        } catch (error) {
            results.invalidRangeAge = error instanceof RangeError;
        }

        // Test async validation
        return asyncValidation({ test: "data" })
            .then(result => {
                results.validAsyncData = result.valid;
                return asyncValidation(null);
            })
            .then(result => {
                results.invalidAsyncData = !result.valid;
                return Object.values(results).every(Boolean);
            });
    }

    /**
     * Generate a comprehensive test report
     */
    generateReport() {
        const endTime = new Date();
        const duration = (endTime - this.startTime) / 1000;
        
        const passed = this.testResults.filter(result => result.status === 'PASS').length;
        const total = this.testResults.length;
        
        let report = `
=== JavaScript Copilot Sanity Test Report ===
Start Time: ${this.startTime.toISOString()}
End Time: ${endTime.toISOString()}
Duration: ${duration.toFixed(2)} seconds
Tests Passed: ${passed}/${total}
Success Rate: ${((passed/total)*100).toFixed(1)}%

Detailed Results:
`;
        
        this.testResults.forEach(result => {
            report += `- ${result.test}: ${result.status}`;
            if (result.error) {
                report += ` (${result.error})`;
            }
            report += '\n';
        });
        
        return report;
    }
}

/**
 * Main function to run the JavaScript sanity tests
 */
async function main() {
    console.log('JavaScript GitHub Copilot Sanity Test Suite');
    console.log('='.repeat(45));
    
    const sanityTest = new JavaScriptSanityTest();
    const success = await sanityTest.runAllTests();
    
    const report = sanityTest.generateReport();
    console.log(report);
    
    // Write report to file if running in Node.js environment
    if (typeof require !== 'undefined') {
        const fs = require('fs');
        fs.writeFileSync('js_sanity_test_report.txt', report);
    }
    
    process.exit(success ? 0 : 1);
}

// Run if this file is executed directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { JavaScriptSanityTest };