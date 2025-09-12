#!/usr/bin/env python3
"""
Test module for the greeting functionality.

This module contains unit tests for the greeting function.
"""

import unittest
from greeting import greeting


class TestGreeting(unittest.TestCase):
    """Test cases for the greeting function."""
    
    def test_greeting_returns_hello_there(self):
        """Test that greeting() returns the expected message."""
        result = greeting()
        self.assertEqual(result, "hello there")
    
    def test_greeting_returns_string(self):
        """Test that greeting() returns a string."""
        result = greeting()
        self.assertIsInstance(result, str)
    
    def test_greeting_not_empty(self):
        """Test that greeting() returns a non-empty string."""
        result = greeting()
        self.assertTrue(len(result) > 0)


if __name__ == "__main__":
    unittest.main()