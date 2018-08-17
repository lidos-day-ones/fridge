import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';
import './App.css';

// get this from firebase.google.com
const config = {};

const db = firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({user});
      }
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to your fridge</h1>
        </header>
        {this.state.user ? <Profile user={this.state.user}/> : <Login />}
      </div>
    );
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>hi, {this.props.user.email}</p>
        <Logout />
      </div>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  signUp(event) {
    event.preventDefault();

    firebase.auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('sign up error', errorCode, errorMessage);
      this.setState({errorMessage});
    });
  }

  logIn(event) {
    event.preventDefault();

    firebase.auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('log in error', errorCode, errorMessage);
      this.setState({errorMessage});
    });
  }

  render() {
    return (
      <form>
        <p>{this.state.errorMessage}</p>
        <input name="email" type="email" onChange={this.handleInputChange.bind(this)} />
        <input name="password" type="password" onChange={this.handleInputChange.bind(this)} />
        <button onClick={this.signUp.bind(this)}>sign up</button>
        <button onClick={this.logIn.bind(this)}>log in</button>
      </form>
    );
  }
}

class Logout extends Component {
  logOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  render() {
    return (
      <form>
        <button onClick={this.logOut.bind(this)}>log out</button>
      </form>
    );
  }
}

export default App;
