import React from 'react';
import  ToMatch from '../ToMatch/ToMatch.js';
import AnswerDnD from '../AnswerDnD/AnswerDnD.js';
import { DndContext, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import './QuestionDnD.css'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import ListGroupItem from 'react-bootstrap/ListGroupItem';



class QuestionDnD extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            disabled:false,
            answered: false,
            toMatch: props.question.answers.reduce(
                (toMatchs, toMatch) => ({
                  ...toMatchs,
                  [toMatch]: false
                }),
                {}
            ),

            matchIt: props.question.correct.reduce(
                (answers, answer) => ({
                  ...answers,
                  [answer]: false
                }),
                {}
              )


        }

        this.handleSubmit = this.handleSubmit.bind(this);

    };

    
    
    handleDrop = changeEvent => {
        const { name } = changeEvent.target;
        
        this.setState(prevState => ({
          toMatch: {
            ...prevState.toMatch,
            [name]: true
          }
        }));
        
      };

    handleSubmit = event =>{
        event.preventDefault();
        let isCorr;
       /* if( document.getElementById("4").value === this.state.correct){
            isCorr = true
        }
        else{
             isCorr = false
        }*/
        isCorr = true;
        if(isCorr){
            this.props.addPoints(this.props.question.points)
            alert("Poprawna odpowiedź");

        }
        else{
            alert("Zła odpowiedź");
            console.log(this.state.toMatch)
        }
        this.setState({disabled:true});
    };
    
    createQuestion = answer => (

        <ToMatch
            label={answer}
            handleDrop={this.handleDrop}
        />
    );
    
    createAnswer = answer => (

            <AnswerDnD
                label={answer}
            />

    );
    
    createQuestions = () => this.props.question.answers.map(this.createQuestion);
    createAnswers = () => this.props.question.correct.map(this.createAnswer);


    render(){
        if(this.state.disabled){
            return null;
        }else{
            return(
                <Container>
                    <Row className="justify-content-md-center">
                    <Card style={{ width: '40rem', margin: '1rem' }}>
                        <Card.Header>
                            <h2>{this.props.question.q}</h2>
                        </Card.Header>
    
                        <DndProvider backend={HTML5Backend} >
                            <ListGroup className="text-center">
    
                                <ListGroupItem>
                                     {this.createAnswers()}
                                </ListGroupItem>
                                <ListGroupItem>
                                     {this.createQuestions()}
                                </ListGroupItem>                                
                                <div className="text-center"> 
                                    <Button  type="submit"  onClick={this.handleSubmit} style={{margin: '10px'}} > Save </Button>
                                </div> 
                            </ListGroup>
                        </DndProvider>
                        
                       
    
                      
                    </Card>
                    </Row>
                </Container>
            )  
        }
                 
    }
}

export default QuestionDnD;
