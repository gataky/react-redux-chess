import events from './constants.js';

function MovePiece(directions) {
    return {type: events.CHESSBOARD_PIECE_MOVE, directions};
}

function SelectPromotion(directions) {
    return {type: events.CHESSBOARD_PIECE_PROMOTION, directions};    
}

export function Promote(directions, promotion) {
    return function(dispatch) {
        directions.promotion = promotion[1]; 
        dispatch(MovePiece(directions));
    }
}

export function Move(directions) {
    return function(dispatch){

        let piece = directions.piece.type[1];
        let color = directions.piece.type[0];
        let rank  = directions.to[1];

        if ((piece === 'p' && color === 'w' && rank === '8') ||
            (piece === 'p' && color === 'b' && rank === '1')) {
            dispatch(SelectPromotion(directions));
        } else {
            dispatch(MovePiece(directions));
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
