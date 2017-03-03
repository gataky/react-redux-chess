import events from './constants.js';

// Below is the structure of how to issue a move command on the board.
// There are two ways in which a piece can be moved: by the user, or by 
// some api.  This move action has all the information needed to update
// the state of the engine.
// move = {
//      method    : <string> | values = user api
//  user:
//      from      : <string> | values = a1 ... h8
//      to        : <string> | values = a1 ... h8
//      type      : <string> | values = r b n k q p
//      color     : <string> | values = b w
//      promotion : <string> | values = r b n q
//  api:
//      to        : <string> | values = various forms of long algebraic notation h7xg8=r
// }

function _user_move(move) {
    return {type: events.CHESSBOARD_PIECE_MOVE_USER, move};
}

function _api_move(move) {
    return function(dispatch) {
        dispatch(_move_animation_start(move));
    }
}

function _move_animation_start(move) {
    return {type: events.CHESSBOARD_MOVE_ANIMATION_START, move};
}

export function _move_animation_stop(move) {
    return {type: events.CHESSBOARD_MOVE_ANIMATION_STOP, move};
}

function _promotion(move) {
    return {type: events.CHESSBOARD_PIECE_PROMOTION, move};    
}

/* Promote
 * Promotes a move from 7th to 8th for white or 2nd to 1st for black
 * to the promotion piece selected by the user. This method is only valid
 * for pawn promotions as there are no other types of promotion allowed in
 * chess.  If you try and promote a non pawn piece, or a pawn piece on the 
 * wrong rank then the engine will refuse to set the new position.
 */
export function Promote(move, promotion) {
    return function(dispatch) {
        move.promotion = promotion[1]; 
        dispatch(_user_move(move));
    }
}

/* Move
 * Moves a piece on the board.  If the method of move was user then will check
 * for promotion ability.  If it's determined that it's a promotion move then 
 * we'll dispatch the select promotion action to allow the user to select the 
 * promotion type.  If the move was made by an api then the move should have
 * all the information needed to handle any promotion and no dialog will appear.
 */
export function Move(move) {
    return function(dispatch){
        // user action promotion
        if ( (move.method === 'user')                                         &&
            ((move.type === 'p' && move.color === 'w' && move.to[1] === '8')  ||
             (move.type === 'p' && move.color === 'b' && move.to[1] === '1'))) {
            dispatch(_promotion(move));
        // normal move either user or api
        } else {
            if (move.method === 'user') {
                dispatch(_user_move(move));
            } else {
                dispatch(_api_move(move));
            }
        }
    }
}

export function Moves(moves) {
    return function(dispatch) {
        for (let i = 0; i < moves.length; i++) {
            dispatch(_api_move(moves[i]));
        }
    }
}

/* Orientation
 * Sets the orientation of the board with white being the true orientation and 
 * black being false.
 */
export function Orientation(orientation) {
    return {type: events.CHESSBOARD_SET_ORIENTATION, orientation}
}

/* Coordinates 
 * Display the coordinates on the left most file and bottom rand if true otherwise
 * don't display coordinates.
 */
export function Coordinates(coordinates) {
    return {type: events.CHESSBOARD_SET_COORDINATES, coordinates}
}

/* SetFEN
 * Sets a fully qualified fen, must have all fields for engine to accept
 */
export function SetFEN(fen) {
    return {type: events.CHESSBOARD_SET_FEN, fen};
}
