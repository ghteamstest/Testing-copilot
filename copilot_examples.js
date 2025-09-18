/**
 * JavaScript examples for testing GitHub Copilot functionality
 * This file demonstrates Copilot's ability to work across different languages
 */

// Configuration object for Copilot testing
const copilotTestConfig = {
    apiEndpoint: 'https://api.github.com',
    timeout: 30000,
    retries: 3,
    featuresToTest: [
        'autocompletion',
        'codeGeneration',
        'documentationSuggestions',
        'errorDetection',
        'refactoring'
    ]
};

/**
 * Class to demonstrate Copilot's object-oriented suggestions
 */
class CopilotTester {
    constructor(config = copilotTestConfig) {
        this.config = config;
        this.testResults = [];
    }

    /**
     * Test code completion functionality
     * @param {string} partialCode - Incomplete code snippet
     * @returns {Array} Suggested completions
     */
    testCodeCompletion(partialCode) {
        // Simulate code completion testing
        const suggestions = [];
        
        if (partialCode.includes('function')) {
            suggestions.push('() {', '(params) {', 'name() {');
        }
        
        if (partialCode.includes('for')) {
            suggestions.push('(let i = 0; i < array.length; i++)', '(const item of array)', '(const [key, value] of Object.entries(obj))');
        }
        
        return suggestions;
    }

    /**
     * Test algorithm generation capabilities
     * @param {Array} numbers - Array of numbers to sort
     * @returns {Array} Sorted array
     */
    quickSort(numbers) {
        if (numbers.length <= 1) {
            return numbers;
        }
        
        const pivot = numbers[Math.floor(numbers.length / 2)];
        const left = numbers.filter(x => x < pivot);
        const middle = numbers.filter(x => x === pivot);
        const right = numbers.filter(x => x > pivot);
        
        return [...this.quickSort(left), ...middle, ...this.quickSort(right)];
    }

    /**
     * Test async/await pattern suggestions
     * @param {string} url - API endpoint URL
     * @returns {Promise} API response
     */
    async fetchData(url) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    /**
     * Test functional programming suggestions
     * @param {Array} data - Input data array
     * @returns {Object} Processed data statistics
     */
    processData(data) {
        return {
            total: data.length,
            sum: data.reduce((acc, val) => acc + val, 0),
            average: data.reduce((acc, val) => acc + val, 0) / data.length,
            max: Math.max(...data),
            min: Math.min(...data),
            filtered: data.filter(x => x > 0),
            doubled: data.map(x => x * 2),
            evenNumbers: data.filter(x => x % 2 === 0)
        };
    }

    /**
     * Test error handling patterns
     * @param {*} input - Input to validate
     * @throws {Error} If input is invalid
     */
    validateInput(input) {
        if (input === null || input === undefined) {
            throw new Error('Input cannot be null or undefined');
        }
        
        if (typeof input !== 'number' && !Array.isArray(input)) {
            throw new Error('Input must be a number or array');
        }
        
        if (Array.isArray(input) && input.length === 0) {
            throw new Error('Array cannot be empty');
        }
        
        return true;
    }

    /**
     * Test documentation generation
     * This method demonstrates how Copilot can suggest comprehensive JSDoc
     */
    exampleMethod(param1, param2, options = {}) {
        /**
         * @param {string} param1 - First parameter description
         * @param {number} param2 - Second parameter description  
         * @param {Object} options - Optional configuration object
         * @param {boolean} options.verbose - Enable verbose output
         * @param {number} options.timeout - Timeout in milliseconds
         * @returns {Object} Result object with processed data
         * @example
         * const result = tester.exampleMethod('test', 42, { verbose: true });
         * console.log(result.success); // true
         */
        const { verbose = false, timeout = 5000 } = options;
        
        if (verbose) {
            console.log(`Processing ${param1} with value ${param2}`);
        }
        
        return {
            success: true,
            param1,
            param2,
            timestamp: new Date().toISOString(),
            timeout
        };
    }
}

// Utility functions that demonstrate various JavaScript patterns
const utilities = {
    /**
     * Debounce function for performance optimization
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Deep clone an object
     * @param {*} obj - Object to clone
     * @returns {*} Deep cloned object
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        if (obj instanceof Array) {
            return obj.map(item => this.deepClone(item));
        }
        
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    },

    /**
     * Generate random ID
     * @param {number} length - Length of the ID
     * @returns {string} Random ID
     */
    generateId(length = 8) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
};

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CopilotTester, utilities, copilotTestConfig };
}

// Example usage and testing
const tester = new CopilotTester();
console.log('Copilot Tester initialized with config:', tester.config);