#!/usr/bin/env python3
"""
Simple test for the greeter functionality.
Tests the response to various greetings including "Hi".
"""

import sys
import os

# Add the current directory to the path so we can import greeter
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from greeter import greet

def test_hi_greeting():
    """Test the specific 'Hi' greeting from the problem statement."""
    result = greet("Hi")
    expected = "Hello! Welcome to the GitHub Copilot testing repository!"
    assert result == expected, f"Expected '{expected}', got '{result}'"
    print("✓ 'Hi' greeting test passed")

def test_various_greetings():
    """Test various greeting inputs."""
    test_cases = [
        ("hello", "Hello! Welcome to the GitHub Copilot testing repository!"),
        ("hey", "Hello! Welcome to the GitHub Copilot testing repository!"),
        ("Hi", "Hello! Welcome to the GitHub Copilot testing repository!"),
        ("bye", "Goodbye! Happy coding with Copilot!"),
        ("goodbye", "Goodbye! Happy coding with Copilot!"),
        ("random text", "Hi there! I'm a simple greeter for testing Copilot functionality."),
    ]
    
    for input_msg, expected in test_cases:
        result = greet(input_msg)
        assert result == expected, f"For input '{input_msg}': expected '{expected}', got '{result}'"
        print(f"✓ Test passed for: '{input_msg}'")

def main():
    """Run all tests."""
    print("Running greeter tests...")
    print("=" * 40)
    
    try:
        test_hi_greeting()
        test_various_greetings()
        print("\n🎉 All tests passed!")
        return 0
    except AssertionError as e:
        print(f"\n❌ Test failed: {e}")
        return 1
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())