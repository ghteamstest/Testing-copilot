#!/usr/bin/env python3
"""
Simple greeting script for testing GitHub Copilot functionality.
Responds to "hi" with a friendly greeting.
"""

def greet(message=""):
    """
    Simple greeting function that responds to various inputs.
    
    Args:
        message (str): Input message to respond to
        
    Returns:
        str: Appropriate greeting response
    """
    message = message.lower().strip()
    
    if message in ["hi", "hello", "hey"]:
        return "Hello! How can I help you today?"
    elif message == "":
        return "Hi there! Please say hello!"
    else:
        return f"Hi! You said: {message}"

def main():
    """Main function to demonstrate the greeting functionality."""
    print("=== GitHub Copilot Testing - Greeting Script ===")
    print()
    
    # Test the greeting function
    test_cases = ["hi", "hello", "hey", "", "testing"]
    
    for test in test_cases:
        response = greet(test)
        print(f"Input: '{test}' -> Response: {response}")
    
    print()
    print("Interactive mode (type 'quit' to exit):")
    
    while True:
        user_input = input("You: ").strip()
        if user_input.lower() in ["quit", "exit", "bye"]:
            print("Goodbye!")
            break
        
        response = greet(user_input)
        print(f"Bot: {response}")

if __name__ == "__main__":
    main()