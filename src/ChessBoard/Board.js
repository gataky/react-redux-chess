import React                   from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import AnimateOnChange         from 'react-animate-on-change';
//import { DragDropContext }     from 'react-dnd';
//import HTML5Backend            from 'react-dnd-html5-backend';
import { connect }             from 'react-redux';

import Square          from './components/Square.js';
import Piece           from './components/Piece.js';
//import CustomDragLayer from './components/CustomDragLayer.js';
//import Promotion       from './components/Promotion.js';
import engine          from './utils/engine.js';

import './ChessBoard.css';

const Board = React.createClass({

    getInitialState: function() {
        let success = engine.load(this.props.fen);
        if (success) {
            console.info("FEN load success", this.props.fen);
        } else {
            console.error("FEN load failed", this.props.fen);
        }
        return {};
    },

    renderSquares: function() {
        let squares = [];
        let piece, 
            number, 
            letter, 
            board, 
            coordinate, 
            index;

        engine.load(this.props.fen);
        board = engine.board();

        let o = this.props.orientation === 'white';
        for (
                let row = o ? 0 : 7; 
                o ? row < 8 : row >= 0; 
                o ? row++ : row--
            ) {

            for (
                    let col = o ? 0 : 7; 
                    o ? col < 8 : col >= 0;
                    o ? col++ : col--
                ) {

                index      = (8 * col) + row;
                letter     = 'abcdefgh'[col % 8];
                number     = 8 - row;
                coordinate = letter + number;
                piece      = board[row][col];
                if (piece) {
                    piece = board[row][col].color + board[row][col].type;
                }
                squares.push(this.renderSquare(index, coordinate, piece));
            }
        }
        return squares;
    },

    renderSquare: function(index, coordinate, piece) {
        return (
            <div style={{ height: '12.5%', width : '12.5%' }} key={index}>
                <Square index={index} coordinate={coordinate} >
                    {this.renderPiece(coordinate, piece)}
                </Square>
            </div>
        )
    },

    renderPiece: function(coordinate, piece) {
        if (piece) {
            return <Piece type={piece} coordinate={coordinate} moves={this.moves} draggable={true}/>;
        }
    },

    moves: function(coordinate) {
        let squares = engine.moves({
            square : coordinate,
            verbose: true,
        });
        squares = squares.map(square => { return square.to });
        return squares;
    },

    render: function() {
        let squares = this.renderSquares(this.renderSquares());

        let style = {
            width   : '500px',
            height  : '500px',
            position: 'relative',
        }

        //<AnimateOnChange
            //baseClassName="board"
            //animationClassName="board-fade"
            //animate={this.props.promotion ? true : false}>
                //<div className="chessboard-board-layout">
                    //{squares}
                    //<CustomDragLayer/>
                //</div>
        //</AnimateOnChange>
        return (
            <div className="chessboard-board-layout" style={style}>
                {squares}
            </div>
        );
    }
})

function mapStateToProps(state) {
    return {
        coordinates: state.ChessBoard.get('coordinates'),
        orientation: state.ChessBoard.get('orientation'),
        promotion  : state.ChessBoard.get('promotion'),
        fen        : state.ChessBoard.get('fen'),
    };
}

export default connect(mapStateToProps)(Board)

