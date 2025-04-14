def convert_unit(value, from_unit, to_unit):
    conversions = {
        "meter": 1,
        "kilometer": 1000,
        "centimeter": 0.01,
        "inch": 0.0254,
        "foot": 0.3048,
    }
    try:
        base_value = value * conversions[from_unit.lower()]
        return base_value / conversions[to_unit.lower()]
    except KeyError:
        return "Unsupported unit"

import requests
def convert_currency(amount, from_currency, to_currency):
    try:
        response = requests.get("https://api.exchangerate.host/latest", params={"base": from_currency})
        rates = response.json().get("rates", {})
        return round(amount * rates.get(to_currency, 0), 2)
    except Exception as e:
        return {"error": str(e)}
