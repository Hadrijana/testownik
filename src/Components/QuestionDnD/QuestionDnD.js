import React from 'react';
import ToMatch from '../ToMatch/ToMatch.js';
import AnswerDnD from '../AnswerDnD/AnswerDnD.js';
import { DndContext, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import './QuestionDnD.css'



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
            <div className="questionDnd">
                <DndProvider backend={HTML5Backend} >
                    <form onSubmit={this.handleSubmit}>
                        {this.createAnswers()}

                        {this.createQuestions()}
                        
                        <button type="submit" > Save </button>
                    </form>
                </DndProvider>
            </div>
        )            
    }
}

export default QuestionDnD;
