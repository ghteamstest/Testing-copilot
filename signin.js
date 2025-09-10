// Sign-in functionality for Testing Copilot
class SignInManager {
    constructor() {
        this.form = document.getElementById('signinForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.rememberMeCheckbox = document.getElementById('rememberMe');
        this.submitButton = this.form.querySelector('.signin-button');
        
        this.emailError = document.getElementById('emailError');
        this.passwordError = document.getElementById('passwordError');
        this.successMessage = document.getElementById('successMessage');
        this.generalError = document.getElementById('generalError');
        
        this.initializeEventListeners();
        this.loadRememberedEmail();
    }
    
    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.clearFieldError('email'));
        this.passwordInput.addEventListener('input', () => this.clearFieldError('password'));
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.clearAllMessages();
        
        const isValid = this.validateForm();
        
        if (isValid) {
            this.performSignIn();
        }
    }
    
    validateForm() {
        const emailValid = this.validateEmail();
        const passwordValid = this.validatePassword();
        
        return emailValid && passwordValid;
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showFieldError('email', 'Email address is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            return false;
        }
        
        this.clearFieldError('email');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showFieldError('password', 'Password is required');
            return false;
        }
        
        if (password.length < 6) {
            this.showFieldError('password', 'Password must be at least 6 characters long');
            return false;
        }
        
        this.clearFieldError('password');
        return true;
    }
    
    showFieldError(field, message) {
        const input = field === 'email' ? this.emailInput : this.passwordInput;
        const errorElement = field === 'email' ? this.emailError : this.passwordError;
        
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    clearFieldError(field) {
        const input = field === 'email' ? this.emailInput : this.passwordInput;
        const errorElement = field === 'email' ? this.emailError : this.passwordError;
        
        input.classList.remove('error');
        errorElement.textContent = '';
    }
    
    clearAllMessages() {
        this.clearFieldError('email');
        this.clearFieldError('password');
        this.successMessage.style.display = 'none';
        this.generalError.style.display = 'none';
    }
    
    async performSignIn() {
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        const rememberMe = this.rememberMeCheckbox.checked;
        
        // Disable submit button during processing
        this.submitButton.disabled = true;
        this.submitButton.textContent = 'Signing In...';
        
        try {
            // Simulate API call with delay
            await this.simulateApiCall(email, password);
            
            // Handle remember me functionality
            if (rememberMe) {
                this.rememberEmail(email);
            } else {
                this.forgetEmail();
            }
            
            this.showSuccess('Sign in successful! Welcome back.');
            
            // In a real app, you would redirect to the dashboard
            setTimeout(() => {
                console.log('Redirecting to dashboard...');
                // window.location.href = '/dashboard';
            }, 2000);
            
        } catch (error) {
            this.showGeneralError(error.message);
        } finally {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'Sign In';
        }
    }
    
    async simulateApiCall(email, password) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock authentication logic
        const validCredentials = [
            { email: 'demo@example.com', password: 'password123' },
            { email: 'user@test.com', password: 'testpass' },
            { email: 'admin@copilot.com', password: 'copilot2023' }
        ];
        
        const isValidUser = validCredentials.some(
            cred => cred.email === email && cred.password === password
        );
        
        if (!isValidUser) {
            throw new Error('Invalid email or password. Please try again.');
        }
        
        // Simulate successful authentication
        return { success: true, user: { email } };
    }
    
    showSuccess(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = 'block';
    }
    
    showGeneralError(message) {
        this.generalError.textContent = message;
        this.generalError.style.display = 'block';
    }
    
    rememberEmail(email) {
        localStorage.setItem('rememberedEmail', email);
    }
    
    forgetEmail() {
        localStorage.removeItem('rememberedEmail');
    }
    
    loadRememberedEmail() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            this.emailInput.value = rememberedEmail;
            this.rememberMeCheckbox.checked = true;
        }
    }
}

// Utility function to show demo credentials
function showDemoCredentials() {
    const demoInfo = `
Demo Credentials:
• demo@example.com / password123
• user@test.com / testpass  
• admin@copilot.com / copilot2023
    `;
    
    console.log(demoInfo);
    alert('Check the browser console for demo credentials!');
}

// Initialize the sign-in manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SignInManager();
    
    // Add demo credentials button for testing
    const container = document.querySelector('.signin-form');
    const demoButton = document.createElement('button');
    demoButton.type = 'button';
    demoButton.textContent = 'Show Demo Credentials';
    demoButton.style.cssText = `
        margin-top: 10px;
        padding: 8px 16px;
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        width: 100%;
    `;
    demoButton.onclick = showDemoCredentials;
    
    container.appendChild(demoButton);
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SignInManager;
}