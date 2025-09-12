/**
 * Settings Management System
 * Handles user preferences and configuration
 */

class SettingsManager {
    constructor() {
        this.defaultSettings = {
            theme: 'light',
            notifications: true,
            language: 'en',
            autoSave: 30
        };
        
        this.currentSettings = { ...this.defaultSettings };
        this.init();
    }

    /**
     * Initialize the settings manager
     */
    init() {
        this.loadSettings();
        this.bindEvents();
        this.applyTheme();
    }

    /**
     * Load settings from localStorage
     */
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('appSettings');
            if (savedSettings) {
                this.currentSettings = { ...this.defaultSettings, ...JSON.parse(savedSettings) };
            }
            this.updateUI();
        } catch (error) {
            console.error('Error loading settings:', error);
            this.showStatus('Error loading settings', 'error');
        }
    }

    /**
     * Save settings to localStorage
     */
    saveSettings() {
        try {
            localStorage.setItem('appSettings', JSON.stringify(this.currentSettings));
            this.showStatus('Settings saved successfully!', 'success');
            this.applyTheme();
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            this.showStatus('Error saving settings', 'error');
            return false;
        }
    }

    /**
     * Reset settings to defaults
     */
    resetSettings() {
        this.currentSettings = { ...this.defaultSettings };
        this.updateUI();
        this.saveSettings();
        this.showStatus('Settings reset to defaults', 'success');
    }

    /**
     * Update UI elements with current settings
     */
    updateUI() {
        const themeElement = document.getElementById('theme');
        const notificationsElement = document.getElementById('notifications');
        const languageElement = document.getElementById('language');
        const autoSaveElement = document.getElementById('autoSave');
        
        if (themeElement) themeElement.value = this.currentSettings.theme;
        if (notificationsElement) notificationsElement.checked = this.currentSettings.notifications;
        if (languageElement) languageElement.value = this.currentSettings.language;
        if (autoSaveElement) autoSaveElement.value = this.currentSettings.autoSave;
    }

    /**
     * Get settings from form
     */
    getFormSettings() {
        const themeElement = document.getElementById('theme');
        const notificationsElement = document.getElementById('notifications');
        const languageElement = document.getElementById('language');
        const autoSaveElement = document.getElementById('autoSave');
        
        return {
            theme: themeElement ? themeElement.value : this.currentSettings.theme,
            notifications: notificationsElement ? notificationsElement.checked : this.currentSettings.notifications,
            language: languageElement ? languageElement.value : this.currentSettings.language,
            autoSave: autoSaveElement ? parseInt(autoSaveElement.value) : this.currentSettings.autoSave
        };
    }

    /**
     * Validate settings
     */
    validateSettings(settings) {
        const errors = [];

        if (!['light', 'dark', 'auto'].includes(settings.theme)) {
            errors.push('Invalid theme selection');
        }

        if (!['en', 'es', 'fr', 'de'].includes(settings.language)) {
            errors.push('Invalid language selection');
        }

        if (settings.autoSave < 10 || settings.autoSave > 300) {
            errors.push('Auto-save interval must be between 10 and 300 seconds');
        }

        return errors;
    }

    /**
     * Apply theme to the page
     */
    applyTheme() {
        const body = document.body;
        body.classList.remove('dark-theme');
        
        if (this.currentSettings.theme === 'dark') {
            body.classList.add('dark-theme');
        } else if (this.currentSettings.theme === 'auto') {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                body.classList.add('dark-theme');
            }
        }
    }

    /**
     * Show status message
     */
    showStatus(message, type = 'success') {
        const statusElement = document.getElementById('status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `status-message ${type}`;
            
            // Hide message after 3 seconds
            setTimeout(() => {
                statusElement.style.opacity = '0';
            }, 3000);
        }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        const form = document.getElementById('settingsForm');
        const resetBtn = document.getElementById('resetBtn');

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const formSettings = this.getFormSettings();
                const validationErrors = this.validateSettings(formSettings);
                
                if (validationErrors.length > 0) {
                    this.showStatus(validationErrors.join(', '), 'error');
                    return;
                }
                
                this.currentSettings = formSettings;
                this.saveSettings();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset all settings to defaults?')) {
                    this.resetSettings();
                }
            });
        }

        // Apply theme changes immediately
        const themeElement = document.getElementById('theme');
        if (themeElement) {
            themeElement.addEventListener('change', () => {
                this.currentSettings.theme = themeElement.value;
                this.applyTheme();
            });
        }
    }

    /**
     * Get current settings
     */
    getSettings() {
        return { ...this.currentSettings };
    }

    /**
     * Update a specific setting
     */
    updateSetting(key, value) {
        if (this.currentSettings.hasOwnProperty(key)) {
            this.currentSettings[key] = value;
            this.updateUI();
            return true;
        }
        return false;
    }
}

// Initialize settings manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.settingsManager = new SettingsManager();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SettingsManager;
}