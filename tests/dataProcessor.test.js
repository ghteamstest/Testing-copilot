/**
 * Test suite for DataProcessor class
 * Demonstrates testing array manipulation and functional programming concepts
 */

const { DataProcessor } = require('../src/dataProcessor');

describe('DataProcessor', () => {
    let processor;
    const testNumbers = [1, 2, 3, 4, 5];
    const testObjects = [
        { name: 'Alice', age: 30, city: 'New York' },
        { name: 'Bob', age: 25, city: 'Los Angeles' },
        { name: 'Charlie', age: 35, city: 'New York' }
    ];

    beforeEach(() => {
        processor = new DataProcessor();
    });

    describe('sum', () => {
        test('should calculate sum correctly', () => {
            expect(processor.sum(testNumbers)).toBe(15);
        });

        test('should handle empty array', () => {
            expect(processor.sum([])).toBe(0);
        });

        test('should handle negative numbers', () => {
            expect(processor.sum([-1, -2, -3])).toBe(-6);
        });
    });

    describe('average', () => {
        test('should calculate average correctly', () => {
            expect(processor.average(testNumbers)).toBe(3);
        });

        test('should handle empty array', () => {
            expect(processor.average([])).toBe(0);
        });

        test('should handle decimal results', () => {
            expect(processor.average([1, 2, 3, 4])).toBe(2.5);
        });
    });

    describe('max', () => {
        test('should find maximum value', () => {
            expect(processor.max(testNumbers)).toBe(5);
            expect(processor.max([10, 3, 7, 1])).toBe(10);
        });

        test('should handle negative numbers', () => {
            expect(processor.max([-1, -5, -2])).toBe(-1);
        });
    });

    describe('min', () => {
        test('should find minimum value', () => {
            expect(processor.min(testNumbers)).toBe(1);
            expect(processor.min([10, 3, 7, 1])).toBe(1);
        });

        test('should handle negative numbers', () => {
            expect(processor.min([-1, -5, -2])).toBe(-5);
        });
    });

    describe('filterEven', () => {
        test('should filter even numbers', () => {
            expect(processor.filterEven(testNumbers)).toEqual([2, 4]);
        });

        test('should handle array with no even numbers', () => {
            expect(processor.filterEven([1, 3, 5])).toEqual([]);
        });

        test('should handle empty array', () => {
            expect(processor.filterEven([])).toEqual([]);
        });
    });

    describe('filterOdd', () => {
        test('should filter odd numbers', () => {
            expect(processor.filterOdd(testNumbers)).toEqual([1, 3, 5]);
        });

        test('should handle array with no odd numbers', () => {
            expect(processor.filterOdd([2, 4, 6])).toEqual([]);
        });
    });

    describe('square', () => {
        test('should square all numbers', () => {
            expect(processor.square([1, 2, 3])).toEqual([1, 4, 9]);
        });

        test('should handle negative numbers', () => {
            expect(processor.square([-2, -3])).toEqual([4, 9]);
        });

        test('should handle empty array', () => {
            expect(processor.square([])).toEqual([]);
        });
    });

    describe('removeDuplicates', () => {
        test('should remove duplicates', () => {
            expect(processor.removeDuplicates([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
        });

        test('should handle strings', () => {
            expect(processor.removeDuplicates(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c']);
        });

        test('should handle array with no duplicates', () => {
            expect(processor.removeDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
        });
    });

    describe('groupBy', () => {
        test('should group by property', () => {
            const grouped = processor.groupBy(testObjects, obj => obj.city);
            expect(grouped['New York']).toHaveLength(2);
            expect(grouped['Los Angeles']).toHaveLength(1);
        });

        test('should group numbers by even/odd', () => {
            const grouped = processor.groupBy(testNumbers, num => num % 2 === 0 ? 'even' : 'odd');
            expect(grouped.even).toEqual([2, 4]);
            expect(grouped.odd).toEqual([1, 3, 5]);
        });
    });

    describe('sortByProperty', () => {
        test('should sort by property ascending', () => {
            const sorted = processor.sortByProperty([...testObjects], 'age', true);
            expect(sorted[0].name).toBe('Bob');
            expect(sorted[1].name).toBe('Alice');
            expect(sorted[2].name).toBe('Charlie');
        });

        test('should sort by property descending', () => {
            const sorted = processor.sortByProperty([...testObjects], 'age', false);
            expect(sorted[0].name).toBe('Charlie');
            expect(sorted[1].name).toBe('Alice');
            expect(sorted[2].name).toBe('Bob');
        });
    });

    describe('chunk', () => {
        test('should chunk array into smaller arrays', () => {
            expect(processor.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
        });

        test('should handle exact divisions', () => {
            expect(processor.chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
        });

        test('should handle chunk size larger than array', () => {
            expect(processor.chunk([1, 2], 5)).toEqual([[1, 2]]);
        });
    });

    describe('intersection', () => {
        test('should find common elements', () => {
            expect(processor.intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
        });

        test('should handle no common elements', () => {
            expect(processor.intersection([1, 2], [3, 4])).toEqual([]);
        });

        test('should handle strings', () => {
            expect(processor.intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c']);
        });
    });

    describe('median', () => {
        test('should calculate median for odd number of elements', () => {
            expect(processor.median([1, 2, 3, 4, 5])).toBe(3);
        });

        test('should calculate median for even number of elements', () => {
            expect(processor.median([1, 2, 3, 4])).toBe(2.5);
        });

        test('should handle unsorted array', () => {
            expect(processor.median([5, 1, 3, 2, 4])).toBe(3);
        });

        test('should handle single element', () => {
            expect(processor.median([42])).toBe(42);
        });
    });
});