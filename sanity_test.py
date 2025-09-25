#!/usr/bin/env python3
"""
Sanity Test for GitHub Copilot Functionality

This file demonstrates and tests various GitHub Copilot capabilities including:
- Code completion and suggestions
- Function generation from comments
- Bug detection and fixes
- Test case generation
- Documentation generation
"""

import os
import sys
import json
from datetime import datetime
from typing import List, Dict, Optional


class SanityTest:
    """Main class for running Copilot sanity tests."""
    
    def __init__(self):
        self.test_results = []
        self.start_time = datetime.now()
    
    def run_all_tests(self) -> bool:
        """Run all sanity tests and return True if all pass."""
        print("🚀 Starting GitHub Copilot Sanity Tests...")
        
        tests = [
            self.test_basic_functionality,
            self.test_data_processing,
            self.test_algorithm_implementation,
            self.test_error_handling,
            self.test_documentation_generation
        ]
        
        for test in tests:
            try:
                result = test()
                self.test_results.append({
                    'test': test.__name__,
                    'status': 'PASS' if result else 'FAIL',
                    'timestamp': datetime.now().isoformat()
                })
                status_emoji = "✅" if result else "❌"
                print(f"{status_emoji} {test.__name__}: {'PASSED' if result else 'FAILED'}")
            except Exception as e:
                self.test_results.append({
                    'test': test.__name__,
                    'status': 'ERROR',
                    'error': str(e),
                    'timestamp': datetime.now().isoformat()
                })
                print(f"💥 {test.__name__}: ERROR - {e}")
        
        return all(result['status'] == 'PASS' for result in self.test_results)
    
    def test_basic_functionality(self) -> bool:
        """Test basic Python functionality and Copilot suggestions."""
        # Test basic arithmetic - Copilot should suggest mathematical operations
        numbers = [1, 2, 3, 4, 5]
        total = sum(numbers)
        average = total / len(numbers)
        
        # Test list comprehension - Copilot should suggest Pythonic patterns
        squared_numbers = [n ** 2 for n in numbers]
        even_numbers = [n for n in numbers if n % 2 == 0]
        
        return (total == 15 and 
                average == 3.0 and 
                squared_numbers == [1, 4, 9, 16, 25] and
                even_numbers == [2, 4])
    
    def test_data_processing(self) -> bool:
        """Test data processing capabilities that Copilot might suggest."""
        # Sample data for processing
        sample_data = [
            {"name": "Alice", "age": 30, "city": "New York"},
            {"name": "Bob", "age": 25, "city": "San Francisco"},
            {"name": "Charlie", "age": 35, "city": "Chicago"},
            {"name": "Diana", "age": 28, "city": "New York"}
        ]
        
        # Filter data - Copilot should suggest filtering patterns
        ny_residents = [person for person in sample_data if person["city"] == "New York"]
        adults_over_30 = [person for person in sample_data if person["age"] > 30]
        
        # Sort data - Copilot should suggest sorting operations
        sorted_by_age = sorted(sample_data, key=lambda x: x["age"])
        
        return (len(ny_residents) == 2 and 
                len(adults_over_30) == 1 and
                sorted_by_age[0]["name"] == "Bob")
    
    def test_algorithm_implementation(self) -> bool:
        """Test algorithm implementation that Copilot might help with."""
        # Fibonacci sequence - common algorithm Copilot suggests
        def fibonacci(n: int) -> int:
            if n <= 1:
                return n
            return fibonacci(n - 1) + fibonacci(n - 2)
        
        # Binary search - another common algorithm
        def binary_search(arr: List[int], target: int) -> int:
            left, right = 0, len(arr) - 1
            while left <= right:
                mid = (left + right) // 2
                if arr[mid] == target:
                    return mid
                elif arr[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1
            return -1
        
        # Test the algorithms
        fib_result = fibonacci(6)  # Should be 8
        search_result = binary_search([1, 3, 5, 7, 9, 11], 7)  # Should be index 3
        
        return fib_result == 8 and search_result == 3
    
    def test_error_handling(self) -> bool:
        """Test error handling patterns that Copilot might suggest."""
        def safe_divide(a: float, b: float) -> Optional[float]:
            """Safely divide two numbers with error handling."""
            try:
                if b == 0:
                    raise ValueError("Division by zero is not allowed")
                return a / b
            except (TypeError, ValueError) as e:
                print(f"Error in division: {e}")
                return None
        
        def safe_file_read(filename: str) -> Optional[str]:
            """Safely read a file with error handling."""
            try:
                with open(filename, 'r') as file:
                    return file.read()
            except FileNotFoundError:
                return None
            except PermissionError:
                return None
        
        # Test error handling
        valid_division = safe_divide(10, 2)  # Should be 5.0
        invalid_division = safe_divide(10, 0)  # Should be None
        missing_file = safe_file_read("nonexistent_file.txt")  # Should be None
        
        return (valid_division == 5.0 and 
                invalid_division is None and 
                missing_file is None)
    
    def test_documentation_generation(self) -> bool:
        """Test documentation patterns that Copilot might generate."""
        def calculate_statistics(numbers: List[float]) -> Dict[str, float]:
            """
            Calculate basic statistics for a list of numbers.
            
            Args:
                numbers: A list of numeric values
                
            Returns:
                A dictionary containing mean, median, and standard deviation
                
            Raises:
                ValueError: If the input list is empty
            """
            if not numbers:
                raise ValueError("Cannot calculate statistics for empty list")
            
            # Calculate mean
            mean = sum(numbers) / len(numbers)
            
            # Calculate median
            sorted_numbers = sorted(numbers)
            n = len(sorted_numbers)
            median = (sorted_numbers[n//2] if n % 2 == 1 
                     else (sorted_numbers[n//2-1] + sorted_numbers[n//2]) / 2)
            
            # Calculate standard deviation
            variance = sum((x - mean) ** 2 for x in numbers) / len(numbers)
            std_dev = variance ** 0.5
            
            return {
                "mean": mean,
                "median": median,
                "std_dev": std_dev
            }
        
        # Test the function
        test_numbers = [1, 2, 3, 4, 5]
        stats = calculate_statistics(test_numbers)
        
        return (abs(stats["mean"] - 3.0) < 0.001 and
                abs(stats["median"] - 3.0) < 0.001 and
                abs(stats["std_dev"] - 1.414) < 0.01)
    
    def generate_report(self) -> str:
        """Generate a test report."""
        end_time = datetime.now()
        duration = (end_time - self.start_time).total_seconds()
        
        passed = sum(1 for result in self.test_results if result['status'] == 'PASS')
        total = len(self.test_results)
        
        report = f"""
=== GitHub Copilot Sanity Test Report ===
Start Time: {self.start_time.isoformat()}
End Time: {end_time.isoformat()}
Duration: {duration:.2f} seconds
Tests Passed: {passed}/{total}
Success Rate: {(passed/total)*100:.1f}%

Detailed Results:
"""
        
        for result in self.test_results:
            report += f"- {result['test']}: {result['status']}"
            if 'error' in result:
                report += f" ({result['error']})"
            report += "\n"
        
        return report


def main():
    """Main function to run the sanity tests."""
    print("GitHub Copilot Sanity Test Suite")
    print("=" * 40)
    
    # Create and run tests
    sanity_test = SanityTest()
    success = sanity_test.run_all_tests()
    
    # Generate and display report
    report = sanity_test.generate_report()
    print(report)
    
    # Save report to file
    with open("sanity_test_report.txt", "w") as f:
        f.write(report)
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()