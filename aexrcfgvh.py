#!/usr/bin/env python3
"""
aexrcfgvh - A utility module for GitHub Copilot testing

This module demonstrates various programming patterns and functionality
that can be used to test GitHub Copilot's code completion and suggestion capabilities.
"""

import string
import random
from typing import List, Dict, Optional


class AexrcfgvhUtility:
    """
    A utility class that provides various methods for testing GitHub Copilot functionality.
    
    The name 'aexrcfgvh' serves as a unique identifier for testing purposes.
    """
    
    def __init__(self, seed: Optional[int] = None):
        """Initialize the utility with an optional random seed."""
        if seed is not None:
            random.seed(seed)
        self.history: List[str] = []
    
    def generate_random_string(self, length: int = 10) -> str:
        """
        Generate a random string of specified length.
        
        Args:
            length: The length of the string to generate (default: 10)
            
        Returns:
            A random string containing letters and digits
        """
        characters = string.ascii_letters + string.digits
        result = ''.join(random.choice(characters) for _ in range(length))
        self.history.append(f"Generated random string: {result}")
        return result
    
    def reverse_string(self, text: str) -> str:
        """
        Reverse a given string.
        
        Args:
            text: The string to reverse
            
        Returns:
            The reversed string
        """
        result = text[::-1]
        self.history.append(f"Reversed '{text}' to '{result}'")
        return result
    
    def count_characters(self, text: str) -> Dict[str, int]:
        """
        Count the frequency of each character in a string.
        
        Args:
            text: The string to analyze
            
        Returns:
            A dictionary with character counts
        """
        char_count = {}
        for char in text:
            char_count[char] = char_count.get(char, 0) + 1
        
        self.history.append(f"Counted characters in '{text}'")
        return char_count
    
    def is_palindrome(self, text: str) -> bool:
        """
        Check if a string is a palindrome (reads the same forwards and backwards).
        
        Args:
            text: The string to check
            
        Returns:
            True if the string is a palindrome, False otherwise
        """
        cleaned = ''.join(char.lower() for char in text if char.isalnum())
        result = cleaned == cleaned[::-1]
        self.history.append(f"Checked palindrome for '{text}': {result}")
        return result
    
    def get_history(self) -> List[str]:
        """
        Get the history of operations performed.
        
        Returns:
            A list of operation descriptions
        """
        return self.history.copy()
    
    def clear_history(self) -> None:
        """Clear the operation history."""
        self.history.clear()


def main():
    """
    Demonstrate the aexrcfgvh utility functionality.
    """
    print("=== AEXRCFGVH Utility Demo ===")
    
    # Create an instance of the utility
    util = AexrcfgvhUtility(seed=42)
    
    # Demonstrate various functions
    print("\n1. Random String Generation:")
    random_str = util.generate_random_string(12)
    print(f"   Generated: {random_str}")
    
    print("\n2. String Reversal:")
    test_string = "aexrcfgvh"
    reversed_str = util.reverse_string(test_string)
    print(f"   Original: {test_string}")
    print(f"   Reversed: {reversed_str}")
    
    print("\n3. Character Counting:")
    char_counts = util.count_characters(test_string)
    print(f"   Character counts in '{test_string}':")
    for char, count in sorted(char_counts.items()):
        print(f"     '{char}': {count}")
    
    print("\n4. Palindrome Check:")
    test_words = ["racecar", "aexrcfgvh", "A man a plan a canal Panama"]
    for word in test_words:
        is_pal = util.is_palindrome(word)
        print(f"   '{word}' is palindrome: {is_pal}")
    
    print("\n5. Operation History:")
    history = util.get_history()
    for i, operation in enumerate(history, 1):
        print(f"   {i}. {operation}")


if __name__ == "__main__":
    main()