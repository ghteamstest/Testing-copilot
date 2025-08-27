#!/usr/bin/env python3
"""
Simple Hello World example for GitHub Copilot testing.

This file demonstrates basic Python functionality that can be used
to test GitHub Copilot's code completion and suggestion features.
"""

def greet(name="World"):
    """
    Return a greeting message.
    
    Args:
        name (str): The name to greet. Defaults to "World".
    
    Returns:
        str: A greeting message.
    """
    return f"Hello, {name}!"

def main():
    """Main function to demonstrate the greeting functionality."""
    # Basic greeting
    print(greet())
    
    # Personalized greeting
    print(greet("GitHub Copilot"))
    
    # Interactive greeting
    user_name = input("Enter your name: ")
    if user_name.strip():
        print(greet(user_name))
    else:
        print(greet())

if __name__ == "__main__":
    main()