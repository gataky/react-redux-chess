import { 
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
}                   from 'redux';
import Immutable    from 'immutable';
import thunk        from 'redux-thunk';
import createLogger from 'redux-logger';
//import DevTools     from './components/DevTools';
import * as ChessboardReducers   from "./Chessboard/reducer.js";

const rootReducer = combineReducers({
    Chessboard: ChessboardReducers.default,
})

const logger = createLogger({ stateTransformer: (state) => {
    let newState = {};
    for (var i of Object.keys(state)) {
        if (Immutable.Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS();
        } else {
            newState[i] = state[i];
        }
    };
    return newState;
}
});

let middleware;
if (process.env.NODE_ENV === 'production') {
    middleware = applyMiddleware(thunk);
} else {
    middleware = compose(
        applyMiddleware(thunk, logger),
        //DevTools.instrument()
    )
}

const store = createStore(rootReducer, middleware);
export default store;
