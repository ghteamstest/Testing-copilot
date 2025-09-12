// DOM elements
const signinForm = document.getElementById('signinForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const signinBtn = document.getElementById('signinBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const messageContainer = document.getElementById('messageContainer');

// Error message elements
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Demo credentials for testing
const DEMO_CREDENTIALS = {
    'test@example.com': 'password123',
    'admin@test.com': 'admin123',
    'user@demo.com': 'demo123'
};

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showError(element, message) {
    element.textContent = message;
    element.classList.add('show');
}

function hideError(element) {
    element.classList.remove('show');
    element.textContent = '';
}

function showMessage(message, type = 'success') {
    messageContainer.className = `message-container ${type}`;
    messageContainer.textContent = message;
    messageContainer.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 3000);
    }
}

function setLoadingState(isLoading) {
    if (isLoading) {
        signinBtn.classList.add('loading');
        signinBtn.disabled = true;
    } else {
        signinBtn.classList.remove('loading');
        signinBtn.disabled = false;
    }
}

// Real-time validation
emailInput.addEventListener('input', function() {
    const email = this.value.trim();
    if (email && !validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
    } else {
        hideError(emailError);
    }
});

passwordInput.addEventListener('input', function() {
    const password = this.value;
    if (password && !validatePassword(password)) {
        showError(passwordError, 'Password must be at least 6 characters long');
    } else {
        hideError(passwordError);
    }
});

// Form submission handler
signinForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    // Clear previous messages
    messageContainer.style.display = 'none';
    hideError(emailError);
    hideError(passwordError);
    
    // Validate inputs
    let hasErrors = false;
    
    if (!email) {
        showError(emailError, 'Email is required');
        hasErrors = true;
    } else if (!validateEmail(email)) {
        showError(emailError, 'Please enter a valid email address');
        hasErrors = true;
    }
    
    if (!password) {
        showError(passwordError, 'Password is required');
        hasErrors = true;
    } else if (!validatePassword(password)) {
        showError(passwordError, 'Password must be at least 6 characters long');
        hasErrors = true;
    }
    
    if (hasErrors) {
        return;
    }
    
    // Simulate API call with loading state
    setLoadingState(true);
    
    try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check credentials
        if (DEMO_CREDENTIALS[email] && DEMO_CREDENTIALS[email] === password) {
            // Successful signin
            showMessage('Sign in successful! Redirecting...', 'success');
            
            // Store user session
            const userData = {
                email: email,
                remember: remember,
                timestamp: new Date().toISOString()
            };
            
            if (remember) {
                localStorage.setItem('userSession', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('userSession', JSON.stringify(userData));
            }
            
            // Redirect to dashboard after delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
            
        } else {
            // Invalid credentials
            showMessage('Invalid email or password. Please try again.', 'error');
        }
        
    } catch (error) {
        showMessage('An error occurred. Please try again later.', 'error');
        console.error('Signin error:', error);
    } finally {
        setLoadingState(false);
    }
});

// Check for existing session on page load
window.addEventListener('load', function() {
    const sessionData = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    
    if (sessionData) {
        try {
            const userData = JSON.parse(sessionData);
            showMessage('You are already signed in. Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } catch (error) {
            // Invalid session data, clear it
            localStorage.removeItem('userSession');
            sessionStorage.removeItem('userSession');
        }
    }
});

// Add demo credentials info for testing
function showDemoInfo() {
    const demoInfo = document.createElement('div');
    demoInfo.className = 'demo-info';
    demoInfo.innerHTML = `
        <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border: 1px solid #b8daff; border-radius: 6px; font-size: 12px; color: #004085;">
            <strong>Demo Credentials:</strong><br>
            • test@example.com / password123<br>
            • admin@test.com / admin123<br>
            • user@demo.com / demo123
        </div>
    `;
    document.querySelector('.signin-card').appendChild(demoInfo);
}

// Show demo info after page loads
window.addEventListener('load', function() {
    setTimeout(showDemoInfo, 500);
});