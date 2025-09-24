// Sign-in functionality with form validation and localStorage authentication
class SignInManager {
    constructor() {
        this.form = document.getElementById('signInForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.rememberMeInput = document.getElementById('rememberMe');
        this.signInBtn = document.getElementById('signInBtn');
        this.successMessage = document.getElementById('successMessage');
        
        // Demo users for testing purposes
        this.validUsers = [
            { email: 'admin@testcopilot.com', password: 'admin123' },
            { email: 'user@testcopilot.com', password: 'user123' },
            { email: 'demo@testcopilot.com', password: 'demo123' }
        ];
        
        this.init();
    }
    
    init() {
        // Check if user is already signed in
        if (this.isUserSignedIn()) {
            this.showSuccessMessage();
        }
        
        // Add event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.passwordInput.addEventListener('input', () => this.validatePassword());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        
        // Add demo user info to console
        console.log('Demo users for testing:');
        this.validUsers.forEach(user => {
            console.log(`Email: ${user.email}, Password: ${user.password}`);
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        const rememberMe = this.rememberMeInput.checked;
        
        // Validate form
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Simulate API call delay
            await this.delay(1500);
            
            // Authenticate user
            const user = this.authenticateUser(email, password);
            
            if (user) {
                // Store authentication state
                this.storeAuthState(user, rememberMe);
                
                // Show success message
                this.showSuccessMessage();
            } else {
                this.showError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            this.showError('An error occurred. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (!email) {
            this.showFieldError(this.emailInput, errorElement, 'Email is required');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showFieldError(this.emailInput, errorElement, 'Please enter a valid email address');
            return false;
        }
        
        this.clearFieldError(this.emailInput, errorElement);
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        const errorElement = document.getElementById('passwordError');
        
        if (!password) {
            this.showFieldError(this.passwordInput, errorElement, 'Password is required');
            return false;
        }
        
        if (password.length < 6) {
            this.showFieldError(this.passwordInput, errorElement, 'Password must be at least 6 characters long');
            return false;
        }
        
        this.clearFieldError(this.passwordInput, errorElement);
        return true;
    }
    
    showFieldError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    clearFieldError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }
    
    authenticateUser(email, password) {
        return this.validUsers.find(user => 
            user.email === email && user.password === password
        );
    }
    
    storeAuthState(user, rememberMe) {
        const storage = rememberMe ? localStorage : sessionStorage;
        const authData = {
            email: user.email,
            signInTime: new Date().toISOString(),
            rememberMe: rememberMe
        };
        
        storage.setItem('userAuth', JSON.stringify(authData));
    }
    
    isUserSignedIn() {
        const authData = localStorage.getItem('userAuth') || sessionStorage.getItem('userAuth');
        return authData !== null;
    }
    
    showSuccessMessage() {
        this.form.style.display = 'none';
        this.successMessage.classList.add('show');
        
        // Update welcome message with user email if available
        const authData = JSON.parse(
            localStorage.getItem('userAuth') || sessionStorage.getItem('userAuth')
        );
        
        if (authData) {
            const welcomeText = this.successMessage.querySelector('p');
            welcomeText.textContent = `Welcome back, ${authData.email}!`;
        }
    }
    
    showError(message) {
        // Create or update error message element
        let errorDiv = document.querySelector('.general-error');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'general-error';
            errorDiv.style.cssText = `
                background-color: #fee2e2;
                color: #dc2626;
                padding: 12px;
                border-radius: 6px;
                margin-bottom: 20px;
                text-align: center;
                font-size: 14px;
                border: 1px solid #fecaca;
            `;
            this.form.insertBefore(errorDiv, this.form.firstChild);
        }
        
        errorDiv.textContent = message;
        
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    setLoadingState(isLoading) {
        if (isLoading) {
            this.signInBtn.classList.add('loading');
            this.signInBtn.disabled = true;
        } else {
            this.signInBtn.classList.remove('loading');
            this.signInBtn.disabled = false;
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Global sign out function
function signOut() {
    // Clear authentication data
    localStorage.removeItem('userAuth');
    sessionStorage.removeItem('userAuth');
    
    // Reset form display
    document.getElementById('signInForm').style.display = 'block';
    document.getElementById('successMessage').classList.remove('show');
    
    // Clear form fields
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('rememberMe').checked = false;
    
    // Clear any error states
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Remove any general error messages
    const errorDiv = document.querySelector('.general-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    console.log('User signed out successfully');
}

// Utility function to show demo credentials
function showDemoCredentials() {
    const demoCredentials = `
Demo Accounts:
1. Email: admin@testcopilot.com, Password: admin123
2. Email: user@testcopilot.com, Password: user123  
3. Email: demo@testcopilot.com, Password: demo123
    `;
    
    alert(demoCredentials);
}

// Initialize the sign-in manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const signInManager = new SignInManager();
    
    // Add demo credentials helper
    const helpText = document.createElement('div');
    helpText.innerHTML = `
        <p style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
            Need test credentials? 
            <a href="#" onclick="showDemoCredentials()" style="color: #667eea; text-decoration: none;">
                Click here for demo accounts
            </a>
        </p>
    `;
    
    document.querySelector('.sign-in-form').appendChild(helpText);
    
    console.log('Sign-in system initialized successfully');
});