import React from 'react';
import './TestsList.css';
import TestCard from '../TestCard/TestCard';
import { render } from '@testing-library/react';

class TestsList extends React.Component{
    render(){
        return(
            <div className="TestsList">
            {
               this.props.testCards.map( testCard => {
                   return <TestCard testCard={testCard} testFromCode = {this.props.testFromCode}/>
               })
            }   
            </div>
        )
    };

}

export default TestsList;