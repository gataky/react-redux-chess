import { fromJS } from 'immutable';
import engine from './utils/engine.js';
import events from './constants.js';

let init = fromJS({
    coordinates: true,       // weather or not to show coordinates
    orientation: true,       // orientation of the board from players perspective (true = white)
    promotion  : null,       // will hold information on pieces to be promoted 
    draggable  : true,       // if pieces are draggable
    size       : 500,        // size of the board for both height and width
    //fen        : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    fen        : 'rnbqkbn1/pppppppP/8/8/8/8/PPPPPPP1/RNBQKBNR w KQkq - 0 1',
});

function reducer(state=init, action) {
    switch (action.type) {

        case events.CHESSBOARD_PIECE_MOVE:
            engine.move(action.move);
            state = state.set('fen', engine.fen());
            return state.set('promotion', false);

        case events.CHESSBOARD_PIECE_PROMOTION:
            return state.set('promotion', action.move);

        case events.CHESSBOARD_SET_ORIENTATION:
            return state.set('orientation', action.orientation);

        case events.CHESSBOARD_SET_COORDINATES:
            return state.set('coordinates', action.coordinates);

        case events.CHESSBOARD_SET_FEN:
            return state.set('fen', action.fen);

        default:
            break;
    }
    return state;
}

export default reducer;
