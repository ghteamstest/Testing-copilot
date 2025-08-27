import examples

def test_add_numbers():
    """Test the add_numbers function"""
    assert examples.add_numbers(2, 3) == 5
    assert examples.add_numbers(-1, 1) == 0
    assert examples.add_numbers(0, 0) == 0
    print("✓ add_numbers tests passed")

def test_greet_user():
    """Test the greet_user function"""
    result = examples.greet_user("Alice")
    assert "Hello, Alice!" in result
    assert "Welcome to GitHub Copilot testing." in result
    print("✓ greet_user tests passed")

def test_find_maximum():
    """Test the find_maximum function"""
    assert examples.find_maximum([1, 2, 3, 4, 5]) == 5
    assert examples.find_maximum([5, 4, 3, 2, 1]) == 5
    assert examples.find_maximum([]) is None
    assert examples.find_maximum([42]) == 42
    print("✓ find_maximum tests passed")

def test_fibonacci():
    """Test the fibonacci function"""
    assert examples.fibonacci(0) == []
    assert examples.fibonacci(1) == [0]
    assert examples.fibonacci(2) == [0, 1]
    assert examples.fibonacci(5) == [0, 1, 1, 2, 3]
    print("✓ fibonacci tests passed")

if __name__ == "__main__":
    test_add_numbers()
    test_greet_user()
    test_find_maximum()
    test_fibonacci()
    print("\n🎉 All tests passed! GitHub Copilot testing examples are working correctly.")