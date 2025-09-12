// DOM elements
const userEmailElement = document.getElementById('userEmail');
const signoutBtn = document.getElementById('signoutBtn');
const signinTimeElement = document.getElementById('signinTime');

// Check authentication on page load
function checkAuthentication() {
    const sessionData = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    
    if (!sessionData) {
        // Not authenticated, redirect to signin
        window.location.href = 'index.html';
        return null;
    }
    
    try {
        return JSON.parse(sessionData);
    } catch (error) {
        // Invalid session data, clear and redirect
        localStorage.removeItem('userSession');
        sessionStorage.removeItem('userSession');
        window.location.href = 'index.html';
        return null;
    }
}

// Format timestamp for display
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 1) {
        return 'Just now';
    } else if (diffMins < 60) {
        return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
}

// Sign out function
function signOut() {
    // Clear session data
    localStorage.removeItem('userSession');
    sessionStorage.removeItem('userSession');
    
    // Show signout message briefly then redirect
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const message = document.createElement('div');
    message.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        transform: translateY(20px);
        transition: transform 0.3s ease;
    `;
    message.innerHTML = `
        <h3 style="margin-bottom: 10px; color: #333;">Signed Out Successfully</h3>
        <p style="color: #666;">Redirecting to sign in page...</p>
    `;
    
    overlay.appendChild(message);
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
        message.style.transform = 'translateY(0)';
    }, 100);
    
    // Redirect after delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Add click animations to stat cards
function addStatCardAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
            
            setTimeout(() => {
                this.style.transform = '';
                this.style.transition = 'all 0.3s ease';
            }, 100);
            
            // Show click feedback
            const icon = this.querySelector('.stat-icon');
            const originalColor = icon.style.background;
            icon.style.background = 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)';
            
            setTimeout(() => {
                icon.style.background = originalColor;
            }, 200);
        });
    });
}

// Initialize dashboard
function initializeDashboard() {
    const userData = checkAuthentication();
    
    if (!userData) {
        return; // Will redirect in checkAuthentication
    }
    
    // Display user email
    userEmailElement.textContent = userData.email;
    
    // Display signin time
    if (userData.timestamp) {
        signinTimeElement.textContent = formatTimestamp(userData.timestamp);
        
        // Update signin time every minute
        setInterval(() => {
            signinTimeElement.textContent = formatTimestamp(userData.timestamp);
        }, 60000);
    }
    
    // Add event listeners
    signoutBtn.addEventListener('click', signOut);
    
    // Add stat card animations
    addStatCardAnimations();
    
    // Show welcome animation
    setTimeout(() => {
        const welcomeSection = document.querySelector('.welcome-section');
        welcomeSection.style.opacity = '0';
        welcomeSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            welcomeSection.style.transition = 'all 0.6s ease';
            welcomeSection.style.opacity = '1';
            welcomeSection.style.transform = 'translateY(0)';
        }, 100);
    }, 500);
}

// Handle browser back button
window.addEventListener('popstate', function(event) {
    // Prevent going back to signin if already authenticated
    const sessionData = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (sessionData) {
        history.pushState(null, null, window.location.href);
    }
});

// Prevent back button after signin
history.pushState(null, null, window.location.href);

// Initialize when page loads
window.addEventListener('load', initializeDashboard);

// Handle page visibility change to update timestamps
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const userData = checkAuthentication();
        if (userData && userData.timestamp) {
            signinTimeElement.textContent = formatTimestamp(userData.timestamp);
        }
    }
});