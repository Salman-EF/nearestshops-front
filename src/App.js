import React, { Component } from 'react';
import './App.css';

import { Switch,Route,Redirect,withRouter } from 'react-router-dom';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login"  component={Login} loginHandler={this.loginHandler} />
          <Route path="/register" component={Register} loginHandler={this.loginHandler} />
          <Route exact path="/" component={() => <Redirect to="/shops" />} />
          <PrivateRoute exact path="/shops" component={() => <Home />} />
          <PrivateRoute exact path="/shops/preferred" component={() => <Home  />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);