import React from 'react';
import { useDrag, DragSource } from 'react-dnd'
//import { ItemTypes } from './ItemTypes'
import './AnswerDnD.css'
import ListGroupItem from 'react-bootstrap/ListGroupItem';

 const ItemTypes = {
    ANSWER: 'answer',
  }


const AnswerDnD = props => {

    const [{ isDragging }, drag, ] = useDrag({
        item: { type: ItemTypes.ANSWER, name: props.label},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      })
      return(

        <div
          className="draggable"
          ref={drag}
          style={{
            opacity: isDragging ? 0.9 : 1,
          }}
        >
          {props.label}
        </div>

      )
};
export default AnswerDnD