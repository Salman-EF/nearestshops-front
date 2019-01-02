import React, { Component } from 'react';
import './App.css';

import { Route,withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
  }

  loadCurrentUser = () => {
    let token = localStorage.getItem('ACCESS_TOKEN')
    if(!token) {
      let path = this.props.location['pathname']
      if (path === '/' || path === '/shops' || path === '/shops/preferred') {
        this.props.history.push("/login")
      }
    } else {
      let origin = this;
      fetch("http://localhost:8080/api/users/me",{
        method: "GET",
        headers: { "Authorization": token }
      }).then(response => response.json())
        .then(data => {
          origin.setState({
            currentUser:{email:data},
            isAuthenticated: true,
            isLoading: false
          })
          this.props.history.push("/")
        })
    }
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  loginHandler = () => {
    this.setState({ isLoading: true });
    this.loadCurrentUser();
  }

  render() {
    return (
      <div className="App">
          {
            (this.state.isLoading) ? (
              <div className="m-5">Login...</div>
            ) : (
              <main className="App-main">
                  <Route path="/login"  component={Login} loginHandler={this.loginHandler} />
                  <Route path="/register" component={Register} loginHandler={this.loginHandler} />
                  <Route exact path="/" component={() => <Home redirect="home"/>} />
                  <Route exact path="/shops" component={() => <Home redirect="shops"
                        currentUser={this.state.currentUser} handleLogout={this.handleLogout} />} />
                  <Route exact path="/shops/preferred" component={() => <Home redirect="preferredShops"
                        currentUser={this.state.currentUser} handleLogout={this.handleLogout} />} />
              </main>
            )
          }
      </div>
    );
  }
}

export default withRouter(App);