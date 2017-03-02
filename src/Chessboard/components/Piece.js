import React             from 'react';
import { DragSource }    from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { connect }       from 'react-redux';
import { itemTypes }     from '../constants.js';

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
    beginDrag(props, source, connect) {
        console.log('pieceSource', props);
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
        engine   : state.Chessboard.get('engine').toJS(),
    }
}

export default connect(mapStateToProps)(
        DragSource(itemTypes.PIECE, pieceSource, collect)(Piece)
);
