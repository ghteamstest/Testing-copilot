# GitHub Copilot Testing - Settings Configuration
"""
This file demonstrates GitHub Copilot's ability to:
- Suggest configuration patterns
- Generate documentation
- Complete code structures
- Provide intelligent defaults
"""

class TestSettings:
    """Configuration settings for GitHub Copilot testing."""
    
    def __init__(self):
        # API Configuration
        self.api_endpoint = "https://api.github.com"
        self.timeout = 30
        self.retries = 3
        
        # Testing Configuration
        self.test_mode = True
        self.debug_mode = False
        self.log_level = "INFO"
        
        # GitHub Copilot Features to Test
        self.features_to_test = [
            "code_completion",
            "documentation_generation", 
            "bug_detection",
            "refactoring_assistance",
            "test_generation"
        ]
        
        # Performance Settings
        self.max_suggestions = 10
        self.suggestion_timeout = 5
        
    def validate_settings(self):
        """Validate configuration settings."""
        if self.timeout <= 0:
            raise ValueError("Timeout must be positive")
        if self.retries < 0:
            raise ValueError("Retries cannot be negative")
        return True
    
    def to_dict(self):
        """Convert settings to dictionary."""
        return {
            "api_endpoint": self.api_endpoint,
            "timeout": self.timeout,
            "retries": self.retries,
            "test_mode": self.test_mode,
            "debug_mode": self.debug_mode,
            "log_level": self.log_level,
            "features_to_test": self.features_to_test,
            "max_suggestions": self.max_suggestions,
            "suggestion_timeout": self.suggestion_timeout
        }

# Global settings instance
default_settings = TestSettings()