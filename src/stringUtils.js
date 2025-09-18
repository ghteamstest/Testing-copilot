/**
 * String utility functions for testing Copilot's string manipulation suggestions
 */
class StringUtils {
    /**
     * Reverse a string
     * @param {string} str - Input string
     * @returns {string} Reversed string
     */
    static reverse(str) {
        return str.split('').reverse().join('');
    }

    /**
     * Capitalize the first letter of each word
     * @param {string} str - Input string
     * @returns {string} Capitalized string
     */
    static capitalize(str) {
        return str.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    /**
     * Check if a string is a palindrome
     * @param {string} str - Input string
     * @returns {boolean} True if palindrome, false otherwise
     */
    static isPalindrome(str) {
        const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cleaned === cleaned.split('').reverse().join('');
    }

    /**
     * Count the number of words in a string
     * @param {string} str - Input string
     * @returns {number} Number of words
     */
    static wordCount(str) {
        return str.trim().split(/\s+/).filter(word => word.length > 0).length;
    }

    /**
     * Remove all whitespace from a string
     * @param {string} str - Input string
     * @returns {string} String without whitespace
     */
    static removeWhitespace(str) {
        return str.replace(/\s/g, '');
    }

    /**
     * Check if string contains only letters
     * @param {string} str - Input string
     * @returns {boolean} True if only letters, false otherwise
     */
    static isAlpha(str) {
        return /^[a-zA-Z]+$/.test(str);
    }

    /**
     * Check if string contains only numbers
     * @param {string} str - Input string
     * @returns {boolean} True if only numbers, false otherwise
     */
    static isNumeric(str) {
        return /^[0-9]+$/.test(str);
    }

    /**
     * Truncate string to specified length with ellipsis
     * @param {string} str - Input string
     * @param {number} length - Maximum length
     * @returns {string} Truncated string
     */
    static truncate(str, length) {
        if (str.length <= length) {
            return str;
        }
        return str.slice(0, length - 3) + '...';
    }

    /**
     * Convert string to camelCase
     * @param {string} str - Input string
     * @returns {string} camelCase string
     */
    static toCamelCase(str) {
        return str.toLowerCase()
            .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
    }

    /**
     * Convert string to snake_case
     * @param {string} str - Input string
     * @returns {string} snake_case string
     */
    static toSnakeCase(str) {
        return str.replace(/([A-Z])/g, '_$1')
            .toLowerCase()
            .replace(/^_/, '')
            .replace(/[-\s]+/g, '_');
    }
}

module.exports = { StringUtils };