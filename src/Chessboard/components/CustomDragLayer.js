import React         from 'react';
import { DragLayer } from 'react-dnd';
import { connect }   from 'react-redux';
import { itemTypes } from '../constants.js';


function getItemStyles(props) {
    const { initialOffset, currentOffset } = props;
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    }
    let { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px)`;
    let d = props.size * .15
    return {
        position: 'absolute',
        zIndex: 2,
        transform,
        WebkitTransform: transform,
        height: d + 'px',
        width:  d + 'px',
    };
}

const CustomDragLayer = React.createClass({

    renderItem: function(type, item) {
        switch (type) {
            case itemTypes.PIECE:
                let img = `pieces/regular/${item.type}.svg`;
                return (<img style={getItemStyles(this.props)} alt={item.type} src={img}/>);
            default:
                return null;
        }
    },

    render: function() {
        if (!this.props.isDragging) {
            return null;
        } 

        return (
            <div className='chessboard-drag-layout'>
                {this.renderItem(this.props.itemType, this.props.item)}
            </div>
        );
    }
})

function collect(monitor) {
    return {
        item         : monitor.getItem(),
        itemType     : monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        isDragging   : monitor.isDragging(),
    }
}

function mapStateToProps(state) {
    return {
        size: state.Chessboard.get("size"),
    }
}

export default connect(mapStateToProps)(DragLayer(collect)(CustomDragLayer));
