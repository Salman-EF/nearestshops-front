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
  componentWillUnmount(){
      this.setState({body: null})
  }
  componentDidMount = () => {
    let token = localStorage.getItem('ACCESS_TOKEN')
    if(!token) {
      this.props.history.push("/login")
    } else if(this.state.redirect==='home') {
      this.props.history.push("/shops")
    }
    if (this.state.redirect==='preferredShops') {
      this.setState({ body: <PreferredShops /> })
    } else {
      this.setState({ body: <Shops /> })
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