import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";
import MainPage from '../MainPage/MainPage.js';
import NotFoundPage from '../Pages/404.js'
import Test from '../Test/Test'
import NewTest from '../NewTest/NewTest.js'

let question1 ={
  type: "check",
  q: 'Kot i Pies',
  answers: ['dog','cat', 'horse','frog'],
  correct: ['cat', 'dog'],
  number : 1,
  points: 1

}
let question2 ={
  type: "check",
  q: 'Pies',
  answers: ['dog','cat', 'horse','frog'],
  correct: ['dog'],
  number : 1,
  points: 1

}
let question3 ={
  type:"check",
  q: 'Kon',
  answers: ['dog','cat', 'horse','frog', 'stratata'],
  correct: ['horse'],
  number : 1,
  points: 1

}
let question4 ={
  type: "write",
  q: 'Zaba',
  correct: 'frog',
  number : 4,


}
let question5={
  type: "match",
  toMatch: ['dog','cat', 'horse','frog' ],
  answers: ['pies','kot', 'koń','żaba'],
  number: 5

}

let test1 =[
  question1,
  question2,
  question3,
  question4
]
let test2 =[
  /*question1,
  question2,
  question3,
  question4,*/
  question5
]

let tests = [
  test1,
  test2
]

let test = null;

class App extends React.Component {

  constructor(props){
    super(props);

    this.state ={
        tests: [],
        test_id: null
    }

    this.testFromCode= this.testFromCode.bind(this)
  };

  componentDidMount(){
    //this.getTests();
  }

  getTests =  _ =>{
    fetch(`http://localhost:4000/test/112`)
      .then(response => response.json())
      .then(response => {this.setState({
        tests: response.data
      })})
      .catch(err => console.error(err))
  }
  
  renderTest = ({test_id, test_name, test_code}) => <div key={test_id}>{test_id}, {test_name}, {test_code}</div>;

  async getAnswersC(qid, answers, correct){
    await fetch(`http://localhost:4000/answers/${qid}`)
    .then(response => response.json())
    .then(response => {
        let answers_db =  response.data
        
        //console.log(answers_db)
        answers_db.map((answer)=>{
          answers.push(answer['ANSWER'])
          if(answer['IS_CORRECT']==1){
            correct.push(answer['ANSWER'])
          }
        })
        //console.log(`odpowiedzi: ${answers}`)
      
  })
    .catch(err => console.error(err))

  }
  async getAnswersW(qid, correct){
    await fetch(`http://localhost:4000/answers/${qid}`)
    .then(response => response.json())
    .then(response => {
        let answers_db =  response.data
        
        //console.log(answers_db)
        answers_db.map((answer)=>{
          if(answer['IS_CORRECT']==1){
            correct.push(answer['ANSWER'])
          }
        })
        //console.log(`odpowiedzi: ${answers}`)
      
  })
    .catch(err => console.error(err))

  }
  async getAnswersM(qid, answers, correct){
    await fetch(`http://localhost:4000/answers/${qid}`)
    .then(response => response.json())
    .then(response => {
        let answers_db =  response.data
        
        //console.log(answers_db)
        answers_db.map((answer)=>{
          let tmpTab = answer['ANSWER'].split(";");
          answers.push(tmpTab[0]);
          correct.push(tmpTab[0]);
        })
        //console.log(`odpowiedzi: ${answers}`)
      
  })
    .catch(err => console.error(err))

  }

  async testFromCode(code){
    let test_id = null
    await fetch(`http://localhost:4000/testid/${code}`)
      .then(response => response.json())
      .then(response => {
          test_id =  response.data[0]['test_id']
          //console.log(`id testu o kodzie ${code} to ${test_id}`)

          
    })
      .catch(err => console.error(err));
      console.log(test_id);

    let questions_db = []
    await fetch(`http://localhost:4000/questions/${test_id}`)
      .then(response => response.json())
      .then(response => {
          questions_db =  response.data
    })
    .catch(err => console.error(err))

    //console.log(questions_db)
    let questions = []
    let qid = null;
    questions_db.map(async (question)=>{
      let tmpQuestion =null;
      if(question['QUESTION_TYPE'] == 'C'){            
        qid = question['QID']
        tmpQuestion ={
          type: question['QUESTION_TYPE'],
          q: question['QUESTION_NAME'],
          answers: [],
          correct: [],
          points: question['QUESTION_DIFF']
        };
        await this.getAnswersC(qid, tmpQuestion.answers, tmpQuestion.correct);
      }else if(question['QUESTION_TYPE'] == 'W'){
        qid = question['QID']
        tmpQuestion ={
          type: question['QUESTION_TYPE'],
          q: question['QUESTION_NAME'],
          correct: [],
          points: question['QUESTION_DIFF']
        };
        await this.getAnswersW(qid, tmpQuestion.correct);
      }
      else if(question['QUESTION_TYPE'] == 'M'){
        qid = question['QID']
        tmpQuestion ={
          type: question['QUESTION_TYPE'],
          q: question['QUESTION_NAME'],
          answers: [],
          correct: [],
          points: question['QUESTION_DIFF']
        };
        await this.getAnswersM(qid, tmpQuestion.answers, tmpQuestion.correct);

      }
      
        
        //console.log(tmpQuestion)
        if(tmpQuestion!=null){
          questions.push(tmpQuestion); 
        }
         
        
        
      })

      console.log(questions)
      test = questions;

      return true;

  }
 
  //testFromCode(code){
   // console.log(code);
    //test_id = select id from tests where code= code
    //questions= select * from questions where test_id = test_id 
    //questions.map=>{
    // 
    //}
      //test = tests[code]
    
 // }
  getTest(){
    return test;
  }

  render() {
    const  testsT  = this.state.tests;
    
    return(
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage testFromCode ={this.testFromCode}/>
        </Route>
        <Route path="/test">
          <Test getTest ={this.getTest}/>
        </Route>
        <Route path="/newTest">
          <NewTest />
        </Route>
        <Route path="/example" >
          <div>
            {testsT.map(this.renderTest)}
          </div>
        </Route>
        <Route path="/404" >
          <NotFoundPage />
        </Route>
        <Redirect to='/404'  />
        
      </Switch>
    </Router>
    )
  }
}

export default App;
