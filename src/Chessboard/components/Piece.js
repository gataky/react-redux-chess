import React             from 'react';
import { DragSource }    from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { connect }       from 'react-redux';
import { itemTypes }     from '../constants.js';
import * as actions      from '../actions';

const Piece = React.createClass({

    componentDidMount: function () {
        this.props.connectDragPreview(getEmptyImage());
    },

    render: function () {
        this.img = `pieces/regular/${this.props.type}.svg`;
        let s = {opacity: this.props.isDragging ? 0.1 : 1 };
        return this.props.connectDragSource(
           <img 
               id={'chessboard-piece-' + this.props.coordinate} 
               className='chessboard-piece-layout' 
               style={s} 
               alt='piece' 
               src={this.img} 
            />
        )
    }
});

const pieceSource = {
    canDrag(props) {
        return props.draggable;
    },
    beginDrag(props, source, connect) {
        return {
            coordinate: props.coordinate,
            type      : props.type,
            moves     : validMoves(props),
        };
    },
}

function validMoves (props) {
    let squares = props.engine.moves({
        square : props.coordinate,
        verbose: true,
    });
    squares = squares.map(square => { return square.to });
    return squares;
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

function mapStateToProps(state) {
    return {
        draggable: state.Chessboard.get('draggable'),
        animation: state.Chessboard.get('animation'),
        engine   : state.Chessboard.get('engine').toJS(),
    }
}

export default connect(mapStateToProps, actions)(
        DragSource(itemTypes.PIECE, pieceSource, collect)(Piece)
);
