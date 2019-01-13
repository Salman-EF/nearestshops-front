import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import '../App.css';
import {Container} from "mdbreact";

import Navbar from './shops/Navbar'
import Shops from './shops/all/Shops'
import PreferredShops from './shops/preferred/PreferredShops'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: null,
      body: null
    }
  }
  routingCheck = () => {
    // Redirect '/' path to '/shops' because shops page is the home page
    var route = this.props.history.location['pathname']
    if (route==='/shops/preferred') {
      this.setState({ body: <PreferredShops /> })
    } else {
      this.setState({ body: <Shops /> })
    }
  }
  componentDidMount () {
    let token = localStorage.getItem('ACCESS_TOKEN'),origin = this;
    fetch("http://localhost:8080/api/users/me",{
      method: "GET",
      headers: { "Authorization": token }
    }).then(response => response.text())
      .then(data => {
        origin.setState({
          currentUser:data
        })
      })
  }
  componentWillMount = () => {
    this.routingCheck()
  }

  render() {
    return (
      <main className="App-main">
        <Navbar currentUser={this.state.currentUser} />
        <Container>
          {
            this.state.body
          }
        </Container>
        </main>
    )
  }
}

export default withRouter(Home);