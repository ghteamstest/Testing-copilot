// Simple C++ example for testing GitHub Copilot functionality
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <memory>

/**
 * A simple class demonstrating basic C++ patterns for Copilot testing
 */
class MathUtils {
public:
    /**
     * Calculates the factorial of a number
     * @param n The number to calculate factorial for
     * @return The factorial of n
     */
    static long long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    /**
     * Checks if a number is prime
     * @param n The number to check
     * @return true if prime, false otherwise
     */
    static bool isPrime(int n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        
        for (int i = 5; i * i <= n; i += 6) {
            if (n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Calculates the nth Fibonacci number
     * @param n The position in the sequence
     * @return The nth Fibonacci number
     */
    static long long fibonacci(int n) {
        if (n <= 1) return n;
        
        long long a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            long long temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
};

/**
 * A template class for a simple container
 */
template<typename T>
class SimpleContainer {
private:
    std::vector<T> data;
    
public:
    void add(const T& item) {
        data.push_back(item);
    }
    
    void remove(const T& item) {
        auto it = std::find(data.begin(), data.end(), item);
        if (it != data.end()) {
            data.erase(it);
        }
    }
    
    size_t size() const {
        return data.size();
    }
    
    bool contains(const T& item) const {
        return std::find(data.begin(), data.end(), item) != data.end();
    }
    
    void clear() {
        data.clear();
    }
    
    // Iterator support
    typename std::vector<T>::iterator begin() { return data.begin(); }
    typename std::vector<T>::iterator end() { return data.end(); }
    typename std::vector<T>::const_iterator begin() const { return data.begin(); }
    typename std::vector<T>::const_iterator end() const { return data.end(); }
};

/**
 * Smart pointer example
 */
class Resource {
private:
    std::string name;
    
public:
    explicit Resource(const std::string& resourceName) : name(resourceName) {
        std::cout << "Resource '" << name << "' created" << std::endl;
    }
    
    ~Resource() {
        std::cout << "Resource '" << name << "' destroyed" << std::endl;
    }
    
    void use() {
        std::cout << "Using resource '" << name << "'" << std::endl;
    }
    
    const std::string& getName() const { return name; }
};

// Function to demonstrate smart pointer usage
void demonstrateSmartPointers() {
    // Unique pointer example
    auto resource1 = std::make_unique<Resource>("UniqueResource");
    resource1->use();
    
    // Shared pointer example
    auto resource2 = std::make_shared<Resource>("SharedResource");
    {
        auto resource2Copy = resource2;
        resource2Copy->use();
    } // resource2Copy goes out of scope but resource2 is still alive
    
    resource2->use();
}

// Main function demonstrating various features
int main() {
    std::cout << "=== C++ Copilot Test Examples ===" << std::endl;
    
    // Math utilities demonstration
    std::cout << "\n--- Math Utils ---" << std::endl;
    std::cout << "Factorial of 5: " << MathUtils::factorial(5) << std::endl;
    std::cout << "Is 17 prime? " << (MathUtils::isPrime(17) ? "Yes" : "No") << std::endl;
    std::cout << "10th Fibonacci number: " << MathUtils::fibonacci(10) << std::endl;
    
    // Container demonstration
    std::cout << "\n--- Container Demo ---" << std::endl;
    SimpleContainer<int> container;
    container.add(1);
    container.add(2);
    container.add(3);
    
    std::cout << "Container size: " << container.size() << std::endl;
    std::cout << "Contains 2? " << (container.contains(2) ? "Yes" : "No") << std::endl;
    
    std::cout << "Container contents: ";
    for (const auto& item : container) {
        std::cout << item << " ";
    }
    std::cout << std::endl;
    
    // Smart pointers demonstration
    std::cout << "\n--- Smart Pointers ---" << std::endl;
    demonstrateSmartPointers();
    
    return 0;
}