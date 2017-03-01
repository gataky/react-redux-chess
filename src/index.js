import React        from 'react';
import ReactDOM     from 'react-dom';
import { Provider } from 'react-redux';

import Chessboard from './ChessBoard/Chessboard.js';
import store        from './store.js'

import './index.css';

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <div className="display">
                 <Chessboard />
            </div>
        </Provider>,
        document.getElementById("root")
    );
}

render();
