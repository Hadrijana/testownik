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
import NewTest from '../NewTest/script'

let question1 ={
  q: 'Kot',
  answers: ['dog','cat', 'horse','frog'],
  correct: ['cat', 'dog'],
  number : 1,
  points: 1

}
let question2 ={
  q: 'Pies',
  answers: ['dog','cat', 'horse','frog'],
  correct: ['dog'],
  number : 1,
  points: 1

}
let question3 ={
  q: 'Kon',
  answers: ['dog','cat', 'horse','frog', 'stratata'],
  correct: ['horse'],
  number : 1,
  points: 1

}
let question4 ={
  q: 'Zaba',
  answers: ['dog','cat', 'horse','frog'],
  correct: ['frog'],
  number : 1,
  points: 1

}

let test =[
  question1,
  question2,
  question3,
  question4,
]

class App extends React.Component {
  render() {
    return(
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/tests/12345">
          <Test test={test} />
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
