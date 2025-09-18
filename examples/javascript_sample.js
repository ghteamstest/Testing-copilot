/**
 * JavaScript sample file for testing GitHub Copilot PR functionality.
 * 
 * This file contains common JavaScript patterns and functions that can be
 * used to test Copilot's code completion during PR reviews.
 */

// Sample utility functions
class StringUtils {
    /**
     * Capitalizes the first letter of a string
     * @param {string} str - The input string
     * @returns {string} - The capitalized string
     */
    static capitalize(str) {
        if (!str || typeof str !== 'string') {
            return '';
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    /**
     * Reverses a string
     * @param {string} str - The input string
     * @returns {string} - The reversed string
     */
    static reverse(str) {
        return str.split('').reverse().join('');
    }

    /**
     * Checks if a string is a palindrome
     * @param {string} str - The input string
     * @returns {boolean} - True if palindrome, false otherwise
     */
    static isPalindrome(str) {
        const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleaned === cleaned.split('').reverse().join('');
    }
}

// Array manipulation functions
class ArrayUtils {
    /**
     * Removes duplicates from an array
     * @param {Array} arr - The input array
     * @returns {Array} - Array with duplicates removed
     */
    static removeDuplicates(arr) {
        return [...new Set(arr)];
    }

    /**
     * Finds the intersection of two arrays
     * @param {Array} arr1 - First array
     * @param {Array} arr2 - Second array
     * @returns {Array} - Array containing common elements
     */
    static intersection(arr1, arr2) {
        return arr1.filter(item => arr2.includes(item));
    }

    /**
     * Chunks an array into smaller arrays of specified size
     * @param {Array} arr - The input array
     * @param {number} size - The chunk size
     * @returns {Array} - Array of chunks
     */
    static chunk(arr, size) {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }
}

// Async function examples
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    /**
     * Performs a GET request
     * @param {string} endpoint - The API endpoint
     * @returns {Promise} - Promise resolving to response data
     */
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('GET request failed:', error);
            throw error;
        }
    }

    /**
     * Performs a POST request
     * @param {string} endpoint - The API endpoint
     * @param {Object} data - The data to send
     * @returns {Promise} - Promise resolving to response data
     */
    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('POST request failed:', error);
            throw error;
        }
    }
}

// Event handling example
class EventManager {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribes to an event
     * @param {string} eventName - Name of the event
     * @param {Function} callback - Callback function
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    /**
     * Unsubscribes from an event
     * @param {string} eventName - Name of the event
     * @param {Function} callback - Callback function to remove
     */
    off(eventName, callback) {
        if (!this.events[eventName]) return;
        
        this.events[eventName] = this.events[eventName].filter(
            cb => cb !== callback
        );
    }

    /**
     * Emits an event
     * @param {string} eventName - Name of the event
     * @param {...any} args - Arguments to pass to callbacks
     */
    emit(eventName, ...args) {
        if (!this.events[eventName]) return;
        
        this.events[eventName].forEach(callback => {
            try {
                callback(...args);
            } catch (error) {
                console.error(`Error in event callback for ${eventName}:`, error);
            }
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        StringUtils,
        ArrayUtils,
        ApiClient,
        EventManager
    };
}