#!/usr/bin/env python3
"""
Greeting Card Generator
A Python script to generate and display a greeting card message with "Hello There" text.
"""

import time
import os

def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')

def print_border(width=50):
    """Print a decorative border."""
    print("+" + "=" * (width - 2) + "+")

def print_centered_text(text, width=50):
    """Print text centered within the given width."""
    padding = (width - len(text) - 2) // 2
    print("|" + " " * padding + text + " " * (width - len(text) - padding - 2) + "|")

def print_empty_line(width=50):
    """Print an empty line with borders."""
    print("|" + " " * (width - 2) + "|")

def animate_text(text, delay=0.1):
    """Animate text by printing character by character."""
    for char in text:
        print(char, end='', flush=True)
        time.sleep(delay)
    print()

def display_greeting_card():
    """Display the main greeting card."""
    clear_screen()
    
    # Card dimensions
    card_width = 50
    
    # Top border
    print_border(card_width)
    print_empty_line(card_width)
    
    # Decorative elements
    print_centered_text("🌟 ✨ 🌟 ✨ 🌟", card_width)
    print_empty_line(card_width)
    
    # Main message
    print_centered_text("HELLO THERE!", card_width)
    print_empty_line(card_width)
    
    # Sub message
    print_centered_text("Hope you have a wonderful day!", card_width)
    print_empty_line(card_width)
    
    # More decorative elements
    print_centered_text("🎉 🎈 🎉 🎈 🎉", card_width)
    print_empty_line(card_width)
    
    # Bottom border
    print_border(card_width)

def animated_greeting_card():
    """Display an animated version of the greeting card."""
    clear_screen()
    print("\n" * 5)
    
    # Animated greeting
    print(" " * 15, end="")
    animate_text("✨ Hello There! ✨", 0.2)
    
    time.sleep(1)
    
    print(" " * 10, end="")
    animate_text("🌟 Hope you have a wonderful day! 🌟", 0.1)
    
    print("\n" * 3)

def main():
    """Main function to run the greeting card program."""
    print("Welcome to the Greeting Card Generator!")
    print("Choose an option:")
    print("1. Static Greeting Card")
    print("2. Animated Greeting Card")
    print("3. Both")
    
    try:
        choice = input("\nEnter your choice (1, 2, or 3): ").strip()
        
        if choice == "1":
            display_greeting_card()
        elif choice == "2":
            animated_greeting_card()
        elif choice == "3":
            display_greeting_card()
            input("\nPress Enter to see the animated version...")
            animated_greeting_card()
        else:
            print("Invalid choice. Displaying static greeting card...")
            display_greeting_card()
            
    except KeyboardInterrupt:
        print("\n\nGoodbye! 👋")
    except Exception as e:
        print(f"\nAn error occurred: {e}")
        print("Displaying default greeting card...")
        display_greeting_card()

if __name__ == "__main__":
    main()