import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import {Navbar, NavbarNav, NavItem, NavbarToggler, Collapse} from "mdbreact";
import authServices from '../auth/authServices'
import { LOGOUT, ACCESS_TOKEN } from "../constants";

class NavbarPage extends Component {

    state = {
      currentUser: this.props.currentUser,
      collapseID: ""
    }

    componentDidUpdate (prevProps) {
      if(prevProps !== this.props) {
        this.setState({
            currentUser: this.props.currentUser
        })
      }
    }

    /* This function just for navbar Responsiveness */
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    
    logoutHandler = (e) => {
        e.preventDefault()
        let token = localStorage.getItem(ACCESS_TOKEN),origin=this
        fetch(LOGOUT,{
          method: "POST",
          headers: { "Authorization": token },
          mode: 'no-cors',
        }).then(response => response.text())
          .then(data => {
              if (data) {
                origin.setState({
                    currentUser: null
                })
                localStorage.removeItem(ACCESS_TOKEN);
                authServices.logout()
                origin.props.history.push("/login");
              }
          })
    }

    render() {
        return (
          <Navbar dark expand="md" style={{marginTop: "20px"}}>
              <NavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} className="btn-react" />
              <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} className="ml-4 text-left" navbar>
              <NavbarNav left>
                <NavItem>
                  <NavLink className="waves-effect waves-light mr-4" to="/profile" onClick={(e) => {e.preventDefault()}}>{this.state.currentUser}</NavLink>
                </NavItem>
              </NavbarNav>
              <NavbarNav right>
                <NavItem>
                  <NavLink className="waves-effect waves-light mr-4" exact to="/shops">Nearby Shops</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="waves-effect waves-light mr-5" to="/shops/preferred">My Preferred Shops</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="waves-effect waves-light mr-1" to="/logout" onClick={this.logoutHandler}>Log out</NavLink>
                </NavItem>
              </NavbarNav>
            </Collapse>
          </Navbar>
        )
    }
}
export default withRouter(NavbarPage)