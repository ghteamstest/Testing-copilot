/**
 * Main entry point for the Testing Copilot application
 * This file demonstrates various JavaScript patterns that GitHub Copilot can help with
 */

const { Calculator } = require('./calculator');
const { StringUtils } = require('./stringUtils');
const { DataProcessor } = require('./dataProcessor');

/**
 * Main function to demonstrate Copilot functionality
 */
function main() {
    console.log('🤖 GitHub Copilot Testing Application');
    console.log('=====================================');
    
    // Test Calculator functionality
    const calc = new Calculator();
    console.log('\n📊 Calculator Tests:');
    console.log(`2 + 3 = ${calc.add(2, 3)}`);
    console.log(`10 - 4 = ${calc.subtract(10, 4)}`);
    console.log(`5 * 6 = ${calc.multiply(5, 6)}`);
    console.log(`20 / 4 = ${calc.divide(20, 4)}`);
    
    // Test String utilities
    console.log('\n🔤 String Utilities Tests:');
    const testString = 'hello world';
    console.log(`Original: "${testString}"`);
    console.log(`Reversed: "${StringUtils.reverse(testString)}"`);
    console.log(`Capitalized: "${StringUtils.capitalize(testString)}"`);
    console.log(`Is palindrome: ${StringUtils.isPalindrome('racecar')}`);
    
    // Test Data processing
    console.log('\n📈 Data Processing Tests:');
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const processor = new DataProcessor();
    console.log(`Numbers: [${numbers.join(', ')}]`);
    console.log(`Sum: ${processor.sum(numbers)}`);
    console.log(`Average: ${processor.average(numbers)}`);
    console.log(`Even numbers: [${processor.filterEven(numbers).join(', ')}]`);
    console.log(`Squared: [${processor.square(numbers).join(', ')}]`);
}

// Run the application if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { main };