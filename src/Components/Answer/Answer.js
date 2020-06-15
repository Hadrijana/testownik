import React from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import './Answer.css'

const Answer =({label, isSelected, onCheckboxChange})=> (
  <ListGroupItem style={{padding:"0"}}>
    <ButtonGroup toggle className="mb-2" style={{width: "100%"}}>

      <ToggleButton
  
        type="checkbox"
        name={label}
        aria-pressed="false"
        checked={isSelected}
        onChange={onCheckboxChange}
        value="1"
        variant="secondary"
        data-toggle="button"
        className="Btn-Blue"
        
      >
      {label}
      </ToggleButton>
    </ButtonGroup>

  </ListGroupItem>
);

export default Answer;

