#!/usr/bin/env python3
"""
Simple Python greeting script for testing GitHub Copilot functionality.
This script demonstrates basic Python syntax and user interaction.
"""

def greet(name="World"):
    """
    Greets the user with a personalized message.
    
    Args:
        name (str): The name to greet. Defaults to "World".
    
    Returns:
        str: A greeting message.
    """
    return f"Hello, {name}!"

def main():
    """Main function that runs the greeting program."""
    print(greet())
    
    # Interactive greeting
    user_name = input("What's your name? ")
    if user_name.strip():
        print(greet(user_name))
    else:
        print("Hello there!")

if __name__ == "__main__":
    main()