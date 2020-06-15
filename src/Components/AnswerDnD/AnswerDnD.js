import React from 'react';
import { useDrag } from 'react-dnd'
//import { ItemTypes } from './ItemTypes'
import './AnswerDnD.css'
import ListGroupItem from 'react-bootstrap/ListGroupItem';

 const ItemTypes = {
    ANSWER: 'answer',
  }


const AnswerDnD = ({label}) => {
    const [{ isDragging }, drag, ] = useDrag({
        item: { type: ItemTypes.ANSWER },
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
          {label}
        </div>

      )
};
export default AnswerDnD