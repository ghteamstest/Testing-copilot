"""
Example Python file for testing GitHub Copilot functionality.
This file demonstrates various scenarios where Copilot can assist with code completion.
"""

def calculate_fibonacci(n):
    """
    Calculate the nth Fibonacci number.
    TODO: Let Copilot help complete this function
    """
    if n <= 1:
        return n
    return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)


def sort_list(items):
    """
    Sort a list of items in ascending order.
    TODO: Let Copilot suggest implementation
    """
    pass


class Calculator:
    """
    A simple calculator class for basic arithmetic operations.
    """
    
    def add(self, a, b):
        """Add two numbers"""
        return a + b
    
    def subtract(self, a, b):
        """Subtract second number from first"""
        # TODO: Let Copilot complete this method
        pass
    
    def multiply(self, a, b):
        """Multiply two numbers"""
        # TODO: Let Copilot complete this method
        pass
    
    def divide(self, a, b):
        """Divide first number by second"""
        # TODO: Let Copilot complete this method with error handling
        pass


def process_data(data_list):
    """
    Process a list of data and return summary statistics.
    Expected to return a dictionary with min, max, average, and count.
    """
    # TODO: Let Copilot help implement data processing logic
    pass


if __name__ == "__main__":
    # Test the functions
    calc = Calculator()
    print(f"Fibonacci(10): {calculate_fibonacci(10)}")
    print(f"5 + 3 = {calc.add(5, 3)}")
    
    # Test data processing
    test_data = [1, 5, 3, 9, 2, 8, 4, 7, 6]
    print(f"Sorted data: {sort_list(test_data)}")