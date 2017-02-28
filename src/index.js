import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

import Board        from './ChessBoard/Board.js';
import store        from './store.js'

import './index.css';

//let fen = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1';
//let fen = 'rnbqkbn1/pppppppP/8/8/8/8/PPPPPPP1/RNBQKBNR w KQkq - 0 1';

//let orientation = 'white';
//let coordinates = true;

function flip() {
    //if (orientation === 'white') {
        //orientation = 'black';
    //} else {
        //orientation = 'white';
    //}
    render();
}

function showCoordinates() {
    //coordinates = !coordinates;
    render();
}

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <div>
                <div className="display">
                     <Board />
                 </div>
                 <button onClick={flip}>Flip</button>
                 <button onClick={showCoordinates}>Coordinates</button>
            </div>
        </Provider>,
        document.getElementById("root")
    );
}

render();
