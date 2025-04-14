def new_game():
    return {"board": [""] * 9, "next_player": "X"}

def make_move(board, player, position):
    if board[position] == "":
        board[position] = player
        return {"board": board, "next_player": "O" if player == "X" else "X"}
    return {"error": "Invalid move", "board": board}
