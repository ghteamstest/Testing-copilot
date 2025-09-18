// Sign-in functionality for Testing Copilot
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const messageDiv = document.getElementById('message');
    
    // Demo users for testing purposes
    const demoUsers = [
        { email: 'admin@testingcopilot.com', password: 'admin123' },
        { email: 'user@testingcopilot.com', password: 'user123' },
        { email: 'test@github.com', password: 'copilot2024' }
    ];
    
    // Form submission handler
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Validate form inputs
        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        if (password.length < 6) {
            showMessage('Password must be at least 6 characters long.', 'error');
            return;
        }
        
        // Simulate authentication
        authenticateUser(email, password, remember);
    });
    
    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Authentication function
    function authenticateUser(email, password, remember) {
        // Show loading state
        const submitBtn = document.querySelector('.signin-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            const user = demoUsers.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Successful authentication
                showMessage('Sign in successful! Welcome to Testing Copilot.', 'success');
                
                // Store user session (for demo purposes)
                if (remember) {
                    localStorage.setItem('testingCopilotUser', JSON.stringify({
                        email: user.email,
                        loginTime: new Date().toISOString()
                    }));
                } else {
                    sessionStorage.setItem('testingCopilotUser', JSON.stringify({
                        email: user.email,
                        loginTime: new Date().toISOString()
                    }));
                }
                
                // Redirect or update UI after successful login
                setTimeout(() => {
                    showWelcomePage(user.email);
                }, 1500);
                
            } else {
                // Failed authentication
                showMessage('Invalid email or password. Please try again.', 'error');
            }
            
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }
    
    // Show message function
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type} show`;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    }
    
    // Show welcome page after successful login
    function showWelcomePage(userEmail) {
        document.body.innerHTML = `
            <div class="container">
                <div class="signin-form">
                    <h1>Welcome!</h1>
                    <p class="subtitle">You have successfully signed in to Testing Copilot</p>
                    <div style="text-align: left; margin: 20px 0;">
                        <p><strong>Email:</strong> ${userEmail}</p>
                        <p><strong>Login Time:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <div style="margin-top: 30px;">
                        <button onclick="signOut()" class="signin-btn" style="margin-right: 10px;">Sign Out</button>
                        <button onclick="showDemoInfo()" class="signin-btn" style="background: #28a745;">Demo Info</button>
                    </div>
                    <div id="demoInfo" style="display: none; margin-top: 20px; text-align: left; background: #f8f9fa; padding: 15px; border-radius: 5px;">
                        <h3>Demo Accounts:</h3>
                        <p><strong>Admin:</strong> admin@testingcopilot.com / admin123</p>
                        <p><strong>User:</strong> user@testingcopilot.com / user123</p>
                        <p><strong>Test:</strong> test@github.com / copilot2024</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Check if user is already logged in
    function checkExistingSession() {
        const sessionUser = sessionStorage.getItem('testingCopilotUser');
        const localUser = localStorage.getItem('testingCopilotUser');
        
        if (sessionUser || localUser) {
            const user = JSON.parse(sessionUser || localUser);
            showWelcomePage(user.email);
        }
    }
    
    // Check for existing session on page load
    checkExistingSession();
});

// Global functions for the welcome page
function signOut() {
    sessionStorage.removeItem('testingCopilotUser');
    localStorage.removeItem('testingCopilotUser');
    location.reload();
}

function showDemoInfo() {
    const demoInfo = document.getElementById('demoInfo');
    demoInfo.style.display = demoInfo.style.display === 'none' ? 'block' : 'none';
}

// Add some keyboard shortcuts for better UX
document.addEventListener('keydown', function(e) {
    // Press Ctrl+Enter to submit form
    if (e.ctrlKey && e.key === 'Enter') {
        const form = document.getElementById('signinForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Press Escape to clear messages
    if (e.key === 'Escape') {
        const message = document.getElementById('message');
        if (message) {
            message.classList.remove('show');
        }
    }
});