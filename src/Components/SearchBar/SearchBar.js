import React from 'react';
import './SearchBar.css';
import UserMenu from '../UserMenu/UserMenu';



class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      term: '',
      code: '',
      sortBy: 'best_match'
    };

    this.handleCodeChange =this.handleCodeChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleStartCode=this.handleStartCode.bind(this);
    this.handleSearchTerm=this.handleSearchTerm.bind(this);


    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'highest_match',
      'Most Reviewed': 'review_count',
    }; 
  }
   
    getSortByClass(sortByOption){
      if(this.state.sortBy === sortByOption ){
        return 'active';
      }
      else{
        return '';
      }
    } 

    handleSortByChange(sortByOption){
      this.setState({
        sortBy: sortByOption
      })
    }

    handleTermChange(e){
      let term = e.target.value;
      this.setState({term: term});
    }

    handleCodeChange(e){
      let code = e.target.value;
      this.setState({code: code});
    }

    handleStartCode(e){
      this.props.startWithCode(this.state.code);
      e.preventDefault();
    }

    handleSearchTerm(e){

      this.props.searchWithTerm(this.state.term, this.state.sortBy);
      e.preventDefault();
    }

    renderSortByOptions(){
        return Object.keys(this.sortByOptions).map(sortByOption =>{
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return (<li key={sortByOptionValue} 
              className={this.getSortByClass(sortByOptionValue)}
              onClick={this.handleSortByChange.bind(this, sortByOptionValue)}> 
                {sortByOption}
              </li>)
        });
    }

    render(){
        return (
        <div className="SearchBar">

            <div className="row">
              <div className="col-sm-3">
              </div>
              <div className="col-sm-6">
                <div className="SearchBar-fields">
                  <input placeholder="Input code of your test" onChange={this.handleCodeChange}/>
                </div>
                <div className="SearchBar-submit" onClick={this.handleStartCode}>
                  <a>Start test</a>
                </div>

                <div className="SearchBar-sort-options">
                  <ul>
                    {this.renderSortByOptions()}
                  </ul>
                </div>
                


                <div className="SearchBar-fields">
                  <input placeholder="Search for test" onChange={this.handleTermChange}/>
                </div>
                <div className="SearchBar-submit" onClick={this.handleSearchTerm}>
                  <a>Let's Go</a>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="SearchBar-UserMenu">
                  <UserMenu />
                </div>
              </div>
            </div>

        </div>)
    }

}

export default SearchBar;