/**
 * Test suite for Calculator class
 * This demonstrates Copilot's ability to generate comprehensive test cases
 */

const { Calculator } = require('../src/calculator');

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    describe('add', () => {
        test('should add two positive numbers correctly', () => {
            expect(calculator.add(2, 3)).toBe(5);
        });

        test('should add negative numbers correctly', () => {
            expect(calculator.add(-2, -3)).toBe(-5);
        });

        test('should add positive and negative numbers correctly', () => {
            expect(calculator.add(5, -3)).toBe(2);
        });

        test('should handle zero correctly', () => {
            expect(calculator.add(0, 5)).toBe(5);
            expect(calculator.add(5, 0)).toBe(5);
        });

        test('should handle decimal numbers', () => {
            expect(calculator.add(1.5, 2.5)).toBe(4);
        });
    });

    describe('subtract', () => {
        test('should subtract two positive numbers correctly', () => {
            expect(calculator.subtract(10, 4)).toBe(6);
        });

        test('should subtract negative numbers correctly', () => {
            expect(calculator.subtract(-2, -3)).toBe(1);
        });

        test('should handle zero correctly', () => {
            expect(calculator.subtract(5, 0)).toBe(5);
            expect(calculator.subtract(0, 5)).toBe(-5);
        });
    });

    describe('multiply', () => {
        test('should multiply two positive numbers correctly', () => {
            expect(calculator.multiply(3, 4)).toBe(12);
        });

        test('should multiply by zero', () => {
            expect(calculator.multiply(5, 0)).toBe(0);
        });

        test('should multiply negative numbers correctly', () => {
            expect(calculator.multiply(-3, 4)).toBe(-12);
            expect(calculator.multiply(-3, -4)).toBe(12);
        });
    });

    describe('divide', () => {
        test('should divide two numbers correctly', () => {
            expect(calculator.divide(20, 4)).toBe(5);
        });

        test('should handle decimal division', () => {
            expect(calculator.divide(7, 2)).toBe(3.5);
        });

        test('should throw error when dividing by zero', () => {
            expect(() => calculator.divide(5, 0)).toThrow('Division by zero is not allowed');
        });

        test('should handle negative division', () => {
            expect(calculator.divide(-20, 4)).toBe(-5);
            expect(calculator.divide(-20, -4)).toBe(5);
        });
    });

    describe('power', () => {
        test('should calculate power correctly', () => {
            expect(calculator.power(2, 3)).toBe(8);
            expect(calculator.power(5, 2)).toBe(25);
        });

        test('should handle power of zero', () => {
            expect(calculator.power(5, 0)).toBe(1);
        });

        test('should handle negative exponents', () => {
            expect(calculator.power(2, -2)).toBe(0.25);
        });
    });

    describe('sqrt', () => {
        test('should calculate square root correctly', () => {
            expect(calculator.sqrt(16)).toBe(4);
            expect(calculator.sqrt(25)).toBe(5);
        });

        test('should handle zero', () => {
            expect(calculator.sqrt(0)).toBe(0);
        });

        test('should throw error for negative numbers', () => {
            expect(() => calculator.sqrt(-4)).toThrow('Cannot calculate square root of negative number');
        });
    });

    describe('factorial', () => {
        test('should calculate factorial correctly', () => {
            expect(calculator.factorial(5)).toBe(120);
            expect(calculator.factorial(3)).toBe(6);
        });

        test('should handle base cases', () => {
            expect(calculator.factorial(0)).toBe(1);
            expect(calculator.factorial(1)).toBe(1);
        });

        test('should throw error for negative numbers', () => {
            expect(() => calculator.factorial(-1)).toThrow('Cannot calculate factorial of negative number');
        });
    });
});