import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import {Navbar, NavbarNav, NavItem, NavbarToggler, Collapse} from "mdbreact";

class NavbarPage extends Component {

    state = {
        collapseID: ""
    };
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    logoutHandler = (e) => {
        e.preventDefault()
        localStorage.removeItem('ACCESS_TOKEN');
        this.setState({
            currentUser: null,
            isAuthenticated: false
        });
        this.props.history.push("/login");
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