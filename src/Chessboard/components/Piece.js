import React             from 'react';
import { DragSource }    from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { connect }       from 'react-redux';
import { itemTypes }     from '../constants.js';
import * as actions      from '../actions';

const Piece = React.createClass({

    animate: function() {
        var style = document.createElement('style');
        style.type = 'text/css';
        if (this.props.coordinate !== this.props.animation.from){
            return false;
        }
        let x = this.props.animation.x;
        let y = this.props.animation.y;
        var keyFrames = `
            @-webkit-keyframes chessboard-animate-move {
                100% {
                    -webkit-transform: translate(${x}px, ${y}px);
                }
            }
            @-moz-keyframes chessboard-animate-move {
                100% {
                    -webkit-transform: translate(${x}px, ${y}px);
                }
            }`;
        style.innerHTML = keyFrames;
        let test = document.getElementById('chessboard');
        console.log(test, style);
        test.appendChild(style);
        this.interval = setInterval((that) => {
            that.props._move_animation_stop(that.props.animation.move);
            clearInterval(that.interval);
        }, 333, this)
        return true;
    },

    componentDidMount: function () {
        this.props.connectDragPreview(getEmptyImage());
    },

    render: function () {
        this.img = `pieces/chesspieces/modern/${this.props.type}.png`;
        let s = {opacity: this.props.isDragging ? 0.1 : 1 };
        let animate= this.props.animation ? this.animate() : null;
        return this.props.connectDragSource(
           <img 
               id={'chessboard-piece-' + this.props.coordinate} 
               className={'chessboard-piece-layout' + (animate ? ' test' : '')}
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
