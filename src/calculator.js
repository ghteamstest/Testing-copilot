/**
 * Calculator class for basic mathematical operations
 * This is a perfect example for testing Copilot's code completion and suggestion features
 */
class Calculator {
    /**
     * Add two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Sum of a and b
     */
    add(a, b) {
        return a + b;
    }

    /**
     * Subtract two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Difference of a and b
     */
    subtract(a, b) {
        return a - b;
    }

    /**
     * Multiply two numbers
     * @param {number} a - First number
     * @param {number} b - Second number
     * @returns {number} Product of a and b
     */
    multiply(a, b) {
        return a * b;
    }

    /**
     * Divide two numbers
     * @param {number} a - Dividend
     * @param {number} b - Divisor
     * @returns {number} Quotient of a and b
     * @throws {Error} If divisor is zero
     */
    divide(a, b) {
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return a / b;
    }

    /**
     * Calculate the power of a number
     * @param {number} base - Base number
     * @param {number} exponent - Exponent
     * @returns {number} Base raised to the power of exponent
     */
    power(base, exponent) {
        return Math.pow(base, exponent);
    }

    /**
     * Calculate the square root of a number
     * @param {number} num - Number to find square root of
     * @returns {number} Square root of the number
     * @throws {Error} If number is negative
     */
    sqrt(num) {
        if (num < 0) {
            throw new Error('Cannot calculate square root of negative number');
        }
        return Math.sqrt(num);
    }

    /**
     * Calculate the factorial of a number
     * @param {number} n - Number to calculate factorial of
     * @returns {number} Factorial of n
     * @throws {Error} If number is negative
     */
    factorial(n) {
        if (n < 0) {
            throw new Error('Cannot calculate factorial of negative number');
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * this.factorial(n - 1);
    }
}

module.exports = { Calculator };