# Settings Component

A comprehensive web-based settings management system built for testing GitHub Copilot functionality.

## Features

- **Theme Selection**: Light, Dark, and Auto themes with real-time preview
- **Notifications Toggle**: Enable/disable notifications 
- **Language Selection**: Support for English, Spanish, French, and German
- **Auto-save Configuration**: Configurable auto-save interval (10-300 seconds)
- **Persistent Storage**: Settings saved to localStorage
- **Reset Functionality**: One-click reset to defaults with confirmation
- **Input Validation**: Comprehensive validation with user-friendly error messages
- **Responsive Design**: Works on desktop and mobile devices

## Files

- `index.html` - Main settings interface
- `settings.js` - Settings manager JavaScript class
- `styles.css` - Styling and theme support
- `test.html` - Comprehensive test suite

## Usage

1. Open `index.html` in a web browser
2. Adjust settings as needed
3. Click "Save Settings" to persist changes
4. Use "Reset to Defaults" to restore original settings

## Testing

Open `test.html` to run the automated test suite. The tests cover:

- Settings initialization and default values
- Settings validation (valid and invalid inputs)
- Save and load functionality with localStorage
- Reset to defaults functionality
- Individual setting updates
- Settings retrieval

All tests use mocked localStorage to ensure reliable testing without side effects.

## Architecture

The `SettingsManager` class provides a clean API for:
- Loading and saving settings
- Validating user input
- Managing UI updates
- Handling theme changes
- Providing status feedback

The component is designed to be easily extensible and can be integrated into larger applications.