import { fromJS } from 'immutable';
import events from './constants.js';
import Chess from 'chess.js';

let init = fromJS({
    coordinates: true,       // weather or not to show coordinates
    orientation: true,       // orientation of the board from players perspective (true = white)
    promotion  : null,       // will hold information on pieces to be promoted 
    draggable  : true,       // if pieces are draggable
    size       : 500,        // size of the board for both height and width
    //fen        : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    //fen        : 'rnbqkbn1/pppppppP/8/8/8/8/PPPPPPP1/RNBQKBNR w KQkq - 0 1',
    engine     : new Chess(),
});

function reducer(state=init, action) {
    let engine = state.get('engine').toJS()
    switch (action.type) {

        case events.CHESSBOARD_PIECE_MOVE:
            engine.move(action.move);
            state = state.set('fen', engine.fen());
            state = state.set('promotion', false);
            break;

        case events.CHESSBOARD_PIECE_PROMOTION:
            state = state.set('promotion', action.move);
            break;

        case events.CHESSBOARD_SET_ORIENTATION:
            state = state.set('orientation', action.orientation);
            break;

        case events.CHESSBOARD_SET_COORDINATES:
            state = state.set('coordinates', action.coordinates);
            break

        case events.CHESSBOARD_SET_FEN:
            engine.load(action.fen);
            state = state.set('fen', action.fen);
            break;

        default:
            break;
    }
    return state.set('engine', fromJS(engine));
}

export default reducer;
