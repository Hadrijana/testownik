import React, {useState} from 'react';
import { DragPreviewImage, useDrop } from 'react-dnd'
//import { ItemTypes } from './ItemTypes'
import './ToMatch.css'
import ListGroupItem from 'react-bootstrap/ListGroupItem';


const ItemTypes = {
  ANSWER: 'answer',
}

const ToMatch = ({onDrop, label}) => {
    const [value, setValue] = useState();
    const [{isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.ANSWER,
        drop: (item, monitor)=> { setValue(item.name)},
        collect: monitor =>({
          isOver: !!monitor.isOver()
        })
    })



      return (

            <div  className="tomatch">
              <p>{label}</p>
              <div 
              ref={drop} 
              className="drop"
              style={{
                backgroundColor: isOver ? 'blue' : 'yellow'
              }}
              >
               {value}
              </div>
            </div>

   
    )
  };

  export default ToMatch;

