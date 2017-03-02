import events from './constants.js';

function MovePiece(move) {
    return {type: events.CHESSBOARD_PIECE_MOVE, move};
}

function SelectPromotion(move) {
    return {type: events.CHESSBOARD_PIECE_PROMOTION, move};    
}

export function Promote(move, promotion) {
    return function(dispatch) {
        move.promotion = promotion[1]; 
        dispatch(MovePiece(move));
    }
}

// move = {
//      from      : <string> | values = a1 ... h8
//      to        : <string> | values = a1 ... h8
//      type      : <string> | values = r b n k q p
//      color     : <string> | values = b w
//      promotion : <string> | values = r b n q
//      method    : <string> | values = user api
// }
export function Move(move) {
    return function(dispatch){
        if (((move.type === 'p' && move.color === 'w' && move.to[1] === '8')  ||
             (move.type === 'p' && move.color === 'b' && move.to[1] === '1')) &&
             (move.method === "user")) {
            dispatch(SelectPromotion(move));
        } else {
            dispatch(MovePiece(move));
        }
    }
}

export function Orientation(color) {
    return {type: events.CHESSBOARD_SET_ORIENTATION, color}
}

export function Coordinates(state) {
    return {type: events.CHESSBOARD_SET_COORDINATES, state}
}

export function SetFEN(fen) {
    return {type: events.CHESSBOARD_SET_FEN, fen};
}
