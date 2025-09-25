#!/usr/bin/env node
/**
 * Hello World Greeting Card Generator (JavaScript/Node.js version)
 * A simple JavaScript script that creates and displays greeting card messages
 */

const readline = require('readline');

class GreetingCard {
    constructor() {
        this.borderChar = '═';
        this.cornerChars = ['╔', '╗', '╚', '╝'];
        this.sideChar = '║';
        
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    createBorder(width) {
        const top = this.cornerChars[0] + this.borderChar.repeat(width - 2) + this.cornerChars[1];
        const bottom = this.cornerChars[2] + this.borderChar.repeat(width - 2) + this.cornerChars[3];
        return { top, bottom };
    }

    centerText(text, width) {
        const padding = Math.floor((width - text.length - 2) / 2);
        const rightPadding = width - text.length - padding - 2;
        return `${this.sideChar}${' '.repeat(padding)}${text}${' '.repeat(rightPadding)}${this.sideChar}`;
    }

    displayHelloWorldCard() {
        const width = 50;
        const { top, bottom } = this.createBorder(width);
        const currentDate = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        console.log('\n' + '🌟'.repeat(20));
        console.log(top);
        console.log(this.centerText('', width));
        console.log(this.centerText('✨ HELLO WORLD GREETING CARD ✨', width));
        console.log(this.centerText('', width));
        console.log(this.centerText('Hello World!', width));
        console.log(this.centerText('', width));
        console.log(this.centerText('Welcome to this beautiful greeting!', width));
        console.log(this.centerText('Created with JavaScript and love ❤️', width));
        console.log(this.centerText('', width));
        console.log(this.centerText(`Generated on: ${currentDate}`, width));
        console.log(this.centerText('', width));
        console.log(bottom);
        console.log('🌟'.repeat(20) + '\n');
    }

    async animatedHelloWorld() {
        const message = 'Hello World!';
        console.log('\nAnimated Greeting:');

        // Letter by letter animation
        for (let i = 0; i <= message.length; i++) {
            process.stdout.write(`\r✨ ${message.substring(0, i)}`);
            await this.sleep(200);
        }

        console.log(' ✨');
        await this.sleep(500);

        // Sparkle effect
        const sparkles = ['✨', '🌟', '⭐', '💫', '🌠'];
        for (let i = 0; i < 5; i++) {
            for (const sparkle of sparkles) {
                process.stdout.write(`\r${sparkle} ${message} ${sparkle}`);
                await this.sleep(300);
            }
        }

        console.log(`\n🎉 ${message} 🎉\n`);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async createCustomCard() {
        console.log('\n🎨 Custom Greeting Card Creator');

        return new Promise((resolve) => {
            this.rl.question('Enter your custom message: ', (message) => {
                if (!message.trim()) {
                    message = 'Hello World!';
                }

                this.rl.question('Enter recipient name (optional): ', (recipient) => {
                    const width = Math.max(message.length + 10, 40);
                    const { top, bottom } = this.createBorder(width);
                    const currentDateTime = new Date().toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    });

                    console.log('\n🎁 Your Custom Greeting Card:');
                    console.log(top);
                    console.log(this.centerText('', width));
                    console.log(this.centerText('🌟 CUSTOM GREETING CARD 🌟', width));
                    console.log(this.centerText('', width));
                    console.log(this.centerText(message, width));
                    console.log(this.centerText('', width));

                    if (recipient.trim()) {
                        console.log(this.centerText(`For: ${recipient}`, width));
                        console.log(this.centerText('', width));
                    }

                    console.log(this.centerText(`Created: ${currentDateTime}`, width));
                    console.log(this.centerText('', width));
                    console.log(bottom);
                    console.log();

                    resolve();
                });
            });
        });
    }

    async interactiveMenu() {
        while (true) {
            console.log('\n' + '='.repeat(40));
            console.log('🎁 HELLO WORLD GREETING CARD MENU 🎁');
            console.log('='.repeat(40));
            console.log('1. Display Standard Greeting Card');
            console.log('2. Show Animated Hello World');
            console.log('3. Create Custom Message');
            console.log('4. Exit');
            console.log('='.repeat(40));

            const choice = await this.askQuestion('Select an option (1-4): ');

            switch (choice.trim()) {
                case '1':
                    this.displayHelloWorldCard();
                    break;
                case '2':
                    await this.animatedHelloWorld();
                    break;
                case '3':
                    await this.createCustomCard();
                    break;
                case '4':
                    console.log('\n👋 Thank you for using the Greeting Card Generator!');
                    console.log('🌟 Goodbye! 🌟\n');
                    this.rl.close();
                    return;
                default:
                    console.log('❌ Invalid option. Please choose 1-4.');
            }
        }
    }

    askQuestion(question) {
        return new Promise((resolve) => {
            this.rl.question(question, resolve);
        });
    }

    async main() {
        console.log('🎉 Welcome to the Hello World Greeting Card Generator! 🎉');

        // Quick demonstration
        this.displayHelloWorldCard();

        try {
            const response = await this.askQuestion('Would you like to explore more options? (y/n): ');
            if (response.trim().toLowerCase() === 'y' || response.trim().toLowerCase() === 'yes') {
                await this.interactiveMenu();
            } else {
                console.log('\n🌟 Thank you for trying the Hello World Greeting Card! 🌟');
                this.rl.close();
            }
        } catch (error) {
            console.log('\n👋 Goodbye!');
            this.rl.close();
        }
    }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
    console.log('\n\n👋 Goodbye!');
    process.exit(0);
});

// Run the application
const greetingCard = new GreetingCard();
greetingCard.main().catch(console.error);