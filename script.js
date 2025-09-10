// Simple signin functionality for testing GitHub Copilot
class SignInManager {
    constructor() {
        this.form = document.getElementById('signinForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.messageDiv = document.getElementById('message');
        
        this.initializeEventListeners();
        this.loadDemoUsers();
    }
    
    // Demo users for testing purposes
    loadDemoUsers() {
        this.users = [
            { email: 'demo@example.com', password: 'password123' },
            { email: 'test@copilot.dev', password: 'testpass' },
            { email: 'user@github.com', password: 'github123' }
        ];
    }
    
    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignIn();
        });
        
        // Real-time validation
        this.emailInput.addEventListener('blur', () => {
            this.validateEmail();
        });
        
        this.passwordInput.addEventListener('blur', () => {
            this.validatePassword();
        });
        
        // Clear errors on input
        this.emailInput.addEventListener('input', () => {
            this.clearError('emailError');
        });
        
        this.passwordInput.addEventListener('input', () => {
            this.clearError('passwordError');
        });
        
        // Handle forgot password and create account links
        document.getElementById('forgotPassword').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });
        
        document.getElementById('createAccount').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleCreateAccount();
        });
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError('emailError', 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            return false;
        }
        
        this.clearError('emailError');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError('passwordError', 'Password is required');
            return false;
        }
        
        if (password.length < 6) {
            this.showError('passwordError', 'Password must be at least 6 characters long');
            return false;
        }
        
        this.clearError('passwordError');
        return true;
    }
    
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
    }
    
    clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
    }
    
    showMessage(message, type = 'info') {
        this.messageDiv.textContent = message;
        this.messageDiv.className = `message ${type}`;
        
        // Auto-hide success/info messages after 5 seconds
        if (type !== 'error') {
            setTimeout(() => {
                this.messageDiv.textContent = '';
                this.messageDiv.className = 'message';
            }, 5000);
        }
    }
    
    handleSignIn() {
        // Clear any existing messages
        this.messageDiv.textContent = '';
        this.messageDiv.className = 'message';
        
        // Validate inputs
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        
        // Simulate authentication process
        this.showMessage('Signing in...', 'info');
        
        setTimeout(() => {
            this.authenticateUser(email, password);
        }, 1000);
    }
    
    authenticateUser(email, password) {
        // Check against demo users
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.showMessage('Sign in successful! Welcome back!', 'success');
            
            // Simulate redirect or further actions
            setTimeout(() => {
                this.showMessage('Redirecting to dashboard...', 'info');
            }, 2000);
            
            // Store user info in localStorage (for demo purposes)
            localStorage.setItem('currentUser', JSON.stringify({ email: user.email }));
            
        } else {
            this.showMessage('Invalid email or password. Please try again.', 'error');
            
            // Provide hint for demo users
            setTimeout(() => {
                this.showMessage(
                    'Demo hint: Try demo@example.com with password123, or test@copilot.dev with testpass', 
                    'info'
                );
            }, 2000);
        }
    }
    
    handleForgotPassword() {
        const email = this.emailInput.value.trim();
        
        if (!email) {
            this.showMessage('Please enter your email address first, then click "Forgot Password"', 'info');
            this.emailInput.focus();
            return;
        }
        
        if (!this.validateEmail()) {
            return;
        }
        
        this.showMessage(`Password reset link sent to ${email}`, 'success');
    }
    
    handleCreateAccount() {
        this.showMessage('Create Account feature coming soon! This is a demo signin page.', 'info');
    }
    
    // Utility method to check if user is already signed in
    static isUserSignedIn() {
        return localStorage.getItem('currentUser') !== null;
    }
    
    // Utility method to sign out user
    static signOut() {
        localStorage.removeItem('currentUser');
        return true;
    }
}

// Initialize the signin manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SignInManager();
    
    // Show helpful message if user is already signed in
    if (SignInManager.isUserSignedIn()) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setTimeout(() => {
            document.getElementById('message').textContent = 
                `You're already signed in as ${currentUser.email}. Refresh the page to sign in as a different user.`;
            document.getElementById('message').className = 'message info';
        }, 500);
    }
});

// Add global function for easy testing in console
window.testSignIn = () => {
    console.log('Available demo users:');
    console.log('1. demo@example.com / password123');
    console.log('2. test@copilot.dev / testpass');
    console.log('3. user@github.com / github123');
    console.log('Call SignInManager.signOut() to clear current session');
};