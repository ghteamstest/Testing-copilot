document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signinForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Basic validation
        if (!username) {
            showMessage('Please enter a username', 'error');
            return;
        }

        if (!password) {
            showMessage('Please enter a password', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Password must be at least 6 characters', 'error');
            return;
        }

        // Simulate signin (in a real application, this would make an API call)
        simulateSignin(username, password);
    });

    function simulateSignin(username, password) {
        // Show loading state
        const submitBtn = form.querySelector('.signin-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;

        // Simulate API call with timeout
        setTimeout(function() {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Demo credentials for testing
            if (username === 'demo' && password === 'demo123') {
                showMessage('Sign in successful! Welcome, ' + username + '!', 'success');
                // In a real app, you would redirect or store session
                setTimeout(function() {
                    form.reset();
                    messageDiv.style.display = 'none';
                }, 3000);
            } else {
                showMessage('Invalid username or password', 'error');
            }
        }, 1000);
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';
    }
});
