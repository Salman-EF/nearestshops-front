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
      redirect: this.props.redirect,
      body: null
    }
  }
  isAuthenticated(){
    let token = localStorage.getItem('ACCESS_TOKEN')
    if(!token) {
      this.props.history.replace({pathname: '/login'})
    }
  }
  routingCheck = () => {
    // Check first authetication/accessToken exists
    this.isAuthenticated()
    // Redirect '/' path to '/shops' because shops page is the home page
    var route = this.props.history.location['pathname']
    if(route==='/') {
      this.props.history.replace({pathname: '/shops'});
    } else if (route==='/shops/preferred') {
      this.setState({ body: <PreferredShops /> })
    } else {
      this.setState({ body: <Shops /> })
    }
  }
  componentDidMount = () => {
    this.routingCheck()
  }
  componentDidUpdate = (prevProps) => {
    if (this.props!==prevProps) {
      this.routingCheck()
    }
  }

  render() {
    return (
      <Container>
        <Navbar currentUser={this.props.currentUser} />
        {
          this.state.body
        }
      </Container>
    )
  }
}

export default withRouter(Home);