import React from 'react';
import Answer from '../Answer/Answer'


class Question extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            answered: false,
            correct: props.question.correct,
            
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
            alert("Poprawna odpowiedź");
        }
        else{
            alert("Zła odpowiedź");
        }
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
        return(
            <div>
                <div className="question-q">
                    <h2>{this.props.question.q}</h2>
                </div>

                <form onSubmit={this.handleSubmit}>
                    {this.createCheckboxes()}
                    
                    <button type="submit" > Save </button>
                </form>
                
                
            </div>
        )            
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