import { fromJS } from 'immutable';
import events from './constants.js';
import Chess from 'chess.js';

let init = fromJS({
    coordinates: true,       // weather or not to show coordinates
    orientation: true,       // orientation of the board from players perspective (true = white)
    promotion  : null,       // will hold information on pieces to be promoted 
    draggable  : true,       // if pieces are draggable
    size       : 500,        // size of the board for both height and width
    engine     : new Chess(),// engine handles all the logic
});

function reducer(state=init, action) {
    let engine = state.get('engine').toJS()
    state = _reducer(state, engine, action);
    return state.set('engine', fromJS(engine));
}

function _reducer(state, engine, action) {
    switch (action.type) {

        case events.CHESSBOARD_PIECE_MOVE_USER:
            let result = engine.move(action.move);
            state = state.set('fen', engine.fen());
            return state.set('promotion', false);

        case events.CHESSBOARD_MOVE_ANIMATION_START:
            result = engine.move(action.move.to, {readonly: true});

            let from = getPosition(document.getElementById('chessboard-' + result.from));
            let to   = getPosition(document.getElementById('chessboard-' + result.to));

            let y = from.top - to.top;
            let x = from.left - to.left;
            return state.set('animation', {x, y});

        case events.CHESSBOARD_PIECE_PROMOTION:
            return state.set('promotion', action.move);

        case events.CHESSBOARD_SET_ORIENTATION:
            return state.set('orientation', action.orientation);

        case events.CHESSBOARD_SET_COORDINATES:
            return state.set('coordinates', action.coordinates);

        case events.CHESSBOARD_SET_FEN:
            engine.load(action.fen);
            return state.set('fen', action.fen);

        default:
            return state;
    }
}

export default reducer;

function getPosition(element) {
    return {left: element.offsetLeft, top: element.offsetTop};
}
