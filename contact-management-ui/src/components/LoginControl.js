
import { Dashboard } from './Dashboard';
import {LoginButton, LogoutButton} from './Greeting';
import React, {Component} from 'react';
import { StoreUser, UpdateUser } from '../User';
import { Greeting } from './Greeting';
export class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      this.handleLoginClick = this.handleLoginClick.bind(this);
      this.handleLogoutClick = this.handleLogoutClick.bind(this);
      this.state = {isLoggedIn: null};
    }
  
    handleLoginClick() {
      this.setState({isLoggedIn: true});
    }
  
    handleLogoutClick() {
      this.setState({isLoggedIn: false});
    }
  
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
      if (isLoggedIn) {
        button = <LogoutButton onClick={this.handleLogoutClick} />;
      } else {
        button = <LoginButton onClick={this.handleLoginClick} />;
      }
  
      return (
        <div>
          {/* <Greeting isLoggedIn={isLoggedIn} /> */}
          {button}
        </div>
      );
    }
  }