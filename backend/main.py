from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Literal

app = FastAPI()

# Enable CORS so frontend can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific origin like "http://localhost:3000" for better security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Request Models ---

class UnitConversionRequest(BaseModel):
    value: float
    fromUnit: str
    toUnit: str

class CurrencyConversionRequest(BaseModel):
    amount: float
    fromCurrency: str
    toCurrency: str

class TicTacToeMove(BaseModel):
    board: List[List[str]]
    player: Literal["X", "O"]

# --- Sample routes matching the frontend calls ---

@app.get("/quote")
def get_quote():
    return {"quote": "Code is like humor. When you have to explain it, it’s bad."}

@app.get("/python-tip")
def get_python_tip():
    return {"tip": "Use list comprehensions for cleaner and faster code."}

# --- POST Handlers ---

@app.post("/convert-units")
def convert_units(req: UnitConversionRequest):
    # Simple conversion for example (e.g., cm to m)
    conversion_factors = {
        ("cm", "m"): 0.01,
        ("m", "cm"): 100,
        ("kg", "g"): 1000,
        ("g", "kg"): 0.001,
    }
    factor = conversion_factors.get((req.fromUnit, req.toUnit))
    if not factor:
        return {"error": "Conversion not supported"}
    return {"result": req.value * factor}

@app.post("/convert-currency")
def convert_currency(req: CurrencyConversionRequest):
    # Static exchange rates for demo
    rates = {
        ("USD", "EUR"): 0.9,
        ("EUR", "USD"): 1.1,
    }
    rate = rates.get((req.fromCurrency, req.toCurrency))
    if not rate:
        return {"error": "Currency conversion not supported"}
    return {"converted": req.amount * rate}


@app.post("/tic-tac-toe/move")
def make_move(req: TicTacToeMove):
    board = req.board
    player = req.player

    for i in range(3):
        for j in range(3):
            if board[i][j] == "":
                board[i][j] = player
                return {
                    "board": board,
                    "message": f"Player {player} moved to ({i}, {j})"
                }

    return {
        "board": board,
        "message": "No moves available"
    }
