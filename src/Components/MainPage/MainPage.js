import React from 'react';
import logo from '../../logo.svg';
import './MainPage.css';
import SearchBar from '../SearchBar/SearchBar';
import BusinessList from '../TestsList/TestsList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";
  
  let testCard1 = {
    name: 'Test41',
    code: '219',
    description: 'Tu bedzie opis testu',

  }

  let testCard2 = {
    name: 'Test b',
    code: '100',
    description: 'Tu bedzie opis testu',

  }
  let testCard3 = {
    name: 'Test1',
    code: '112',
    description: 'Tu bedzie opis testu',

  }
  let testCard4 = {
    name: 'Test3',
    code: '229',
    description: 'Tu bedzie opis testu',

  }
  
  let testCards =[
    testCard1,
    testCard2,
    testCard4,
    testCard3,

  ]
  

class MainPage extends  React.Component {

  constructor(props){
    super(props);
    this.state ={redirect:false, testCode: null, token:null};
    this.startWithCode= this.startWithCode.bind(this)
  };

   

    startWithCode =  async (code) => {
      //console.log(code);
      const redirect = await this.props.testFromCode(code);
      window.setTimeout(() => {
        this.setState({testCode: code, redirect: redirect});
      }, 1000)
    }
    
      searchWithTerm(phrase, sortBy){
        console.log(`Searching witch phrase ${phrase}, ${sortBy}`);
      }
    
      render(){

        if (this.state.redirect) {
          return <Redirect push to={`./test`} />;
        }
        return (
          <div className="App">
            <h1>testownik</h1>
            <SearchBar startWithCode={this.startWithCode} searchWithTerm={this.searchWithTerm} />
            <BusinessList testCards ={testCards} testFromCode = {this.props.testFromCode}/>
          </div>
          
        );
      }

}

export default MainPage;