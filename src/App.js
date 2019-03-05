import React, { Component } from 'react';
import Login from './components/login/login';
import Register from './components/register/register';
import Feed from './components/feed/feed';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute'

class App extends Component {


  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Router>
          <div>
            <Route exact path="/" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute path="/feed" component={Feed}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
