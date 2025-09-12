#!/usr/bin/env python3
"""
Test script for the greeting functionality.
"""

from greeting import greet

def test_greeting():
    """Test the greeting function with various inputs."""
    print("Testing greeting functionality...")
    
    # Test cases
    test_cases = [
        ("hi", "Hello! How can I help you today?"),
        ("hello", "Hello! How can I help you today?"),
        ("hey", "Hello! How can I help you today?"),
        ("", "Hi there! Please say hello!"),
        ("testing", "Hi! You said: testing"),
        ("HI", "Hello! How can I help you today?"),  # Test case insensitivity
        ("  hi  ", "Hello! How can I help you today?")  # Test whitespace handling
    ]
    
    all_passed = True
    
    for input_msg, expected in test_cases:
        result = greet(input_msg)
        if result == expected:
            print(f"✓ PASS: '{input_msg}' -> '{result}'")
        else:
            print(f"✗ FAIL: '{input_msg}' -> Expected: '{expected}', Got: '{result}'")
            all_passed = False
    
    if all_passed:
        print("\nAll tests passed! 🎉")
        return True
    else:
        print("\nSome tests failed! ❌")
        return False

if __name__ == "__main__":
    success = test_greeting()
    exit(0 if success else 1)