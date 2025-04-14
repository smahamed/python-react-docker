import random

def get_daily_quote():
    try:
        with open("quotes.txt", "r") as f:
            quotes = f.readlines()
        return random.choice(quotes).strip()
    except FileNotFoundError:
        return "Keep going. You're doing great!"

def get_python_tip():
    tips = {
        "tip1": "Use list comprehensions for cleaner code.",
        "tip2": "Use virtual environments to manage dependencies.",
        "tip3": "Use f-strings for better string formatting.",
        "tip4": "Use enumerate() to get index and value in loops.",
        "tip5": "Handle exceptions with try-except blocks.",
    }
    return random.choice(list(tips.values()))
