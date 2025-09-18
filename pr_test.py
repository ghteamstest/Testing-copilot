"""
PR Test - Python edition
A simple test file to demonstrate GitHub Copilot functionality in Python

This file contains various test scenarios that can be used to evaluate
GitHub Copilot's capabilities in Python development.
"""

import unittest
from typing import List, Union


class Calculator:
    """A simple calculator class for testing purposes."""
    
    @staticmethod
    def add(a: Union[int, float], b: Union[int, float]) -> Union[int, float]:
        """Add two numbers."""
        return a + b
    
    @staticmethod
    def subtract(a: Union[int, float], b: Union[int, float]) -> Union[int, float]:
        """Subtract second number from first."""
        return a - b
    
    @staticmethod
    def multiply(a: Union[int, float], b: Union[int, float]) -> Union[int, float]:
        """Multiply two numbers."""
        return a * b
    
    @staticmethod
    def divide(a: Union[int, float], b: Union[int, float]) -> Union[int, float]:
        """Divide first number by second."""
        if b == 0:
            raise ValueError("Division by zero is not allowed")
        return a / b


class StringUtils:
    """Utility class for string operations."""
    
    @staticmethod
    def reverse_string(text: str) -> str:
        """Reverse a string."""
        if not isinstance(text, str):
            raise TypeError("Input must be a string")
        return text[::-1]
    
    @staticmethod
    def is_palindrome(text: str) -> bool:
        """Check if a string is a palindrome."""
        if not isinstance(text, str):
            raise TypeError("Input must be a string")
        cleaned = text.lower().replace(" ", "")
        return cleaned == cleaned[::-1]


class ListUtils:
    """Utility class for list operations."""
    
    @staticmethod
    def find_max(numbers: List[Union[int, float]]) -> Union[int, float]:
        """Find the maximum number in a list."""
        if not numbers:
            raise ValueError("List cannot be empty")
        return max(numbers)
    
    @staticmethod
    def find_duplicates(items: List) -> List:
        """Find duplicate items in a list."""
        seen = set()
        duplicates = set()
        for item in items:
            if item in seen:
                duplicates.add(item)
            else:
                seen.add(item)
        return list(duplicates)


class TestPRFunctionality(unittest.TestCase):
    """Test cases for PR functionality demonstration."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.calc = Calculator()
        self.string_utils = StringUtils()
        self.list_utils = ListUtils()
    
    def test_calculator_operations(self):
        """Test basic calculator operations."""
        self.assertEqual(self.calc.add(2, 3), 5)
        self.assertEqual(self.calc.subtract(5, 3), 2)
        self.assertEqual(self.calc.multiply(4, 3), 12)
        self.assertEqual(self.calc.divide(10, 2), 5)
    
    def test_division_by_zero(self):
        """Test division by zero error handling."""
        with self.assertRaises(ValueError):
            self.calc.divide(10, 0)
    
    def test_string_operations(self):
        """Test string utility operations."""
        self.assertEqual(self.string_utils.reverse_string("hello"), "olleh")
        self.assertTrue(self.string_utils.is_palindrome("racecar"))
        self.assertFalse(self.string_utils.is_palindrome("hello"))
    
    def test_string_type_validation(self):
        """Test string type validation."""
        with self.assertRaises(TypeError):
            self.string_utils.reverse_string(123)
    
    def test_list_operations(self):
        """Test list utility operations."""
        self.assertEqual(self.list_utils.find_max([1, 5, 3, 9, 2]), 9)
        self.assertEqual(
            set(self.list_utils.find_duplicates([1, 2, 3, 2, 4, 3])),
            {2, 3}
        )
    
    def test_empty_list_error(self):
        """Test empty list error handling."""
        with self.assertRaises(ValueError):
            self.list_utils.find_max([])


def run_manual_tests():
    """Run some manual tests to demonstrate functionality."""
    print("🚀 Running PR Test Demo...")
    
    # Test calculator
    calc = Calculator()
    print(f"Calculator: 5 + 3 = {calc.add(5, 3)}")
    print(f"Calculator: 10 - 4 = {calc.subtract(10, 4)}")
    
    # Test string utils
    string_utils = StringUtils()
    test_string = "GitHub Copilot"
    print(f"Reverse '{test_string}': {string_utils.reverse_string(test_string)}")
    print(f"Is 'racecar' a palindrome? {string_utils.is_palindrome('racecar')}")
    
    # Test list utils
    list_utils = ListUtils()
    test_numbers = [3, 7, 2, 9, 1, 5]
    print(f"Max of {test_numbers}: {list_utils.find_max(test_numbers)}")
    
    test_list = [1, 2, 3, 2, 4, 3, 5]
    duplicates = list_utils.find_duplicates(test_list)
    print(f"Duplicates in {test_list}: {duplicates}")
    
    print("✅ Manual tests completed!")


if __name__ == "__main__":
    # Run manual demo
    run_manual_tests()
    print("\n" + "="*50)
    
    # Run unit tests
    print("Running unit tests...")
    unittest.main(verbosity=2, exit=False)