import React from 'react';
import ToMatch from '../ToMatch/ToMatch.js';
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
            answered: false,
            correct: props.question.correct,
            toMatch: props.question.toMatch.reduce(
                (toMatchs, toMatch) => ({
                  ...toMatchs,
                  [toMatch]: false
                }),
                {}
            ),

            matchIt: props.question.answers.reduce(
                (answers, answer) => ({
                  ...answers,
                  [answer]: false
                }),
                {}
              )


        }

        this.handleSubmit = this.handleSubmit.bind(this);

    };

    
    
    handleDrag = changeEvent => {
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
        if( document.getElementById("4").value === this.state.correct){
            isCorr = true
        }
        else{
             isCorr = false
        }

        if(isCorr){
            alert("Poprawna odpowiedź");
        }
        else{
            alert("Zła odpowiedź");
            console.log(this.state.toMatch)
        }
    };
    
    createQuestion = answer => (
        <ToMatch
            label={answer}
    
        />
    );
    
    createAnswer = answer => (

            <AnswerDnD
                label={answer}
            />

    );
    
    createQuestions = () => this.props.question.toMatch.map(this.createQuestion);
    createAnswers = () => this.props.question.answers.map(this.createAnswer);


    render(){
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

export default QuestionDnD;
