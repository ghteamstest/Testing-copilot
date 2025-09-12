/**
 * JavaScript example for testing GitHub Copilot functionality.
 * This file demonstrates various scenarios where Copilot can assist with code completion.
 */

// Basic function for Copilot to help complete
function calculateFactorial(n) {
    // TODO: Let Copilot complete this function
    if (n <= 1) return 1;
    // Copilot should suggest the recursive implementation
}

// Array manipulation functions
const arrayUtils = {
    // TODO: Let Copilot suggest array filtering implementation
    filterEvenNumbers: (numbers) => {
        // Implementation goes here
    },
    
    // TODO: Let Copilot suggest array mapping implementation
    doubleNumbers: (numbers) => {
        // Implementation goes here
    },
    
    // TODO: Let Copilot suggest array reduction implementation
    sumNumbers: (numbers) => {
        // Implementation goes here
    }
};

// Class for testing Copilot's OOP suggestions
class TaskManager {
    constructor() {
        this.tasks = [];
    }
    
    addTask(task) {
        // TODO: Let Copilot complete this method
        // Should add task with id, description, and completed status
    }
    
    completeTask(id) {
        // TODO: Let Copilot complete this method
        // Should mark task as completed by id
    }
    
    getPendingTasks() {
        // TODO: Let Copilot complete this method
        // Should return all uncompleted tasks
    }
    
    getCompletedTasks() {
        // TODO: Let Copilot complete this method
        // Should return all completed tasks
    }
}

// Async function for testing Copilot's async/await suggestions
async function fetchUserData(userId) {
    // TODO: Let Copilot suggest fetch implementation
    // Should handle errors and return user data
}

// API utility functions
const apiUtils = {
    // TODO: Let Copilot suggest GET request implementation
    get: async (url) => {
        // Implementation goes here
    },
    
    // TODO: Let Copilot suggest POST request implementation
    post: async (url, data) => {
        // Implementation goes here
    }
};

// Test the functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateFactorial,
        arrayUtils,
        TaskManager,
        fetchUserData,
        apiUtils
    };
} else {
    // Browser environment testing
    console.log('Factorial of 5:', calculateFactorial(5));
    console.log('Even numbers from [1,2,3,4,5,6]:', arrayUtils.filterEvenNumbers([1, 2, 3, 4, 5, 6]));
}