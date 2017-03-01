import React                   from 'react';
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AnimateOnChange         from 'react-animate-on-change';
import { DragDropContext }     from 'react-dnd';
import HTML5Backend            from 'react-dnd-html5-backend';
import { connect }             from 'react-redux';

import Board           from './Board.js';
import CustomDragLayer from './components/CustomDragLayer.js';
import Promotion       from './components/Promotion.js';

import './ChessBoard.css';

const Chessboard = React.createClass({
    getInitialState: function() {
        this.pp = false;
        return null;
    },

    componentWillUpdate: function() {
        this.pp = this.p;
    },

    render: function() {

        let style = {
            width   : '500px',
            height  : '500px',
            position: 'relative',
        }

        this.p = !!this.props.promotion;
        let direction = 'out';
        if (this.p === false && this.pp === true) {
            direction = 'in';
        } 
        
        return (
            <div className="chessboard" style={style}>

                <AnimateOnChange
                    baseClassName="chessboard-board-layout"
                    animationClassName={`chessboard-board-layout-fade-${direction}`}
                    animate={!!this.props.promotion || this.pp}>
                        <Board/>
                </AnimateOnChange>

                <CustomDragLayer/>

                {this.props.promotion ? (
                    <div className="chessboard-promotion-layout">
                        <Promotion/>
                    </div>
                ) : null}

            </div>
        );
    }
})

function mapStateToProps(state) {
    return {
        promotion  : state.ChessBoard.get('promotion'),
    };
}

export default connect(mapStateToProps)(
        DragDropContext(HTML5Backend)(Chessboard)
);

