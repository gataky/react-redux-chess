import React       from 'react';
import { connect } from 'react-redux';
import Square      from './Square.js';
import Piece       from './Piece.js';

const Board = React.createClass({

    renderSquares: function() {
        let squares = [];
        let piece, number, letter, board, coordinate, index;

        board = this.props.engine.board();

        let o = this.props.orientation;
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
                    {piece ? this.renderPiece(coordinate, piece) : null}
                </Square>
            </div>
        )
    },

    renderPiece: function(coordinate, piece) {
        let moves = this.props.engine.moves({square: coordinate});
        return <Piece type={piece} coordinate={coordinate} moves={moves}/>;
    },

    render: function() {
        let squares = this.renderSquares(this.renderSquares());
        return (
            <div className="chessboard-board-layout" >
                {squares}
            </div>
        );
    }
})

function mapStateToProps(state) {
    return {
        coordinates: state.Chessboard.get('coordinates'),
        orientation: state.Chessboard.get('orientation'),
        promotion  : state.Chessboard.get('promotion'),
        fen        : state.Chessboard.get('fen'),
        engine     : state.Chessboard.get('engine').toJS(),
    };
}

export default connect(mapStateToProps)(Board);

