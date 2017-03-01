import React          from 'react';
import { DropTarget } from 'react-dnd';
import { connect }    from 'react-redux';

import { Move } from '../actions.js';

import { 
    ItemTypes,
    SquaresWithCoordinates,
} from '../utils/Constants.js';

import {
    Colors
} from '../utils/Defaults.js';


const Square = React.createClass({
    renderOverlay: function(shade) {
        let s = {background: Colors.Highlight[shade]};
        return <div className={"chessboard-target-overlay"} style={s}></div>;
    },

    renderCoordinate: function(isBlackSquare) {
        if (!this.props.coordinates) {
            return null;
        }

        let letter = this.props.coordinate[0];
        let number = this.props.coordinate[1];

        switch(SquaresWithCoordinates[this.props.orientation][this.props.coordinate]) {
            case 'n':
                letter = '';
                break;
            case 'l':
                number = '';
                break;
            case 'b': 
                break;
            default: 
                return;
        }

        let s = {color: isBlackSquare ? Colors.Primary.light : Colors.Primary.dark};
        return (
            <div>
                <div className="chessboard-coordinate-ul" style={s}>{number}</div>
                <div className="chessboard-coordinate-br" style={s}>{letter}</div>
            </div>
        )
    },

    render: function() {
        let index = this.props.index;
        let x = index % 8;
        let y = Math.floor(index / 8);
        let black = ( x + y ) % 2 === 1;

        let s = {background: black ? Colors.Primary.dark  : Colors.Primary.light};

        if (this.props.draggable || true) {

            return this.props.connectDropTarget(
                <div className="chessboard-square-layout" style={s}>
                    {this.props.children}
                    {this.props.canDrop && this.renderOverlay(black ? 'dark' : 'light')}
                    {this.props.coordinates ? this.renderCoordinate(black) : null}
                </div>
            );
        } else {
            return (
                <div className="chessboard-square-layout" style={s}>
                    {this.props.children}
                </div>
            );
        }
    }
})

const squareTarget = {
    canDrop(props, monitor) {
        let item = monitor.getItem();
        return item.moves.includes(props.coordinate);
    },

    drop(props, monitor) {
        let piece = monitor.getItem();
        props.Move({piece, to: props.coordinate});
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    };
}

function mapStateToProps(state) {
    return {
        coordinates: state.ChessBoard.get("coordinates"),
        orientation: state.ChessBoard.get("orientation"),
        promotion  : state.ChessBoard.get('promotion'),
    }
}

export default connect(mapStateToProps, {Move})(
    DropTarget(ItemTypes.PIECE, squareTarget, collect)(Square
));
