/**
 * Integration tests for the entire application
 * Tests the interaction between different modules
 */

const { main } = require('../src/index');
const { Calculator } = require('../src/calculator');
const { StringUtils } = require('../src/stringUtils');
const { DataProcessor } = require('../src/dataProcessor');

describe('Integration Tests', () => {
    test('main function should run without errors', () => {
        // Capture console output
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        
        expect(() => main()).not.toThrow();
        
        // Verify that console.log was called (output was generated)
        expect(consoleSpy).toHaveBeenCalled();
        
        consoleSpy.mockRestore();
    });

    test('all modules should work together for complex calculations', () => {
        const calc = new Calculator();
        const processor = new DataProcessor();
        
        // Generate some test data
        const numbers = [1, 2, 3, 4, 5];
        
        // Use calculator for basic operations
        const sum = numbers.reduce((acc, num) => calc.add(acc, num), 0);
        
        // Use data processor to verify
        const processorSum = processor.sum(numbers);
        
        expect(sum).toBe(processorSum);
        expect(sum).toBe(15);
    });

    test('string utilities and data processor integration', () => {
        const processor = new DataProcessor();
        const words = ['hello', 'world', 'test', 'copilot'];
        
        // Process strings with StringUtils and then use DataProcessor
        const wordLengths = words.map(word => word.length);
        const averageLength = processor.average(wordLengths);
        
        expect(averageLength).toBe(5.25); // (5 + 5 + 4 + 7) / 4 = 5.25
    });

    test('complex data transformation pipeline', () => {
        const processor = new DataProcessor();
        
        // Simulate a data processing pipeline
        const rawData = [
            { name: 'Alice Johnson', score: 85, category: 'A' },
            { name: 'Bob Smith', score: 92, category: 'A' },
            { name: 'Charlie Brown', score: 78, category: 'B' },
            { name: 'Diana Prince', score: 96, category: 'A' }
        ];
        
        // Extract scores
        const scores = rawData.map(item => item.score);
        
        // Calculate statistics
        const avgScore = processor.average(scores);
        const maxScore = processor.max(scores);
        const minScore = processor.min(scores);
        
        // Group by category
        const grouped = processor.groupBy(rawData, item => item.category);
        
        expect(avgScore).toBe(87.75);
        expect(maxScore).toBe(96);
        expect(minScore).toBe(78);
        expect(grouped.A).toHaveLength(3);
        expect(grouped.B).toHaveLength(1);
    });

    test('mathematical operations with string formatting', () => {
        const calc = new Calculator();
        
        // Perform calculations
        const result1 = calc.power(2, 8);
        const result2 = calc.factorial(5);
        const result3 = calc.sqrt(144);
        
        // Format results as strings
        const formatted1 = `2^8 = ${result1}`;
        const formatted2 = `5! = ${result2}`;
        const formatted3 = `√144 = ${result3}`;
        
        // Verify calculations
        expect(result1).toBe(256);
        expect(result2).toBe(120);
        expect(result3).toBe(12);
        
        // Verify string formatting
        expect(formatted1).toBe('2^8 = 256');
        expect(formatted2).toBe('5! = 120');
        expect(formatted3).toBe('√144 = 12');
    });

    test('error handling across modules', () => {
        const calc = new Calculator();
        
        // Test that errors are properly thrown and can be caught
        expect(() => calc.divide(10, 0)).toThrow('Division by zero is not allowed');
        expect(() => calc.sqrt(-1)).toThrow('Cannot calculate square root of negative number');
        expect(() => calc.factorial(-1)).toThrow('Cannot calculate factorial of negative number');
    });
});