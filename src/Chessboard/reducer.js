import { fromJS } from 'immutable';
import engine from './utils/engine.js';
import * as events from './actions.js';

let init = fromJS({
    coordinates: true,        // weather or not to show coordinates
    orientation: 'white',     // orientation of the board from players perspective 
    promotion  : false,        // will hold information on pieces to be promoted 
    fen        : 'rnbqkbnr/pppppppP/8/8/8/8/PPPPPPP1/RNBQKBNR w KQkq - 0 1',
    draggable  : true,       // if pieces are draggable
    size       : 500,        // size of the board for both height and width
});

function reducer(state=init, action) {
    switch (action.type) {

        case events.CHESSBOARD_PIECE_MOVE:
            let from      = action.directions.piece.coordinate;
            let to        = action.directions.to;
            let promotion = action.directions.promotion;
            engine.move({from, to, promotion});
            state = state.set('fen', engine.fen());
            return state.set('promotion', false);

        case events.CHESSBOARD_SELECT_PROMOTION:
            return state.set('promotion', action.directions);

        case events.FLIP_ORIENTATION:
            return state.set('orientation', action.color);

        case events.SHOW_COORDINATES:
            return state.set('coordinates', action.state);

        case events.SET_FEN:
            return state.set('fen', action.fen);

        default:
            break;
    }
    return state;
}

export default reducer;