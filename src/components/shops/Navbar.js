import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import {Navbar, NavbarNav, NavItem, NavbarToggler, Collapse} from "mdbreact";

class NavbarPage extends Component {

    state = {
        collapseID: ""
    };

    /* This function just for navbar Responsiveness */
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    
    logoutHandler = (e) => {
        e.preventDefault()
        let token = localStorage.getItem('ACCESS_TOKEN'), origin = this
        fetch('http://localhost:8080/api/logout',{
          method: "POST",
          headers: { "Authorization": token }
        }).then(response => response.text())
          .then(data => {
              if (data) {
                origin.setState({
                    currentUser: null,
                    isAuthenticated: false
                })
                localStorage.removeItem('ACCESS_TOKEN');
                origin.props.history.push("/login");
              }
          })
    }

    render() {
        return (
          <Navbar dark expand="md" style={{marginTop: "20px"}}>
              <NavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} className="warning-color" />
              <Collapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
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