/**
 * Test suite for StringUtils class
 * Demonstrates testing static methods and string manipulation
 */

const { StringUtils } = require('../src/stringUtils');

describe('StringUtils', () => {
    describe('reverse', () => {
        test('should reverse a simple string', () => {
            expect(StringUtils.reverse('hello')).toBe('olleh');
        });

        test('should handle empty string', () => {
            expect(StringUtils.reverse('')).toBe('');
        });

        test('should handle single character', () => {
            expect(StringUtils.reverse('a')).toBe('a');
        });

        test('should handle string with spaces', () => {
            expect(StringUtils.reverse('hello world')).toBe('dlrow olleh');
        });
    });

    describe('capitalize', () => {
        test('should capitalize each word', () => {
            expect(StringUtils.capitalize('hello world')).toBe('Hello World');
        });

        test('should handle single word', () => {
            expect(StringUtils.capitalize('hello')).toBe('Hello');
        });

        test('should handle mixed case', () => {
            expect(StringUtils.capitalize('hELLo WoRLD')).toBe('Hello World');
        });

        test('should handle empty string', () => {
            expect(StringUtils.capitalize('')).toBe('');
        });
    });

    describe('isPalindrome', () => {
        test('should identify simple palindromes', () => {
            expect(StringUtils.isPalindrome('racecar')).toBe(true);
            expect(StringUtils.isPalindrome('level')).toBe(true);
        });

        test('should identify non-palindromes', () => {
            expect(StringUtils.isPalindrome('hello')).toBe(false);
            expect(StringUtils.isPalindrome('world')).toBe(false);
        });

        test('should ignore case and punctuation', () => {
            expect(StringUtils.isPalindrome('A man a plan a canal Panama')).toBe(true);
            expect(StringUtils.isPalindrome('race a car')).toBe(false);
        });

        test('should handle empty string', () => {
            expect(StringUtils.isPalindrome('')).toBe(true);
        });
    });

    describe('wordCount', () => {
        test('should count words correctly', () => {
            expect(StringUtils.wordCount('hello world')).toBe(2);
            expect(StringUtils.wordCount('one two three four')).toBe(4);
        });

        test('should handle single word', () => {
            expect(StringUtils.wordCount('hello')).toBe(1);
        });

        test('should handle empty string', () => {
            expect(StringUtils.wordCount('')).toBe(0);
            expect(StringUtils.wordCount('   ')).toBe(0);
        });

        test('should handle multiple spaces', () => {
            expect(StringUtils.wordCount('hello    world')).toBe(2);
        });
    });

    describe('removeWhitespace', () => {
        test('should remove all whitespace', () => {
            expect(StringUtils.removeWhitespace('hello world')).toBe('helloworld');
        });

        test('should handle multiple types of whitespace', () => {
            expect(StringUtils.removeWhitespace('hello\tworld\ntest')).toBe('helloworldtest');
        });

        test('should handle string with no whitespace', () => {
            expect(StringUtils.removeWhitespace('hello')).toBe('hello');
        });
    });

    describe('isAlpha', () => {
        test('should identify alphabetic strings', () => {
            expect(StringUtils.isAlpha('hello')).toBe(true);
            expect(StringUtils.isAlpha('ABC')).toBe(true);
        });

        test('should reject non-alphabetic strings', () => {
            expect(StringUtils.isAlpha('hello123')).toBe(false);
            expect(StringUtils.isAlpha('hello world')).toBe(false);
            expect(StringUtils.isAlpha('123')).toBe(false);
        });

        test('should handle empty string', () => {
            expect(StringUtils.isAlpha('')).toBe(false);
        });
    });

    describe('isNumeric', () => {
        test('should identify numeric strings', () => {
            expect(StringUtils.isNumeric('123')).toBe(true);
            expect(StringUtils.isNumeric('0')).toBe(true);
        });

        test('should reject non-numeric strings', () => {
            expect(StringUtils.isNumeric('123abc')).toBe(false);
            expect(StringUtils.isNumeric('12.5')).toBe(false);
            expect(StringUtils.isNumeric('')).toBe(false);
        });
    });

    describe('truncate', () => {
        test('should truncate long strings', () => {
            expect(StringUtils.truncate('hello world', 8)).toBe('hello...');
        });

        test('should not truncate short strings', () => {
            expect(StringUtils.truncate('hello', 10)).toBe('hello');
        });

        test('should handle exact length', () => {
            expect(StringUtils.truncate('hello', 5)).toBe('hello');
        });
    });

    describe('toCamelCase', () => {
        test('should convert to camelCase', () => {
            expect(StringUtils.toCamelCase('hello world')).toBe('helloWorld');
            expect(StringUtils.toCamelCase('hello-world')).toBe('helloWorld');
            expect(StringUtils.toCamelCase('hello_world')).toBe('helloWorld');
        });

        test('should handle single word', () => {
            expect(StringUtils.toCamelCase('hello')).toBe('hello');
        });
    });

    describe('toSnakeCase', () => {
        test('should convert to snake_case', () => {
            expect(StringUtils.toSnakeCase('helloWorld')).toBe('hello_world');
            expect(StringUtils.toSnakeCase('hello world')).toBe('hello_world');
            expect(StringUtils.toSnakeCase('hello-world')).toBe('hello_world');
        });

        test('should handle single word', () => {
            expect(StringUtils.toSnakeCase('hello')).toBe('hello');
        });
    });
});