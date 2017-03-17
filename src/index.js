import React        from 'react';
import ReactDOM     from 'react-dom';
import { 
    connect, 
    Provider 
}                   from 'react-redux';

import Chess      from 'chess.js';

import store        from './store.js'
import Chessboard   from './Chessboard/Chessboard.js';
import * as actions from './Chessboard/actions.js';

import './index.css';

let chess = new Chess();

const Controls = connect(mapStateToProps, actions)(React.createClass({

    getInitialState: function() {
        this.index = 0;
        return {};
    },

    flip: function() {
        this.props.Orientation(!this.props.orientation);
    },

    coordinates: function() {
        this.props.Coordinates(!this.props.coordinates);
    },

	setFEN: function() {
        let fen = this.fenInput.value;
        if (!fen) {
            return;
        }
        this.props.SetFEN(fen);
    },


    batchMove: function() {
        let moves = '1.d4 d5 2.c4 dxc4 3.Nf3 Nf6 4.e3 Be6 5.Na3 Bf5 6.Nxc4 Nc6 7.Be2 e6 8.a3 Be7 9.O-O O-O 10.b4 a6 11.Nh4 Bg4 12.Bxg4 Nxg4 13.Qxg4 Bxh4 14.g3 Qd5 15.Na5 Nxa5 16.bxa5 Bf6 17.Rb1 Rfb8 18.Rd1 h6 19.e4 Qxe4 20.Qxe4 b5 21.axb6 cxb6 22.Rxb6 Rd8 23.d5 exd5 24.Rxd5 Rxd5 25.Qxd5 Rc8 26.Bd2 Rd8 27.Qa5 Re8 28.Qxa6 Rd8 29.Bxh6 Be5 30.Qe2 Bd4 31.Qg4 Ba1 32.Rb5  1-0';
        let list = moves.replace(/\d+\.([A-Za-z0-9-=]+)\s([A-Za-z0-9-=]+)\s/g, '$1,$2,').split(',');

        this.interval = setInterval(this.animate(list), 1000)
    },

    move: function() {
        let moves = '1.d4 d5 2.c4 dxc4 3.Nf3 Nf6 4.e3 Be6 5.Na3 Bf5 6.Nxc4 Nc6 7.Be2 e6 8.a3 Be7 9.O-O O-O 10.b4 a6 11.Nh4 Bg4 12.Bxg4 Nxg4 13.Qxg4 Bxh4 14.g3 Qd5 15.Na5 Nxa5 16.bxa5 Bf6 17.Rb1 Rfb8 18.Rd1 h6 19.e4 Qxe4 20.Qxe4 b5 21.axb6 cxb6 22.Rxb6 Rd8 23.d5 exd5 24.Rxd5 Rxd5 25.Qxd5 Rc8 26.Bd2 Rd8 27.Qa5 Re8 28.Qxa6 Rd8 29.Bxh6 Be5 30.Qe2 Bd4 31.Qg4 Ba1 32.Rb5  1-0';
        let list = moves.replace(/\d+\.([A-Za-z0-9-=]+)\s([A-Za-z0-9-=]+)\s/g, '$1,$2,').split(',');

        let result = chess.move(list[this.index])

        this.props.Move(result);
        this.index += 1
    },

    render: function() {
        return (
            <div>
                 <button onClick={this.flip}>Flip</button>
                 <button onClick={this.coordinates}>Coordinates</button>
                 <input ref={ref => {this.fenInput = ref}} type='text' id='fen-input' placeholder='Enter Fen'/>
                 <button onClick={this.setFEN}>Set FEN</button>
                 <button onClick={this.move}>Move</button>
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
