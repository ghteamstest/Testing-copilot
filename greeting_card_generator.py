#!/usr/bin/env python3
"""
Greeting Card Generator
A simple script to generate greeting card messages
"""

import datetime

class GreetingCard:
    def __init__(self, message="Hello There"):
        self.message = message
        self.created_at = datetime.datetime.now()
    
    def display_card(self):
        """Display the greeting card in ASCII art format"""
        border_char = "="
        star_char = "*"
        border_length = max(40, len(self.message) + 10)
        
        # Create the card design
        border_line = border_char * border_length
        empty_line = border_char + " " * (border_length - 2) + border_char
        
        # Center the message
        message_padding = (border_length - len(self.message) - 2) // 2
        message_line = border_char + " " * message_padding + self.message + " " * (border_length - len(self.message) - message_padding - 2) + border_char
        
        # Star decoration
        star_padding = (border_length - 3) // 2
        star_line = border_char + " " * star_padding + star_char + " " * (border_length - star_padding - 3) + border_char
        
        print("\n" + border_line)
        print(empty_line)
        print(star_line)
        print(empty_line)
        print(message_line)
        print(empty_line)
        print(star_line)
        print(empty_line)
        print(border_line)
        print(f"\nGenerated on: {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}")
    
    def get_html_card(self):
        """Generate HTML version of the greeting card"""
        html_template = f"""
        <div style="
            border: 3px solid #333;
            padding: 20px;
            text-align: center;
            background: linear-gradient(45deg, #f3f3f3, #e8e8e8);
            border-radius: 10px;
            max-width: 400px;
            margin: 20px auto;
            font-family: Arial, sans-serif;
        ">
            <h1 style="color: #333; margin: 20px 0;">{self.message}</h1>
            <p style="color: #666;">✨ Wishing you a wonderful day! ✨</p>
            <small style="color: #999;">Created: {self.created_at.strftime('%Y-%m-%d')}</small>
        </div>
        """
        return html_template

def main():
    """Main function to demonstrate the greeting card"""
    # Create a greeting card with "Hello There" message
    card = GreetingCard("Hello There")
    
    print("=== GREETING CARD GENERATOR ===")
    print("ASCII Version:")
    card.display_card()
    
    print("\n" + "="*50)
    print("HTML Version (for web display):")
    print(card.get_html_card())

if __name__ == "__main__":
    main()