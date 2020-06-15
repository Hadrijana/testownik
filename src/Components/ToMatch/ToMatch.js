import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd'
//import { ItemTypes } from './ItemTypes'
import './ToMatch.css'
import ListGroupItem from 'react-bootstrap/ListGroupItem';


const ToMatch = ({label}) => {
   
      return (

            <div className="tomatch">
              <p>{label}</p>
              <div className="drop"></div>
            </div>

   
    )
  };
export default ToMatch