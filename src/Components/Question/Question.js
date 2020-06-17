import React from 'react';
import Answer from '../Answer/Answer';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'



class Question extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            answered: false,
            correct: props.question.correct,
            disabled: false,
            checkboxes: props.question.answers.reduce(
                (answers, answer) => ({
                  ...answers,
                  [answer]: false
                }),
                {}
              )
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    };

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;
        
        this.setState(prevState => ({
          checkboxes: {
            ...prevState.checkboxes,
            [name]: !prevState.checkboxes[name]
          }
        }));
        
      };

    handleSubmit = event =>{
        event.preventDefault();
        let checked =[];
        
        Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
            checked.push(checkbox)

      });

      let correct2 = this.props.question.correct;
      let isCorr1 = this.props.question.correct.every(function(item){

        if(!checked.includes(item)){
            return false;
        }else return true;

      });
      let isCorr2 = checked.every(function(item, index){

        if(!correct2.includes(item)){
            return false;
        }else return true;

      });
      let isCorr = isCorr1&&isCorr2;



        if(isCorr){
            this.props.addPoints(this.props.question.points)
            alert("Poprawna odpowiedź");
        }
        else{
            this.props.addPointsNotAchived(this.props.question.points)
            alert("Zła odpowiedź");
        }
        this.setState({disabled:true})
    };
    
    createCheckbox = answer => (
        <Answer
            label={answer}
            isSelected ={this.state.checkboxes[answer]}
            onCheckboxChange = {this.handleCheckboxChange}
            key ={answer}
        />
    );

    createCheckboxes = () => this.props.question.answers.map(this.createCheckbox);

    render(){
        if(this.state.disabled){
            return null;
        }else{
            return(
                <Container>
                    <Row className="justify-content-md-center">
                        <Card  style={{ width: '40rem', margin: '1rem' }}>
                            <Card.Header className="question-q">
                                <h2>{this.props.question.q}</h2>
                            </Card.Header>
                            
                            <ListGroup>
                                
                                {this.createCheckboxes()}
                                
                                <div className="text-center"> 
                                    <Button  type="submit"  onClick={this.handleSubmit} style={{margin: '10px'}} > Save </Button>
                                </div>


                            </ListGroup>
                            
                        </Card>
                    </Row>
                    <br/>
                </Container>
            )    
        }        
    }
}

export default Question;

/*
<div>
                    <ul>
                        <li><button onClick={handleClick}>{this.props.question.a1} </button></li>
                        <li><button onClick={handleClick}>{this.props.question.a2} </button></li>
                        <li><button onClick={handleClick}>{this.props.question.a3} </button></li>
                        <li><button onClick={handleClick}>{this.props.question.a4} </button></li>
                    </ul>
                </div>    
                
*/