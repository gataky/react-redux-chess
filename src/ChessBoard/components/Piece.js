import React             from 'react';
import { DragSource }    from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { connect }       from 'react-redux';
import { ItemTypes }     from '../utils/Constants.js';

const Piece = React.createClass({

    componentDidMount: function () {
        this.props.connectDragPreview(getEmptyImage());
    },

    render: function () {
        this.img = `pieces/chesspieces/modern/${this.props.type}.png`;
        let s = {opacity: this.props.isDragging ? 0.1 : 1};
        return this.props.connectDragSource(
           <img className='chessboard-piece-layout' style={s} alt='piece' src={this.img} />
        )
    }
});

const pieceSource = {
    canDrag(props) {
        return props.draggable;
    },
    beginDrag(props) {
        return {
            coordinate: props.coordinate,
            type      : props.type,
            moves     : props.moves(props.coordinate),
        };
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

function mapStateToProps(state) {
    return {
        draggable: state.ChessBoard.get('draggable'),
    }
}

export default DragSource(ItemTypes.PIECE, pieceSource, collect)(
    connect(mapStateToProps)(Piece)
);
