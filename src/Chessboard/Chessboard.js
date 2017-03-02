import React                   from 'react';
import AnimateOnChange         from 'react-animate-on-change';
import { DragDropContext }     from 'react-dnd';
import HTML5Backend            from 'react-dnd-html5-backend';
import TouchBackend            from 'react-dnd-touch-backend';
import { connect }             from 'react-redux';

import Board           from './components/Board.js';
import CustomDragLayer from './components/CustomDragLayer.js';
import Promotion       from './components/Promotion.js';

import './stylesheet.css';

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
            width   : `${this.props.size}px`,
            height  : `${this.props.size}px`,
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
                    animate={!!this.props.promotion || this.pp}
                    forwards={true}>
                        <Board/>
                </AnimateOnChange>
                
                <CustomDragLayer/>
                
                {this.props.promotion ? <Promotion/> : null }
            </div>
        );
    }
})

function mapStateToProps(state) {
    return {
        promotion  : state.Chessboard.get('promotion'),
        size       : state.Chessboard.get('size'),
    };
}

function is_touch_device() {
  return !!('ontouchstart' in window || navigator.maxTouchPoints);
};

let backend = is_touch_device() ? TouchBackend : HTML5Backend;

export default connect(mapStateToProps)(
        DragDropContext(backend)(Chessboard)
);

