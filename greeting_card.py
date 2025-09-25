#!/usr/bin/env python3
"""
Hello World Greeting Card Generator
A simple Python script that creates and displays greeting card messages
"""

import sys
import time
from datetime import datetime

class GreetingCard:
    """A class to create and display greeting card messages"""
    
    def __init__(self):
        self.border_char = "═"
        self.corner_chars = ["╔", "╗", "╚", "╝"]
        self.side_char = "║"
        
    def create_border(self, width):
        """Create decorative border for the card"""
        top = self.corner_chars[0] + self.border_char * (width - 2) + self.corner_chars[1]
        bottom = self.corner_chars[2] + self.border_char * (width - 2) + self.corner_chars[3]
        return top, bottom
    
    def center_text(self, text, width):
        """Center text within given width"""
        padding = (width - len(text) - 2) // 2
        return f"{self.side_char}{' ' * padding}{text}{' ' * (width - len(text) - padding - 2)}{self.side_char}"
    
    def display_hello_world_card(self):
        """Display the main Hello World greeting card"""
        width = 50
        top_border, bottom_border = self.create_border(width)
        
        print("\n" + "🌟" * 20)
        print(top_border)
        print(self.center_text("", width))
        print(self.center_text("✨ HELLO WORLD GREETING CARD ✨", width))
        print(self.center_text("", width))
        print(self.center_text("Hello World!", width))
        print(self.center_text("", width))
        print(self.center_text("Welcome to this beautiful greeting!", width))
        print(self.center_text("Created with Python and love ❤️", width))
        print(self.center_text("", width))
        print(self.center_text(f"Generated on: {datetime.now().strftime('%B %d, %Y')}", width))
        print(self.center_text("", width))
        print(bottom_border)
        print("🌟" * 20 + "\n")
    
    def animated_hello_world(self):
        """Display animated Hello World message"""
        message = "Hello World!"
        print("\nAnimated Greeting:")
        
        # Letter by letter animation
        for i in range(len(message) + 1):
            sys.stdout.write(f"\r✨ {message[:i]}")
            sys.stdout.flush()
            time.sleep(0.2)
        
        print(" ✨")
        time.sleep(0.5)
        
        # Sparkle effect
        sparkles = ["✨", "🌟", "⭐", "💫", "🌠"]
        for _ in range(5):
            for sparkle in sparkles:
                sys.stdout.write(f"\r{sparkle} {message} {sparkle}")
                sys.stdout.flush()
                time.sleep(0.3)
        
        print(f"\n🎉 {message} 🎉\n")
    
    def interactive_menu(self):
        """Display interactive menu for different card options"""
        while True:
            print("\n" + "=" * 40)
            print("🎁 HELLO WORLD GREETING CARD MENU 🎁")
            print("=" * 40)
            print("1. Display Standard Greeting Card")
            print("2. Show Animated Hello World")
            print("3. Create Custom Message")
            print("4. Exit")
            print("=" * 40)
            
            try:
                choice = input("Select an option (1-4): ").strip()
                
                if choice == "1":
                    self.display_hello_world_card()
                elif choice == "2":
                    self.animated_hello_world()
                elif choice == "3":
                    self.create_custom_card()
                elif choice == "4":
                    print("\n👋 Thank you for using the Greeting Card Generator!")
                    print("🌟 Goodbye! 🌟\n")
                    break
                else:
                    print("❌ Invalid option. Please choose 1-4.")
                    
            except KeyboardInterrupt:
                print("\n\n👋 Goodbye!")
                break
            except Exception as e:
                print(f"❌ Error: {e}")
    
    def create_custom_card(self):
        """Allow user to create a custom greeting card"""
        print("\n🎨 Custom Greeting Card Creator")
        
        try:
            message = input("Enter your custom message: ").strip()
            if not message:
                message = "Hello World!"
            
            recipient = input("Enter recipient name (optional): ").strip()
            
            width = max(len(message) + 10, 40)
            top_border, bottom_border = self.create_border(width)
            
            print("\n🎁 Your Custom Greeting Card:")
            print(top_border)
            print(self.center_text("", width))
            print(self.center_text("🌟 CUSTOM GREETING CARD 🌟", width))
            print(self.center_text("", width))
            print(self.center_text(message, width))
            print(self.center_text("", width))
            
            if recipient:
                print(self.center_text(f"For: {recipient}", width))
                print(self.center_text("", width))
            
            print(self.center_text(f"Created: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}", width))
            print(self.center_text("", width))
            print(bottom_border)
            print()
            
        except KeyboardInterrupt:
            print("\n❌ Card creation cancelled.")

def main():
    """Main function to run the greeting card generator"""
    card_generator = GreetingCard()
    
    print("🎉 Welcome to the Hello World Greeting Card Generator! 🎉")
    
    # Quick demonstration
    card_generator.display_hello_world_card()
    
    # Ask if user wants interactive mode
    try:
        response = input("Would you like to explore more options? (y/n): ").strip().lower()
        if response in ['y', 'yes']:
            card_generator.interactive_menu()
        else:
            print("\n🌟 Thank you for trying the Hello World Greeting Card! 🌟")
    except KeyboardInterrupt:
        print("\n\n👋 Goodbye!")

if __name__ == "__main__":
    main()