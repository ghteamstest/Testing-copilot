#!/usr/bin/env python3
"""
Greeting Module for Testing GitHub Copilot

This module provides simple greeting functionality to demonstrate
GitHub Copilot's code completion and suggestion capabilities.
"""


def say_hello(name="World"):
    """
    Generate a friendly greeting message.
    
    Args:
        name (str): The name to greet (default: "World")
    
    Returns:
        str: A greeting message
    """
    return f"Hi, {name}!"


def respond_to_greeting(input_text):
    """
    Respond appropriately to various greeting inputs.
    
    Args:
        input_text (str): The input greeting text
    
    Returns:
        str: An appropriate response
    """
    input_lower = input_text.lower().strip()
    
    if input_lower in ["hi", "hello", "hey"]:
        return "Hi there! How can I help you today?"
    elif input_lower in ["good morning", "morning"]:
        return "Good morning! Hope you have a great day!"
    elif input_lower in ["good evening", "evening"]:
        return "Good evening! How was your day?"
    elif input_lower in ["goodbye", "bye", "see you"]:
        return "Goodbye! Take care!"
    else:
        return "Hello! I didn't quite understand that greeting, but nice to meet you!"


def main():
    """
    Main function to demonstrate the greeting functionality.
    """
    print("=== GitHub Copilot Greeting Demo ===")
    print()
    
    # Demonstrate basic greeting
    print(say_hello())
    print(say_hello("GitHub Copilot"))
    print()
    
    # Demonstrate interactive greeting responses
    greetings = ["hi", "hello", "good morning", "bye", "something random"]
    
    print("Testing different greeting responses:")
    for greeting in greetings:
        response = respond_to_greeting(greeting)
        print(f"Input: '{greeting}' -> Response: '{response}'")


if __name__ == "__main__":
    main()