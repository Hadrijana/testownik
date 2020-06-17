import React from 'react';
import {
    BrowserRouter as Router,
    Redirect
  } from "react-router-dom";
import Question from '../Question/Question';
import Question1 from '../Question1/Question1';
import QuestionDnD from '../QuestionDnD/QuestionDnD';
import Button from 'react-bootstrap/Button'



class Test extends React.Component{
    constructor(props){
        super(props);
        this.state ={points: 0, pointsAll:0, exit: false};
        this.addPoints= this.addPoints.bind(this)
        this.handleClick = this.handleClick.bind(this)
      };

    test=null;
    
    addPoints = async ( x ) => {
        await this.setState(prevState => ({points: prevState.points + parseInt(x) }));
        await this.setState(prevState => ({pointsAll: prevState.pointsAll + parseInt(x) }));
        console.log(this.state.points)

    }
    addPointsNotAchived = async ( x ) => {
        await this.setState(prevState => ({pointsAll: prevState.pointsAll + parseInt(x) }));
    }

    handleClick = ( event) =>{
        event.preventDefault();

        alert(`Zdobyto ${this.state.points} punktow z mozliwych ${this.state.pointsAll}`)
        this.setState({exit: true})

    }

    render(){
        this.test =  this.props.getTest();
        if(this.test!=null && this.state.exit==false){
            return (
                <div className="Test" style={{textAlign: "center"}}>
                {
                    this.test.map( question=>{
                        if(question.type === 'C'){
                             return <Question question={question} addPoints={this.addPoints} addPointsNotAchived={this.addPointsNotAchived}/>
                        }else if(question.type === 'W'){
                            return <Question1 question={question} addPoints={this.addPoints} addPointsNotAchived={this.addPointsNotAchived} />
                            
                       }else if(question.type === 'M'){
                           return <QuestionDnD question={question} addPoints={this.addPoints} addPointsNotAchived={this.addPointsNotAchived} />
                       }

                    })
                }     
                <Button onClick={this.handleClick}> End Test </Button>       
                </div>
                
            )
        }else if (this.state.exit==true){
            return <Redirect push to={`./`} />;
        }else{
            return <Redirect push to={`./`} />;
        }

    }

}

export default Test;