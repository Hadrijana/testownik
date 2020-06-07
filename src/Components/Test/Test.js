import React from 'react';
import {
    BrowserRouter as Router,
    Redirect
  } from "react-router-dom";
import Question from '../Question/Question';
import Question1 from '../Question1/Question1';
import QuestionDnD from '../QuestionDnD/QuestionDnD';


class Test extends React.Component{
    test=null;
    
    render(){
        this.test =  this.props.getTest();
        if(this.test!=null){
            return (
                <div className="Test">
                {
                    this.test.map( question=>{
                        if(question.type === 'check'){
                             return <Question question={question} />
                        }
                        else if(question.type === 'write'){
                             return <Question1 question={question} />
                             
                        }
                        else{
                            return <QuestionDnD question={question} />
                        }
                    })
                }            
                </div>
            )
        }else{
            return <Redirect push to={`./`} />;
        }

    }

}

export default Test;