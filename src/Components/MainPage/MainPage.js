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
    imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    name: 'Kuchnia włoska',
    code: '1',
    description: 'Tu bedzie opis testu, jakkolwiek ma on wyglądać. Coś się tu jeszcze ładnego napisze i będzie fajnie',
    rating: 4.5,
    reviewCount: 90
  }
  let testCard2 = {
    imageSrc: 'https://s3.amazonaws.com/codecademy-content/programs/react/ravenous/pizza.jpg',
    name: 'Kuchnia włoska',
    code: '0',
    description: 'Tu bedzie opis testu, jakkolwiek ma on wyglądać. Coś się tu jeszcze ładnego napisze i będzie fajnie',
    rating: 4.5,
    reviewCount: 90
  }

  let testCards =[
    testCard1,
    testCard2,
    testCard1,
    testCard2,
    testCard1,
    testCard2,
  ]


class MainPage extends  React.Component {

  constructor(props){
    super(props);
    this.state ={redirect:false, testCode: null};
    this.startWithCode= this.startWithCode.bind(this)
  };



    startWithCode(code){
      //console.log(code);
      this.setState({testCode: code, redirect: true})
      this.props.testFromCode(code);
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
            <h1>Testownik</h1>
            <SearchBar startWithCode={this.startWithCode} searchWithTerm={this.searchWithTerm} />
            <BusinessList testCards ={testCards} testFromCode = {this.props.testFromCode}/>
          </div>

        );
      }

}

export default MainPage;
