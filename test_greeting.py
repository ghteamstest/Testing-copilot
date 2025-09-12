#!/usr/bin/env python3
"""
Tests for the greeting module.

This demonstrates GitHub Copilot's ability to help with test generation
and validation of code functionality.
"""

import unittest
from greeting import say_hello, respond_to_greeting


class TestGreetingFunctions(unittest.TestCase):
    """Test cases for greeting functions."""
    
    def test_say_hello_default(self):
        """Test say_hello with default parameter."""
        result = say_hello()
        self.assertEqual(result, "Hi, World!")
    
    def test_say_hello_with_name(self):
        """Test say_hello with custom name."""
        result = say_hello("Alice")
        self.assertEqual(result, "Hi, Alice!")
    
    def test_respond_to_hi(self):
        """Test response to 'hi' greeting."""
        result = respond_to_greeting("hi")
        self.assertEqual(result, "Hi there! How can I help you today?")
    
    def test_respond_to_hello(self):
        """Test response to 'hello' greeting."""
        result = respond_to_greeting("hello")
        self.assertEqual(result, "Hi there! How can I help you today?")
    
    def test_respond_to_good_morning(self):
        """Test response to 'good morning' greeting."""
        result = respond_to_greeting("good morning")
        self.assertEqual(result, "Good morning! Hope you have a great day!")
    
    def test_respond_to_goodbye(self):
        """Test response to 'goodbye' greeting."""
        result = respond_to_greeting("goodbye")
        self.assertEqual(result, "Goodbye! Take care!")
    
    def test_respond_to_unknown_greeting(self):
        """Test response to unknown greeting."""
        result = respond_to_greeting("random text")
        self.assertEqual(result, "Hello! I didn't quite understand that greeting, but nice to meet you!")
    
    def test_case_insensitive_greeting(self):
        """Test that greetings are case insensitive."""
        result1 = respond_to_greeting("HI")
        result2 = respond_to_greeting("hi")
        self.assertEqual(result1, result2)
    
    def test_greeting_with_whitespace(self):
        """Test that greetings handle whitespace properly."""
        result = respond_to_greeting("  hello  ")
        self.assertEqual(result, "Hi there! How can I help you today?")


if __name__ == "__main__":
    # Run the tests
    unittest.main(verbosity=2)