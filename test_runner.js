#!/usr/bin/env node
/**
 * Simple test runner for JavaScript Copilot examples
 * Demonstrates how Copilot can suggest test patterns and assertions
 */

const { CopilotTester, utilities } = require('./copilot_examples.js');

class SimpleTestRunner {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    /**
     * Add a test case
     * @param {string} name - Test name
     * @param {Function} testFn - Test function
     */
    test(name, testFn) {
        this.tests.push({ name, testFn });
    }

    /**
     * Assert that a condition is true
     * @param {boolean} condition - Condition to test
     * @param {string} message - Error message if assertion fails
     */
    assert(condition, message = 'Assertion failed') {
        if (!condition) {
            throw new Error(message);
        }
    }

    /**
     * Assert that two values are equal
     * @param {*} actual - Actual value
     * @param {*} expected - Expected value
     * @param {string} message - Error message if assertion fails
     */
    assertEqual(actual, expected, message = `Expected ${expected}, got ${actual}`) {
        if (actual !== expected) {
            throw new Error(message);
        }
    }

    /**
     * Assert that an array contains expected elements
     * @param {Array} array - Array to check
     * @param {*} element - Element that should be in array
     */
    assertContains(array, element) {
        if (!array.includes(element)) {
            throw new Error(`Array does not contain ${element}`);
        }
    }

    /**
     * Run all tests
     */
    async run() {
        console.log('🚀 Running Copilot Feature Tests...\n');
        
        for (const { name, testFn } of this.tests) {
            try {
                console.log(`⏳ Running: ${name}`);
                await testFn();
                console.log(`✅ PASSED: ${name}`);
                this.passed++;
            } catch (error) {
                console.error(`❌ FAILED: ${name}`);
                console.error(`   Error: ${error.message}`);
                this.failed++;
            }
        }

        console.log('\n📊 Test Results:');
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Total: ${this.tests.length}`);
        
        return this.failed === 0;
    }
}

// Create test runner instance
const runner = new SimpleTestRunner();

// Test cases for Copilot functionality
runner.test('CopilotTester instantiation', () => {
    const tester = new CopilotTester();
    runner.assert(tester instanceof CopilotTester, 'Should create CopilotTester instance');
    runner.assert(tester.config !== null, 'Should have config');
});

runner.test('Code completion simulation', () => {
    const tester = new CopilotTester();
    const suggestions = tester.testCodeCompletion('function');
    runner.assert(Array.isArray(suggestions), 'Should return array of suggestions');
    runner.assert(suggestions.length > 0, 'Should return at least one suggestion');
    runner.assertContains(suggestions, '() {');
});

runner.test('Quick sort algorithm', () => {
    const tester = new CopilotTester();
    const input = [3, 1, 4, 1, 5, 9, 2, 6];
    const sorted = tester.quickSort(input);
    const expected = [1, 1, 2, 3, 4, 5, 6, 9];
    
    runner.assertEqual(JSON.stringify(sorted), JSON.stringify(expected), 'Should sort array correctly');
});

runner.test('Data processing functionality', () => {
    const tester = new CopilotTester();
    const data = [1, 2, 3, 4, 5];
    const result = tester.processData(data);
    
    runner.assertEqual(result.total, 5, 'Should count total elements correctly');
    runner.assertEqual(result.sum, 15, 'Should calculate sum correctly');
    runner.assertEqual(result.average, 3, 'Should calculate average correctly');
    runner.assertEqual(result.max, 5, 'Should find maximum correctly');
    runner.assertEqual(result.min, 1, 'Should find minimum correctly');
});

runner.test('Input validation', () => {
    const tester = new CopilotTester();
    
    // Test valid inputs
    runner.assert(tester.validateInput(42), 'Should accept valid number');
    runner.assert(tester.validateInput([1, 2, 3]), 'Should accept valid array');
    
    // Test invalid inputs
    try {
        tester.validateInput(null);
        runner.assert(false, 'Should throw error for null input');
    } catch (error) {
        runner.assert(error.message.includes('null'), 'Should throw appropriate error for null');
    }
});

runner.test('Utility functions', () => {
    // Test ID generation
    const id = utilities.generateId(10);
    runner.assertEqual(id.length, 10, 'Should generate ID of correct length');
    runner.assert(/^[A-Za-z0-9]+$/.test(id), 'Should generate alphanumeric ID');
    
    // Test deep clone
    const original = { a: 1, b: { c: 2 } };
    const cloned = utilities.deepClone(original);
    runner.assertEqual(JSON.stringify(cloned), JSON.stringify(original), 'Should deep clone object');
    
    // Modify clone to ensure independence
    cloned.b.c = 99;
    runner.assertEqual(original.b.c, 2, 'Original should remain unchanged after cloning');
});

runner.test('Example method with options', () => {
    const tester = new CopilotTester();
    const result = tester.exampleMethod('test', 42, { verbose: false, timeout: 1000 });
    
    runner.assert(result.success, 'Should return success: true');
    runner.assertEqual(result.param1, 'test', 'Should preserve param1');
    runner.assertEqual(result.param2, 42, 'Should preserve param2');
    runner.assertEqual(result.timeout, 1000, 'Should use provided timeout');
    runner.assert(result.timestamp, 'Should include timestamp');
});

// Run the tests
if (require.main === module) {
    runner.run().then(success => {
        console.log('\n🎯 GitHub Copilot Testing Complete!');
        process.exit(success ? 0 : 1);
    }).catch(error => {
        console.error('Test runner error:', error);
        process.exit(1);
    });
}

module.exports = SimpleTestRunner;