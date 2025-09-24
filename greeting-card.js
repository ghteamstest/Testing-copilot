/**
 * Greeting Card Generator
 * Creates a greeting card message with "hello there" text
 */

class GreetingCard {
    constructor(message = "Hello There") {
        this.message = message;
        this.subtitle = "A warm greeting just for you!";
        this.decorations = ["🌟", "✨", "⭐", "💫"];
    }

    /**
     * Display the greeting card in the console
     */
    displayConsole() {
        const border = "═".repeat(50);
        const padding = " ".repeat(4);
        
        console.log(`╔${border}╗`);
        console.log(`║${" ".repeat(50)}║`);
        console.log(`║${this.centerText("🌟 GREETING CARD 🌟", 50)}║`);
        console.log(`║${" ".repeat(50)}║`);
        console.log(`║${this.centerText(this.message.toUpperCase(), 50)}║`);
        console.log(`║${" ".repeat(50)}║`);
        console.log(`║${this.centerText(this.subtitle, 50)}║`);
        console.log(`║${" ".repeat(50)}║`);
        console.log(`║${padding}${this.decorations.join("  ")}${" ".repeat(50 - 4 - (this.decorations.length * 3 - 1))}║`);
        console.log(`║${" ".repeat(50)}║`);
        console.log(`╚${border}╝`);
    }

    /**
     * Get the greeting card as HTML string
     */
    toHTML() {
        return `
        <div style="
            width: 400px;
            height: 300px;
            background: linear-gradient(145deg, #ffffff, #f0f0f0);
            border-radius: 20px;
            box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: Georgia, serif;
            margin: 20px auto;
        ">
            <h1 style="
                font-size: 2.5em;
                color: #333;
                text-align: center;
                margin: 0;
                font-weight: bold;
                letter-spacing: 2px;
            ">${this.message}</h1>
            <p style="
                font-size: 1.2em;
                color: #666;
                text-align: center;
                margin-top: 20px;
                font-style: italic;
            ">${this.subtitle}</p>
            <div style="margin-top: 20px; font-size: 1.5em;">
                ${this.decorations.join(" ")}
            </div>
        </div>`;
    }

    /**
     * Get the greeting card as plain text
     */
    toText() {
        const border = "═".repeat(38);
        return `
╔${border}╗
║                                      ║
║           🌟 GREETING CARD 🌟          ║
║                                      ║
║              ${this.message.toUpperCase().padStart(17).padEnd(21)}    ║
║                                      ║
║        ${this.subtitle.padStart(22).padEnd(26)}    ║
║                                      ║
║                                  ✨  ║
║   ⭐                                  ║
║                              🌟     ║
║                                      ║
╚${border}╝`;
    }

    /**
     * Center text within a given width
     */
    centerText(text, width) {
        const padding = Math.max(0, Math.floor((width - text.length) / 2));
        return " ".repeat(padding) + text + " ".repeat(width - padding - text.length);
    }
}

// Example usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GreetingCard;
} else {
    // Browser environment
    const greetingCard = new GreetingCard("Hello There");
    
    // Display in console
    greetingCard.displayConsole();
    
    // For browser usage, you can get HTML or text
    console.log("HTML version:", greetingCard.toHTML());
    console.log("Text version:", greetingCard.toText());
}

// Node.js usage example
if (typeof require !== 'undefined' && require.main === module) {
    const card = new GreetingCard("Hello There");
    card.displayConsole();
    console.log("\nText version:");
    console.log(card.toText());
}