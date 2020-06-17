import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'



class Question1 extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            answered: false,
            correct: props.question.correct,
            disabled: false,
            

        }

        this.handleSubmit = this.handleSubmit.bind(this);

    };



    handleSubmit = event =>{
        event.preventDefault();
        let isCorr;
        if( document.getElementById("4").value === this.state.correct[0]){
            isCorr = true
        }
        else{
             isCorr = false
        }

        



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
    
   
    

    render(){
        if(this.state.disabled){
            return null;
        }else{
            return(
                <Container>
                    <Row className="justify-content-md-center">
                        <Card style={{textAlign: 'center',  width: '40rem', margin: '1rem'}}> 
                            <Card.Header className="question-q">
                                <h2>{this.props.question.q}</h2>
                            </Card.Header>
                            <Card.Body>
                            <form onSubmit={this.handleSubmit}>
                            <input  type="text" id="4"></input>
                                
                            
                            </form>
                            <div className="text-center"> 
                                <Button  type="submit"  onClick={this.handleSubmit} style={{margin: '10px'}} > Save </Button>
                            </div>
                            </Card.Body>
                            
                        </Card>
                    </Row>
                    <br/>
                </Container>
            )       
        }     
    }
}

export default Question1;
