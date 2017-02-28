import React         from 'react';
import { DragLayer } from 'react-dnd';
import { ItemTypes } from '../utils/Constants.js';


function getItemStyles(props) {
  const { initialOffset, currentOffset, clientOffset } = props;
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }

  console.log('initialOffset', props.initialOffset);
  console.log('currentOffset', props.currentOffset);
  console.log('clientOffset ', props.clientOffset);

  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const CustomDragLayer = React.createClass({

    renderItem: function(type, item) {
        switch (type) {
            case ItemTypes.PIECE:
                let img = `pieces/chesspieces/modern/${item.type}.png`;
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
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        currentOffset: monitor.getSourceClientOffset(),
        clientOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging(),
    }
}
export default DragLayer(collect)(CustomDragLayer);
