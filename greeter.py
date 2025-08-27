#!/usr/bin/env python3
"""
Simple greeter script for testing GitHub Copilot functionality.
Responds to greetings like "Hi" with appropriate responses.
"""

def greet(message):
    """
    Respond to greeting messages.
    
    Args:
        message (str): Input message to process
        
    Returns:
        str: Appropriate greeting response
    """
    message = message.strip().lower()
    
    if message in ['hi', 'hello', 'hey']:
        return "Hello! Welcome to the GitHub Copilot testing repository!"
    elif message in ['goodbye', 'bye', 'see you']:
        return "Goodbye! Happy coding with Copilot!"
    else:
        return "Hi there! I'm a simple greeter for testing Copilot functionality."

def main():
    """Main function to demonstrate the greeter."""
    print("GitHub Copilot Greeter Test")
    print("=" * 30)
    
    # Test with the specific "Hi" from the problem statement
    response = greet("Hi")
    print(f"Input: Hi")
    print(f"Output: {response}")
    
    # Interactive mode
    print("\nTry entering a greeting (or 'quit' to exit):")
    while True:
        user_input = input("> ")
        if user_input.lower() == 'quit':
            print("Goodbye!")
            break
        response = greet(user_input)
        print(response)

if __name__ == "__main__":
    main()