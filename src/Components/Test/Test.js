import React from 'react';
import Question from '../Question/Question';

class Test extends React.Component{
    render(){
        return (
            <div className="Test">
            {
                this.props.test.map( question=>{
                    return <Question question={question} />
                })
            }            
            </div>
        )
    }

}

export default Test;