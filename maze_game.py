import tkinter as tk


# ==============================
# MAZE SETTINGS
# ==============================

CELL_SIZE = 50

maze = [
    "1111111111",
    "1000000001",
    "1011111101",
    "1010000101",
    "1010110101",
    "1010100101",
    "1010101101",
    "1000100001",
    "1110111101",
    "1111111111"
]

ROWS = len(maze)
COLS = len(maze[0])


# ==============================
# PLAYER AND GOAL
# ==============================

player_row = 1
player_col = 1

goal_row = 8
goal_col = 8


# ==============================
# CREATE WINDOW
# ==============================

root = tk.Tk()

root.title("Python Maze Game 🌀")

root.resizable(False, False)


# ==============================
# SCORE
# ==============================

moves = 0

info_label = tk.Label(
    root,
    text="🌀 Reach the green goal! | Moves: 0",
    font=("Arial", 16, "bold"),
    pady=10
)

info_label.pack()


# ==============================
# CREATE CANVAS
# ==============================

canvas = tk.Canvas(
    root,
    width=COLS * CELL_SIZE,
    height=ROWS * CELL_SIZE,
    bg="black"
)

canvas.pack()


# ==============================
# DRAW MAZE
# ==============================

def draw_maze():

    canvas.delete("all")

    for row in range(ROWS):

        for col in range(COLS):

            x1 = col * CELL_SIZE
            y1 = row * CELL_SIZE

            x2 = x1 + CELL_SIZE
            y2 = y1 + CELL_SIZE


            # WALL
            if maze[row][col] == "1":

                canvas.create_rectangle(
                    x1,
                    y1,
                    x2,
                    y2,
                    fill="#222222",
                    outline="black"
                )


            # PATH
            else:

                canvas.create_rectangle(
                    x1,
                    y1,
                    x2,
                    y2,
                    fill="white",
                    outline="#dddddd"
                )


    # ==============================
    # DRAW GOAL
    # ==============================

    goal_x1 = goal_col * CELL_SIZE
    goal_y1 = goal_row * CELL_SIZE

    goal_x2 = goal_x1 + CELL_SIZE
    goal_y2 = goal_y1 + CELL_SIZE


    canvas.create_rectangle(
        goal_x1,
        goal_y1,
        goal_x2,
        goal_y2,
        fill="green",
        outline="black"
    )


    # ==============================
    # DRAW PLAYER
    # ==============================

    player_x1 = player_col * CELL_SIZE + 8
    player_y1 = player_row * CELL_SIZE + 8

    player_x2 = player_x1 + CELL_SIZE - 16
    player_y2 = player_y1 + CELL_SIZE - 16


    canvas.create_oval(
        player_x1,
        player_y1,
        player_x2,
        player_y2,
        fill="blue",
        outline="black"
    )


# ==============================
# MOVE PLAYER
# ==============================

def move_player(event):

    global player_row
    global player_col
    global moves


    new_row = player_row
    new_col = player_col


    if event.keysym == "Up":

        new_row -= 1


    elif event.keysym == "Down":

        new_row += 1


    elif event.keysym == "Left":

        new_col -= 1


    elif event.keysym == "Right":

        new_col += 1


    # ==============================
    # CHECK IF PLAYER CAN MOVE
    # ==============================

    if (
        0 <= new_row < ROWS
        and
        0 <= new_col < COLS
        and
        maze[new_row][new_col] == "0"
    ):

        player_row = new_row
        player_col = new_col

        moves += 1


        info_label.config(
            text=f"🌀 Reach the green goal! | Moves: {moves}"
        )


        draw_maze()


        check_win()


# ==============================
# CHECK WIN
# ==============================

def check_win():

    if (
        player_row == goal_row
        and
        player_col == goal_col
    ):

        info_label.config(
            text=f"🏆 YOU WIN! You escaped in {moves} moves!"
        )


        canvas.create_text(
            COLS * CELL_SIZE / 2,
            ROWS * CELL_SIZE / 2,
            text="🎉 YOU WIN! 🎉",
            font=("Arial", 28, "bold"),
            fill="red"
        )


# ==============================
# RESTART GAME
# ==============================

def restart_game():

    global player_row
    global player_col
    global moves


    player_row = 1
    player_col = 1

    moves = 0


    info_label.config(
        text="🌀 Reach the green goal! | Moves: 0"
    )


    draw_maze()


# ==============================
# RESTART BUTTON
# ==============================

restart_button = tk.Button(
    root,
    text="🔄 Restart Game",
    font=("Arial", 14, "bold"),
    command=restart_game,
    bg="#00cc66",
    fg="white",
    padx=20,
    pady=10
)

restart_button.pack(pady=10)


# ==============================
# KEYBOARD CONTROLS
# ==============================

root.bind(
    "<Up>",
    move_player
)

root.bind(
    "<Down>",
    move_player
)

root.bind(
    "<Left>",
    move_player
)

root.bind(
    "<Right>",
    move_player
)


# ==============================
# START GAME
# ==============================

draw_maze()

root.mainloop()