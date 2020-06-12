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
import NewTest from '../NewTest/NewTest'

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

    this.testFromCode= this.testFromCode.bind(this)
  };


  testFromCode(code){
    console.log(code);
      test = tests[code]

  }
  getTest(){
    return test;
  }

  render() {
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
