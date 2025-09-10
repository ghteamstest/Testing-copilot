// Demo user credentials (in a real app, this would be handled server-side)
const DEMO_USERS = [
    { email: 'admin@testingcopilot.com', password: 'admin123' },
    { email: 'user@testingcopilot.com', password: 'user123' },
    { email: 'demo@testingcopilot.com', password: 'demo123' }
];

// DOM elements
const signinForm = document.getElementById('signinForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeInput = document.getElementById('rememberMe');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const successMessage = document.getElementById('successMessage');
const signinBtn = document.querySelector('.signin-btn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already signed in
    checkExistingSession();
    
    // Add form submit event listener
    signinForm.addEventListener('submit', handleSignin);
    
    // Add real-time validation
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    
    // Clear errors on input
    emailInput.addEventListener('input', () => clearError('emailError'));
    passwordInput.addEventListener('input', () => clearError('passwordError'));
});

// Check if user has an existing session
function checkExistingSession() {
    const savedUser = localStorage.getItem('signedinUser');
    if (savedUser) {
        showSuccessState(JSON.parse(savedUser));
    }
}

// Handle signin form submission
async function handleSignin(event) {
    event.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    // Get form values
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeInput.checked;
    
    // Validate inputs
    let isValid = true;
    
    if (!validateEmail()) isValid = false;
    if (!validatePassword()) isValid = false;
    
    if (!isValid) return;
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check credentials
        const user = authenticateUser(email, password);
        
        if (user) {
            // Successful signin
            if (rememberMe) {
                localStorage.setItem('signedinUser', JSON.stringify(user));
            } else {
                sessionStorage.setItem('signedinUser', JSON.stringify(user));
            }
            
            showSuccessState(user);
        } else {
            // Invalid credentials
            showError('passwordError', 'Invalid email or password');
        }
    } catch (error) {
        showError('passwordError', 'An error occurred. Please try again.');
    } finally {
        setLoadingState(false);
    }
}

// Authenticate user against demo credentials
function authenticateUser(email, password) {
    return DEMO_USERS.find(user => 
        user.email.toLowerCase() === email.toLowerCase() && 
        user.password === password
    );
}

// Validate email field
function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError('emailError', 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        return false;
    }
    
    clearError('emailError');
    return true;
}

// Validate password field
function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
        showError('passwordError', 'Password is required');
        return false;
    }
    
    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters long');
        return false;
    }
    
    clearError('passwordError');
    return true;
}

// Show error message
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Clear specific error
function clearError(errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

// Clear all errors
function clearAllErrors() {
    clearError('emailError');
    clearError('passwordError');
}

// Set loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        signinBtn.classList.add('loading');
        signinBtn.textContent = 'Signing In...';
        signinBtn.disabled = true;
    } else {
        signinBtn.classList.remove('loading');
        signinBtn.textContent = 'Sign In';
        signinBtn.disabled = false;
    }
}

// Show success state after signin
function showSuccessState(user) {
    signinForm.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Update success message with user info
    const welcomeText = successMessage.querySelector('p');
    welcomeText.textContent = `Welcome back, ${user.email}! You have successfully signed in.`;
}

// Handle signout
function signOut() {
    // Clear stored sessions
    localStorage.removeItem('signedinUser');
    sessionStorage.removeItem('signedinUser');
    
    // Reset form
    signinForm.reset();
    clearAllErrors();
    
    // Show signin form again
    signinForm.style.display = 'block';
    successMessage.style.display = 'none';
}

// Handle forgot password (demo functionality)
function showForgotPassword() {
    alert(`Demo: Forgot Password\n\nFor testing purposes, you can use these credentials:\n\n• admin@testingcopilot.com / admin123\n• user@testingcopilot.com / user123\n• demo@testingcopilot.com / demo123`);
}

// Add some helper functions for testing
window.testSignin = {
    // Auto-fill demo credentials
    fillDemoUser: function(userIndex = 0) {
        if (DEMO_USERS[userIndex]) {
            emailInput.value = DEMO_USERS[userIndex].email;
            passwordInput.value = DEMO_USERS[userIndex].password;
        }
    },
    
    // Get available demo users
    getDemoUsers: function() {
        return DEMO_USERS.map(user => ({ email: user.email }));
    },
    
    // Check current signin status
    getSigninStatus: function() {
        return {
            localStorage: localStorage.getItem('signedinUser'),
            sessionStorage: sessionStorage.getItem('signedinUser')
        };
    }
};

// Console log for testing
console.log('Testing Copilot Signin Page Loaded');
console.log('Demo users available:', DEMO_USERS.map(user => user.email));
console.log('Use testSignin.fillDemoUser(0) to auto-fill admin credentials');