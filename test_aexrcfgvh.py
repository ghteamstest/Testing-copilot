#!/usr/bin/env python3
"""
Tests for the aexrcfgvh utility module.

This file demonstrates basic testing patterns for GitHub Copilot testing purposes.
"""

import unittest
import sys
import os

# Add the current directory to the path so we can import aexrcfgvh
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from aexrcfgvh import AexrcfgvhUtility


class TestAexrcfgvhUtility(unittest.TestCase):
    """Test cases for the AexrcfgvhUtility class."""
    
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.util = AexrcfgvhUtility(seed=42)  # Use fixed seed for reproducible tests
    
    def test_reverse_string(self):
        """Test string reversal functionality."""
        self.assertEqual(self.util.reverse_string("hello"), "olleh")
        self.assertEqual(self.util.reverse_string("aexrcfgvh"), "hvgfcrxea")
        self.assertEqual(self.util.reverse_string(""), "")
        self.assertEqual(self.util.reverse_string("a"), "a")
    
    def test_count_characters(self):
        """Test character counting functionality."""
        result = self.util.count_characters("hello")
        expected = {'h': 1, 'e': 1, 'l': 2, 'o': 1}
        self.assertEqual(result, expected)
        
        result = self.util.count_characters("aexrcfgvh")
        self.assertEqual(len(result), 9)  # 9 unique characters
        self.assertTrue(all(count == 1 for count in result.values()))  # All appear once
    
    def test_is_palindrome(self):
        """Test palindrome detection functionality."""
        self.assertTrue(self.util.is_palindrome("racecar"))
        self.assertTrue(self.util.is_palindrome("A man a plan a canal Panama"))
        self.assertTrue(self.util.is_palindrome("Madam"))
        self.assertFalse(self.util.is_palindrome("hello"))
        self.assertFalse(self.util.is_palindrome("aexrcfgvh"))
        self.assertTrue(self.util.is_palindrome(""))  # Empty string is a palindrome
    
    def test_generate_random_string(self):
        """Test random string generation functionality."""
        # With fixed seed, results should be reproducible
        result1 = self.util.generate_random_string(10)
        
        # Reset utility with same seed
        self.util = AexrcfgvhUtility(seed=42)
        result2 = self.util.generate_random_string(10)
        
        self.assertEqual(result1, result2)  # Should be same with same seed
        self.assertEqual(len(result1), 10)  # Should be correct length
    
    def test_history_tracking(self):
        """Test operation history tracking."""
        initial_history = self.util.get_history()
        self.assertEqual(len(initial_history), 0)  # Should start empty
        
        self.util.reverse_string("test")
        self.util.count_characters("test")
        
        history = self.util.get_history()
        self.assertEqual(len(history), 2)  # Should have 2 operations
        
        self.util.clear_history()
        history = self.util.get_history()
        self.assertEqual(len(history), 0)  # Should be empty after clear


class TestAexrcfgvhIntegration(unittest.TestCase):
    """Integration tests for the aexrcfgvh module."""
    
    def test_main_function_runs(self):
        """Test that the main function can be imported and doesn't crash."""
        try:
            from aexrcfgvh import main
            # We won't actually run main() to avoid printing during tests
            # but we can verify it's importable
            self.assertTrue(callable(main))
        except ImportError:
            self.fail("Could not import main function from aexrcfgvh module")


if __name__ == "__main__":
    print("Running aexrcfgvh utility tests...")
    unittest.main(verbosity=2)