import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import '../App.css';
import {Container} from "mdbreact";

import Navbar from './shops/Navbar'
import Shops from './shops/all/Shops'
import PreferredShops from './shops/preferred/PreferredShops'
import { ACCESS_TOKEN, USER_ME } from './constants';

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
    let token = localStorage.getItem(ACCESS_TOKEN),origin = this;
    fetch(USER_ME, {
      method: "GET",
      headers: { "Authorization": token },
      mode: 'no-cors'
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