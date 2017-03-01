const events = {
    CHESSBOARD_SET_FEN         : null,  
    CHESSBOARD_SET_ORIENTATION : null,
    CHESSBOARD_SET_COORDINATES : null,  
    CHESSBOARD_PIECE_MOVE      : null,         
    CHESSBOARD_PIECE_PROMOTION : null,
};

for (let key in events) {
    if (true) { events[key] = key }
}

export default events;

export const itemTypes = {
    PIECE: 'piece',
}

export const squaresWithCoordinates = {
    white: {
        'a1': 'b', 'a2': 'n', 'a3': 'n', 
        'a4': 'n', 'a5': 'n', 'a6': 'n', 
        'a7': 'n', 'a8': 'n', 'b1': 'l', 
        'c1': 'l', 'd1': 'l', 'e1': 'l',
        'f1': 'l', 'g1': 'l', 'h1': 'l',
    },

    black: {
        'h8': 'b', 'h1': 'n', 'h2': 'n',
        'h3': 'n', 'h4': 'n', 'h5': 'n',
        'h6': 'n', 'h7': 'n', 'a8': 'l',
        'b8': 'l', 'c8': 'l', 'd8': 'l',
        'e8': 'l', 'f8': 'l', 'g8': 'l',
    }
}