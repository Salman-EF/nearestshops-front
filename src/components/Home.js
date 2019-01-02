import React, { Component } from 'react';
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

  render() {
    let redirect = this.state.redirect
    return (
      <Container>
        <Navbar />
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

export default Home;