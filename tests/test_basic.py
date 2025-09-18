#!/usr/bin/env python3
"""
Basic test file for GitHub Copilot PR testing.

This file demonstrates various programming patterns that can be used
to test GitHub Copilot's code completion and suggestion capabilities
during Pull Request reviews.
"""

import unittest
from typing import List, Dict, Optional


class Calculator:
    """A simple calculator class for testing Copilot suggestions."""
    
    def add(self, a: float, b: float) -> float:
        """Add two numbers together."""
        return a + b
    
    def subtract(self, a: float, b: float) -> float:
        """Subtract b from a."""
        return a - b
    
    def multiply(self, a: float, b: float) -> float:
        """Multiply two numbers."""
        return a * b
    
    def divide(self, a: float, b: float) -> float:
        """Divide a by b."""
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b


class DataProcessor:
    """A class for processing data collections."""
    
    def filter_positive_numbers(self, numbers: List[float]) -> List[float]:
        """Filter out negative numbers from a list."""
        return [num for num in numbers if num > 0]
    
    def calculate_average(self, numbers: List[float]) -> float:
        """Calculate the average of a list of numbers."""
        if not numbers:
            return 0.0
        return sum(numbers) / len(numbers)
    
    def find_max_value(self, data: Dict[str, float]) -> Optional[str]:
        """Find the key with the maximum value in a dictionary."""
        if not data:
            return None
        return max(data.keys(), key=lambda k: data[k])


class TestCalculator(unittest.TestCase):
    """Test cases for the Calculator class."""
    
    def setUp(self):
        self.calc = Calculator()
    
    def test_addition(self):
        """Test addition functionality."""
        self.assertEqual(self.calc.add(2, 3), 5)
        self.assertEqual(self.calc.add(-1, 1), 0)
        self.assertAlmostEqual(self.calc.add(0.1, 0.2), 0.3, places=7)
    
    def test_subtraction(self):
        """Test subtraction functionality."""
        self.assertEqual(self.calc.subtract(5, 3), 2)
        self.assertEqual(self.calc.subtract(1, 1), 0)
        self.assertEqual(self.calc.subtract(-1, -1), 0)
    
    def test_multiplication(self):
        """Test multiplication functionality."""
        self.assertEqual(self.calc.multiply(3, 4), 12)
        self.assertEqual(self.calc.multiply(-2, 3), -6)
        self.assertEqual(self.calc.multiply(0, 5), 0)
    
    def test_division(self):
        """Test division functionality."""
        self.assertEqual(self.calc.divide(6, 2), 3)
        self.assertEqual(self.calc.divide(5, 2), 2.5)
        
        with self.assertRaises(ValueError):
            self.calc.divide(5, 0)


class TestDataProcessor(unittest.TestCase):
    """Test cases for the DataProcessor class."""
    
    def setUp(self):
        self.processor = DataProcessor()
    
    def test_filter_positive_numbers(self):
        """Test filtering positive numbers."""
        numbers = [-2, -1, 0, 1, 2, 3]
        result = self.processor.filter_positive_numbers(numbers)
        self.assertEqual(result, [1, 2, 3])
    
    def test_calculate_average(self):
        """Test average calculation."""
        numbers = [1, 2, 3, 4, 5]
        result = self.processor.calculate_average(numbers)
        self.assertEqual(result, 3.0)
        
        # Test empty list
        self.assertEqual(self.processor.calculate_average([]), 0.0)
    
    def test_find_max_value(self):
        """Test finding maximum value."""
        data = {"a": 1, "b": 3, "c": 2}
        result = self.processor.find_max_value(data)
        self.assertEqual(result, "b")
        
        # Test empty dictionary
        self.assertIsNone(self.processor.find_max_value({}))


if __name__ == "__main__":
    unittest.main()