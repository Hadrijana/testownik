import React from 'react';



class Question1 extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            answered: false,
            correct: props.question.correct,
            

        }

        this.handleSubmit = this.handleSubmit.bind(this);

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
        }
    };
    
   
    

    render(){
        return(
            <div>
                <div className="question-q">
                    <h2>{this.props.question.q}</h2>
                </div>

                <form onSubmit={this.handleSubmit}>
                   <input  type="text" id="4"></input>
                    
                    <button type="submit" > Save </button>
                </form>
                
                
            </div>
        )            
    }
}

export default Question1;
