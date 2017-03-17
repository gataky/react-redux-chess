import React       from 'react';
import { connect } from 'react-redux';
import Square      from './Square.js';
import Piece       from './Piece.js';
import { Promote } from '../actions.js';

const Promotion = React.createClass({

    renderSquares: function() {
        if (!!!this.props.promotion) {
            return null;
        }
        let color = this.props.promotion.color;

        let squares = [];
        for (let i = 0; i < 5; i++) {
            if (i === 2) continue;
            squares.push(this.renderSquare(i, color + 'qr bn'[i]));
        }
        return squares;
    },

    renderSquare: function(index, piece) {
        return (
            <div style={{ height: '50%', width: '50%' }} key={index}>
                <Square index={index} coordinate={'xx'} draggable={false}>
                    {this.renderPiece(piece)}
                </Square>
            </div>
        )
    },

    renderPiece: function(piece) {
        return (
            <div onClick={() => {this.props.Promote(this.props.promotion, piece)}}>
                <Piece type={piece} moves={this.moves}/>
            </div>
        )
    },

    render: function() {
        let size = (this.props.size * .125 * 2) + 'px';
        let style = {
            display     : 'flex',
            flexWrap    : 'wrap',
            position    : 'relative',
            margin      : '0 auto',
            height      : size,
            width       : size,
            border      : '8px solid black',
            borderRadius: '5px',
        }
        return (
                <div className="chessboard-promotion-layout">
                    <div style={style}>
                        {this.renderSquares()}
                    </div>
                </div>
        )
    }
})

function mapStateToProps(state) {
    return {
        promotion: state.Chessboard.get('promotion'),
        size     : state.Chessboard.get('size'),
    }
}

export default connect(mapStateToProps, {Promote})(Promotion);
