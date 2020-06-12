import React from 'react';
import './UserMenu.css';
import {Link} from 'react-router-dom';


class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: 'pwr',
      password: 'swordfish',
      authorized: false,
      redirect: false
    };
    this.authorize = this.authorize.bind(this);
    this.logout = this.logout.bind(this);
  }

  authorize(e) {
    const password = e.target.querySelector(
      'input[type="password"]').value;
    const auth = password == this.state.password || password == 1;
    this.setState({
      authorized: auth
    });
  }
  logout(e){
    this.setState({
      authorized: false
    });
  }



  render() {

    if(this.state.authorized)
    { }

    let beforeLogin = (
			<div className="before-login">
				<form action="#" onSubmit={this.authorize}>
					<input type="text" placeholder="Login" />
					<input type="password" placeholder="Password" /><br />
					<input type="submit"  value="Zaloguj"/>
				</form>
			</div>
    );


    const afterLogin = (
      <div className="after-login">
        <ul>
          <h3>Zalogowano jako: {this.state.login}</h3>
          <button id="logOut_button" onClick={this.logout}>Wyloguj</button>
          <button >Moje Testy</button>
          <Link to="/newTest">
          <button >Nowy test</button>
          </Link>
       </ul>
      </div>

    );


    return (
      <div id="authorization" className="UserMenu">
        {this.state.authorized ? afterLogin : beforeLogin }
      </div>
    );
  }
}

export default UserMenu;
