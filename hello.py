#!/usr/bin/env python3
"""
A simple Hello World example for testing GitHub Copilot functionality.
This file demonstrates basic Python syntax and serves as a starting point
for testing Copilot's code completion and suggestion features.
"""

def greet(name="World"):
    """
    A simple greeting function that says hello to the specified name.
    
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
    user_name = input("What's your name? ")
    if user_name.strip():
        print(greet(user_name))
    else:
        print(greet())

if __name__ == "__main__":
    main()