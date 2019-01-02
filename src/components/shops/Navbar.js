import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import {Navbar, NavbarNav, NavItem, NavbarToggler, Collapse,DropdownToggle,Dropdown,DropdownMenu,DropdownItem,Fa} from "mdbreact";

class NavbarPage extends Component {

    state = {
        collapseID: ""
    };
    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    logoutHandler = () => {
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
                  <Dropdown>
                    <DropdownToggle nav caret>
                      <Fa icon="user" className="mr-1" />{this.props.currentUser}
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-default" right>
                      <DropdownItem onClick={this.logoutHandler}>Log out</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
              </NavbarNav>
            </Collapse>
          </Navbar>
        )
    }
}
export default withRouter(NavbarPage)