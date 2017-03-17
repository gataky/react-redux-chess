import { fromJS } from 'immutable';
import events     from './constants.js';
import Chess      from 'chess.js';

let init = fromJS({
    coordinates : true,       // weather or not to show coordinates
    orientation : true,       // orientation of the board from players perspective (true = white)
    promotion   : null,       // will hold information on pieces to be promoted 
    draggable   : true,       // if pieces are draggable
    engine      : new Chess(),// engine handles all the logic
    squares     : null,       // an object with information on a piece that has been selected {source: string, moves: list}

    // this sucks
    size        : 900 // document.getElementById('root').scrollWidth - 15, // size of the board for both height and width
});

function reducer(state=init, action) {
    let engine = state.get('engine').toJS()
    state = _reducer(state, engine, action);
    return state.set('engine', fromJS(engine));
}
export default reducer;

function _reducer(state, engine, action) {
    switch (action.type) {

        case events.CHESSBOARD_PIECE_MOVE:
            engine.move(action.move);
            state = state.set('fen', engine.fen());
            state = state.set('squares', null);
            return state.set('promotion', false);

        case events.CHESSBOARD_PIECE_PROMOTION:
            return state.set('promotion', action.move);

        case events.CHESSBOARD_SET_ORIENTATION:
            return state.set('orientation', action.orientation);

        case events.CHESSBOARD_SET_COORDINATES:
            return state.set('coordinates', action.coordinates);

        case events.CHESSBOARD_SET_FEN:
            engine.load(action.fen);
            return state.set('fen', action.fen);

        case events.CHESSBOARD_PIECE_SELECTED:
            let squares = {
                source: action.square,
                moves : engine.moves({square: action.square, verbose: true}),
            };

            if (state.get('squares') && state.get('squares').source === action.square) {
                return state.set('squares', null);
            }

            return state.set('squares', squares);

        default:
            console.log(action);
            return state;
    }
}
