/**
 * Data processing utilities for arrays and objects
 * Great for testing Copilot's array manipulation and functional programming suggestions
 */
class DataProcessor {
    /**
     * Calculate sum of an array of numbers
     * @param {number[]} numbers - Array of numbers
     * @returns {number} Sum of all numbers
     */
    sum(numbers) {
        return numbers.reduce((acc, num) => acc + num, 0);
    }

    /**
     * Calculate average of an array of numbers
     * @param {number[]} numbers - Array of numbers
     * @returns {number} Average of all numbers
     */
    average(numbers) {
        if (numbers.length === 0) return 0;
        return this.sum(numbers) / numbers.length;
    }

    /**
     * Find maximum value in array
     * @param {number[]} numbers - Array of numbers
     * @returns {number} Maximum value
     */
    max(numbers) {
        return Math.max(...numbers);
    }

    /**
     * Find minimum value in array
     * @param {number[]} numbers - Array of numbers
     * @returns {number} Minimum value
     */
    min(numbers) {
        return Math.min(...numbers);
    }

    /**
     * Filter even numbers from array
     * @param {number[]} numbers - Array of numbers
     * @returns {number[]} Array of even numbers
     */
    filterEven(numbers) {
        return numbers.filter(num => num % 2 === 0);
    }

    /**
     * Filter odd numbers from array
     * @param {number[]} numbers - Array of numbers
     * @returns {number[]} Array of odd numbers
     */
    filterOdd(numbers) {
        return numbers.filter(num => num % 2 !== 0);
    }

    /**
     * Square all numbers in array
     * @param {number[]} numbers - Array of numbers
     * @returns {number[]} Array of squared numbers
     */
    square(numbers) {
        return numbers.map(num => num * num);
    }

    /**
     * Remove duplicates from array
     * @param {any[]} array - Input array
     * @returns {any[]} Array without duplicates
     */
    removeDuplicates(array) {
        return [...new Set(array)];
    }

    /**
     * Group array elements by a key function
     * @param {any[]} array - Input array
     * @param {function} keyFn - Function to generate group key
     * @returns {Object} Grouped object
     */
    groupBy(array, keyFn) {
        return array.reduce((groups, item) => {
            const key = keyFn(item);
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(item);
            return groups;
        }, {});
    }

    /**
     * Sort array of objects by property
     * @param {Object[]} array - Array of objects
     * @param {string} property - Property to sort by
     * @param {boolean} ascending - Sort order (default: true)
     * @returns {Object[]} Sorted array
     */
    sortByProperty(array, property, ascending = true) {
        return array.sort((a, b) => {
            if (ascending) {
                return a[property] > b[property] ? 1 : -1;
            } else {
                return a[property] < b[property] ? 1 : -1;
            }
        });
    }

    /**
     * Chunk array into smaller arrays of specified size
     * @param {any[]} array - Input array
     * @param {number} size - Chunk size
     * @returns {any[][]} Array of chunks
     */
    chunk(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }

    /**
     * Find intersection of two arrays
     * @param {any[]} array1 - First array
     * @param {any[]} array2 - Second array
     * @returns {any[]} Common elements
     */
    intersection(array1, array2) {
        return array1.filter(item => array2.includes(item));
    }

    /**
     * Calculate median of an array of numbers
     * @param {number[]} numbers - Array of numbers
     * @returns {number} Median value
     */
    median(numbers) {
        const sorted = [...numbers].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        
        if (sorted.length % 2 === 0) {
            return (sorted[mid - 1] + sorted[mid]) / 2;
        } else {
            return sorted[mid];
        }
    }
}

module.exports = { DataProcessor };