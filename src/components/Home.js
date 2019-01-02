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
      redirect: this.props.redirect
    }
  }
  componentDidMount = () => {
    let token = localStorage.getItem('ACCESS_TOKEN')
    if(!token) {
      this.props.history.push("/login")
    }
    if(this.state.redirect==='home') {
      this.props.history.push("/shops")
    }
  }
  logoutHandler = () => {
      this.props.logoutHandler()
  }

  render() {
    let redirect = this.state.redirect
    return (
      <Container>
        <Navbar currentUser={this.props.currentUser} />
        {
          redirect==='preferredShops' ? (
            <PreferredShops />
          ) : (
            <Shops />
          )
        }
      </Container>
    )
  }
}

export default withRouter(Home);