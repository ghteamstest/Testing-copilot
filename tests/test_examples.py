"""
Test file for demonstrating GitHub Copilot's test generation capabilities.
This file shows how Copilot can help write unit tests.
"""

import unittest
import sys
import os

# Add the examples directory to the path so we can import our modules
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'examples'))

try:
    from python_example import Calculator, calculate_fibonacci, sort_list, process_data
except ImportError:
    # If import fails, we'll create mock classes for demonstration
    class Calculator:
        def add(self, a, b): return a + b
        def subtract(self, a, b): return a - b
        def multiply(self, a, b): return a * b
        def divide(self, a, b): return a / b if b != 0 else None
    
    def calculate_fibonacci(n):
        if n <= 1: return n
        return calculate_fibonacci(n-1) + calculate_fibonacci(n-2)
    
    def sort_list(items): return sorted(items)
    def process_data(data_list): 
        return {
            'min': min(data_list),
            'max': max(data_list),
            'average': sum(data_list) / len(data_list),
            'count': len(data_list)
        }


class TestCalculator(unittest.TestCase):
    """Test cases for Calculator class - let Copilot suggest test methods"""
    
    def setUp(self):
        self.calc = Calculator()
    
    def test_add_positive_numbers(self):
        # TODO: Let Copilot suggest test implementation
        pass
    
    def test_add_negative_numbers(self):
        # TODO: Let Copilot suggest test implementation
        pass
    
    def test_subtract_positive_numbers(self):
        # TODO: Let Copilot suggest test implementation
        pass
    
    def test_multiply_positive_numbers(self):
        # TODO: Let Copilot suggest test implementation
        pass
    
    def test_divide_positive_numbers(self):
        # TODO: Let Copilot suggest test implementation
        pass
    
    def test_divide_by_zero(self):
        # TODO: Let Copilot suggest test for edge case
        pass


class TestFibonacci(unittest.TestCase):
    """Test cases for Fibonacci function"""
    
    def test_fibonacci_base_cases(self):
        # TODO: Let Copilot suggest base case tests
        pass
    
    def test_fibonacci_positive_numbers(self):
        # TODO: Let Copilot suggest test for positive inputs
        pass


class TestSortList(unittest.TestCase):
    """Test cases for sort_list function"""
    
    def test_sort_empty_list(self):
        # TODO: Let Copilot suggest test implementation
        pass
    
    def test_sort_single_element(self):
        # TODO: Let Copilot suggest test implementation
        pass
    
    def test_sort_multiple_elements(self):
        # TODO: Let Copilot suggest test implementation
        pass


class TestProcessData(unittest.TestCase):
    """Test cases for process_data function"""
    
    def test_process_data_normal_case(self):
        # TODO: Let Copilot suggest test implementation
        pass
    
    def test_process_data_edge_cases(self):
        # TODO: Let Copilot suggest edge case tests
        pass


if __name__ == '__main__':
    # TODO: Let Copilot suggest test runner configuration
    unittest.main()