#!/usr/bin/env node
/**
 * Greeting Card Generator in JavaScript
 * A Node.js script to generate and display a greeting card message with "Hello There" text.
 */

const readline = require('readline');

// ANSI color codes for terminal styling
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    bg_red: '\x1b[41m',
    bg_green: '\x1b[42m',
    bg_yellow: '\x1b[43m',
    bg_blue: '\x1b[44m',
    bg_magenta: '\x1b[45m',
    bg_cyan: '\x1b[46m'
};

/**
 * Clear the terminal screen
 */
function clearScreen() {
    console.clear();
}

/**
 * Print a decorative border
 * @param {number} width - Width of the border
 * @param {string} color - Color for the border
 */
function printBorder(width = 50, color = colors.cyan) {
    console.log(color + "+" + "=".repeat(width - 2) + "+" + colors.reset);
}

/**
 * Print text centered within the given width
 * @param {string} text - Text to center
 * @param {number} width - Width of the container
 * @param {string} color - Color for the text
 */
function printCenteredText(text, width = 50, color = colors.white) {
    const padding = Math.floor((width - text.length - 2) / 2);
    const rightPadding = width - text.length - padding - 2;
    console.log(colors.cyan + "|" + color + " ".repeat(padding) + text + " ".repeat(rightPadding) + colors.cyan + "|" + colors.reset);
}

/**
 * Print an empty line with borders
 * @param {number} width - Width of the line
 */
function printEmptyLine(width = 50) {
    console.log(colors.cyan + "|" + " ".repeat(width - 2) + "|" + colors.reset);
}

/**
 * Sleep for a given number of milliseconds
 * @param {number} ms - Milliseconds to sleep
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Animate text by printing character by character
 * @param {string} text - Text to animate
 * @param {number} delay - Delay between characters in ms
 */
async function animateText(text, delay = 100) {
    for (const char of text) {
        process.stdout.write(char);
        await sleep(delay);
    }
    console.log();
}

/**
 * Display the main greeting card
 */
function displayGreetingCard() {
    clearScreen();
    
    const cardWidth = 50;
    
    // Top border
    printBorder(cardWidth);
    printEmptyLine(cardWidth);
    
    // Decorative elements
    printCenteredText("🌟 ✨ 🌟 ✨ 🌟", cardWidth, colors.yellow);
    printEmptyLine(cardWidth);
    
    // Main message
    printCenteredText("HELLO THERE!", cardWidth, colors.bright + colors.magenta);
    printEmptyLine(cardWidth);
    
    // Sub message
    printCenteredText("Hope you have a wonderful day!", cardWidth, colors.green);
    printEmptyLine(cardWidth);
    
    // More decorative elements
    printCenteredText("🎉 🎈 🎉 🎈 🎉", cardWidth, colors.yellow);
    printEmptyLine(cardWidth);
    
    // Bottom border
    printBorder(cardWidth);
}

/**
 * Display an animated version of the greeting card
 */
async function animatedGreetingCard() {
    clearScreen();
    console.log("\n".repeat(5));
    
    // Animated greeting
    process.stdout.write(" ".repeat(15));
    await animateText(colors.bright + colors.yellow + "✨ Hello There! ✨" + colors.reset, 200);
    
    await sleep(1000);
    
    process.stdout.write(" ".repeat(10));
    await animateText(colors.bright + colors.green + "🌟 Hope you have a wonderful day! 🌟" + colors.reset, 100);
    
    console.log("\n".repeat(3));
}

/**
 * Generate a simple ASCII art greeting
 */
function displayAsciiGreeting() {
    clearScreen();
    console.log(colors.bright + colors.cyan + `
    ╔══════════════════════════════════════════════╗
    ║                                              ║
    ║    ██╗  ██╗███████╗██╗     ██╗      ██████╗   ║
    ║    ██║  ██║██╔════╝██║     ██║     ██╔═══██╗  ║
    ║    ███████║█████╗  ██║     ██║     ██║   ██║  ║
    ║    ██╔══██║██╔══╝  ██║     ██║     ██║   ██║  ║
    ║    ██║  ██║███████╗███████╗███████╗╚██████╔╝  ║
    ║    ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝   ║
    ║                                              ║
    ║               ████████╗██╗  ██╗███████╗██████╗ ███████╗   ║
    ║               ╚══██╔══╝██║  ██║██╔════╝██╔══██╗██╔════╝   ║
    ║                  ██║   ███████║█████╗  ██████╔╝█████╗     ║
    ║                  ██║   ██╔══██║██╔══╝  ██╔══██╗██╔══╝     ║
    ║                  ██║   ██║  ██║███████╗██║  ██║███████╗   ║
    ║                  ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝   ║
    ║                                              ║
    ║              Hope you have a wonderful day!  ║
    ║                                              ║
    ╚══════════════════════════════════════════════╝
    ` + colors.reset);
}

/**
 * Main function to run the greeting card program
 */
async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(colors.bright + colors.blue + "Welcome to the Greeting Card Generator!" + colors.reset);
    console.log("Choose an option:");
    console.log("1. Static Greeting Card");
    console.log("2. Animated Greeting Card");
    console.log("3. ASCII Art Greeting");
    console.log("4. All variations");

    rl.question("\nEnter your choice (1, 2, 3, or 4): ", async (choice) => {
        try {
            switch (choice.trim()) {
                case "1":
                    displayGreetingCard();
                    break;
                case "2":
                    await animatedGreetingCard();
                    break;
                case "3":
                    displayAsciiGreeting();
                    break;
                case "4":
                    displayGreetingCard();
                    console.log("\nPress Enter to see the animated version...");
                    rl.question("", async () => {
                        await animatedGreetingCard();
                        console.log("Press Enter to see the ASCII art version...");
                        rl.question("", () => {
                            displayAsciiGreeting();
                            rl.close();
                        });
                    });
                    return;
                default:
                    console.log("Invalid choice. Displaying static greeting card...");
                    displayGreetingCard();
                    break;
            }
        } catch (error) {
            console.error(`An error occurred: ${error.message}`);
            console.log("Displaying default greeting card...");
            displayGreetingCard();
        }
        
        rl.close();
    });
}

// Run the program if this file is executed directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    displayGreetingCard,
    animatedGreetingCard,
    displayAsciiGreeting
};