# GitHub Copilot Testing Examples
# This file contains basic Python functions to test Copilot's capabilities

def add_numbers(a, b):
    """Simple function to add two numbers"""
    return a + b

def greet_user(name):
    """Function to greet a user with their name"""
    return f"Hello, {name}! Welcome to GitHub Copilot testing."

def find_maximum(numbers):
    """Function to find the maximum number in a list"""
    if not numbers:
        return None
    return max(numbers)

def fibonacci(n):
    """Generate fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    return sequence

if __name__ == "__main__":
    # Simple test examples
    print(add_numbers(5, 3))
    print(greet_user("Developer"))
    print(find_maximum([1, 5, 3, 9, 2]))
    print(fibonacci(10))