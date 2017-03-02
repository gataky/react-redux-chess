import React        from 'react';
import ReactDOM     from 'react-dom';
import { 
    connect, 
    Provider 
}                   from 'react-redux';

import store        from './store.js'
import Chessboard   from './Chessboard/Chessboard.js';
import * as actions from './Chessboard/actions.js';

import './index.css';

const Controls = connect(mapStateToProps, actions)(React.createClass({

    flip: function() {
        this.props.Orientation(!this.props.orientation);
    },

    coordinates: function() {
        this.props.Coordinates(!this.props.coordinates);
    },

	setFEN: function() {
        this.props.SetFEN("1r1r2k1/1p1R1pp1/p1nQ3p/P5q1/1P2B3/2P2PP1/7P/4R1K1 w - - 0 1");
    },

    render: function() {
        return (
            <div>
                 <button onClick={this.flip}>Flip</button>
                 <button onClick={this.coordinates}>Coordinates</button>
                 <button onClick={this.setFEN}>Set FEN</button>
            </div>
        ) 
    }
}));

function mapStateToProps(state) {
    return {
        orientation: state.Chessboard.get('orientation'),
        coordinates: state.Chessboard.get('coordinates'),
    }
}

ReactDOM.render(
    <Provider store={store}>
        <div className="display">
             <Controls />
             <Chessboard />
        </div>
    </Provider>,
    document.getElementById("root")
);
