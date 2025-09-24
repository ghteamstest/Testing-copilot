# Greeting Card Message - "Hello There"

This collection of greeting card implementations demonstrates the "Hello There" message in multiple formats and programming languages, showcasing various GitHub Copilot capabilities.

## Files Overview

### 1. `greeting_card.html` - Interactive HTML Greeting Card
A beautiful, animated HTML greeting card with:
- CSS animations (shimmer effect, twinkling stars)
- Gradient backgrounds
- Responsive design
- Decorative elements (✨, ⭐, 🌟)
- Centered "Hello There!" message

**To view:** Open in a web browser or serve with `python3 -m http.server 8000`

### 2. `greeting_card.py` - Python Terminal Greeting Card
A Python script offering multiple greeting card options:
- Static bordered greeting card
- Animated character-by-character text display
- Interactive menu system
- Terminal clearing and formatting

**To run:**
```bash
python3 greeting_card.py
```

### 3. `greeting_card.js` - Node.js Enhanced Greeting Card
A JavaScript/Node.js implementation featuring:
- ANSI color support for terminal styling
- ASCII art version of "HELLO THERE"
- Multiple display options (static, animated, ASCII art)
- Colorful terminal output
- Promise-based animations

**To run:**
```bash
node greeting_card.js
```

### 4. `greeting_card.txt` - Plain Text Greeting Cards
Three different text-based greeting card designs:
- Simple bordered card
- Rounded corner design with Unicode box drawing
- Double-lined elegant card with emojis

**To view:**
```bash
cat greeting_card.txt
```

## Features Demonstrated

### Programming Concepts
- **HTML/CSS**: Advanced styling, animations, flexbox layout
- **Python**: Object-oriented design, terminal manipulation, user interaction
- **JavaScript/Node.js**: Async/await, readline interface, ANSI colors, modular exports
- **Text Art**: Unicode box drawing characters, emoji integration

### GitHub Copilot Capabilities Showcased
- Multi-language code generation
- Consistent styling across implementations
- Interactive user interface design
- Animation and visual effects
- Documentation generation
- Error handling and user input validation

## Usage Examples

### Quick Display
```bash
# Show static text version
cat greeting_card.txt

# Show Python version (option 1)
echo "1" | python3 greeting_card.py

# Show JavaScript version (option 1)
echo "1" | node greeting_card.js
```

### Interactive Usage
```bash
# Interactive Python version
python3 greeting_card.py

# Interactive JavaScript version
node greeting_card.js

# HTML version (requires web server)
python3 -m http.server 8000
# Then open http://localhost:8000/greeting_card.html
```

## Technical Details

### Dependencies
- **HTML**: Modern web browser with CSS3 support
- **Python**: Python 3.x (built-in modules only)
- **JavaScript**: Node.js (built-in modules only)
- **Text**: Any terminal or text viewer

### Compatibility
- Works on Linux, macOS, and Windows
- Terminal implementations support ANSI colors
- HTML version works in all modern browsers
- No external dependencies required

## Message Variations

All implementations feature the core "Hello There!" message with additional supportive text:
- "Hope you have a wonderful day!"
- "May your day be filled with joy and happiness!"
- "Sending you warm wishes and good vibes!"
- "With love and care, Your Friend 💕"

## Contributing

This is part of the Testing Copilot repository. Feel free to:
- Add new greeting card implementations in other languages
- Enhance existing designs with more animations or features
- Create themed variations (holidays, seasons, etc.)
- Improve accessibility features

## Screenshots

The HTML implementation features a beautiful animated greeting card with:
- Purple gradient background
- White card with subtle shadows
- Sparkling star animations
- Shimmer overlay effect
- Centered typography with emojis

*Screenshot saved as `/tmp/playwright-logs/greeting-card-html.png`*