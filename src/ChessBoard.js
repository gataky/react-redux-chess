import React                   from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AnimateOnChange         from 'react-animate-on-change';
import { DragDropContext }     from 'react-dnd';
import HTML5Backend            from 'react-dnd-html5-backend';
import { connect }             from 'react-redux';

import CustomDragLayer from './components/CustomDragLayer.js';
import Promotion       from './components/Promotion.js';
import Board           from './components/Board.js';
import engine          from './utils/engine.js';

import './ChessBoard.css';

const ChessBoard = React.createClass({

    render: function() {
        let squares = this.renderSquares(this.renderSquares());

        let style = {
            width   : '500px',
            height  : '500px',
            position: 'relative',
        }

        return (
            <div className="chessboard-layout" style={style}>

                <AnimateOnChange
                    baseClassName="board"
                    animationClassName="board-fade"
                    animate={this.props.promotion ? true : false}>
                        <Board />
                </AnimateOnChange>

                <CustomDragLayer/>

                <ReactCSSTransitionGroup 
                     transitionName="promotion"
                     transitionEnterTimeout={1}
                     transitionLeaveTimeout={1}>
                        {this.props.promotion ? (
                            <div className="chessboard-promotion-layout">
                                <Promotion/>
                            </div>
                        ) : null}
                </ReactCSSTransitionGroup>

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

export default connect(mapStateToProps)(
        DragDropContext(HTML5Backend)(Board)
);

