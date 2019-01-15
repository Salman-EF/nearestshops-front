import React, { Component } from 'react';
import { withRouter ,Link} from 'react-router-dom';
import '../../App.css';
import { MDBInput,MDBBtn } from "mdbreact";
import authServices from './authServices'

class Register extends Component {

  state = {
    email: '',
    password: '',
    signupFailed: ''
  }
  componentWillMount() {
    if (authServices.isAuthenticated()) {
      this.props.history.push('/shops')
    }
  }

  changeHandler = (e) => {
    let target = e.target
    if (target.id === 'email') {
      this.validateEmail(target.value) ? (this.setState({invalidEmail:''})):(this.setState({invalidEmail:'invalid'}))
    }
    this.setState({
      [e.target.id]: e.target.value,
      signupFailed : ''
    })
  }
  submitHandler = (e) => {
    e.preventDefault()
    this.setState({ isLoading: true })
    let email = this.state.email, password = this.state.password
    if(this.validateEmail(email) && password) {
      var user = {email:email,password:password}, origin=this
      fetch("http://localhost:8080/api/register",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
      }).then(response => response.text())
        .then(function(data) {
          origin.setState({ isLoading: false })
          if(data.includes('Bearer')) {
            localStorage.setItem('ACCESS_TOKEN', data)
            origin.setState({ signupFailed : '' });
            authServices.login()
            origin.props.history.push('/login')
          } else {
            origin.setState({ signupFailed : 'Email already used! Please try another one.' });
          }
        })
    }
  }
  render() {
    return (
      <div className="row justify-content-center m-0">
          <div className="col-md-4">
            <form className="text-center p-5" method="post" action="#" onSubmit={this.submitHandler}>
              <div className="row">
                <div className="col-12">
                  {/* Email */}
                  <div className="md-form mb-5">
                    <MDBInput id="email" name="email" hint="Your Email" className={this.state.invalidEmail +' text-center'} 
                              onChange={this.changeHandler} value={this.state.email} />
                  </div>
                  {/* Pass */}
                  <div className="md-form mb-5">
                    <MDBInput id="password" name="password" type="password" hint="Password" className="text-center"
                              onChange={this.changeHandler} value={this.state.password} />
                  </div>
                  {
                    (this.state.isLoading)? (
                      <p>Registering...</p>
                    ) : (null)
                  }
                  <p className="red-text text-center">{this.state.signupFailed}</p>
                  <div className="form-group row justify-content-center">
                      <div className="col-md-8">
                          <MDBBtn type="submit" color="react">Sign Up</MDBBtn>
                      </div>
                  </div>
                  <div className="row justify-content-center">
                    <span>If U already have an account </span>
                    <Link className="font-weight-bold waves-effect waves-light mx-1" to="/login">Log In</Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
      </div>
    );
  }

  validateEmail(email) {
    let EMAIL_FORMAT = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(EMAIL_FORMAT)) return true
    return false
  }
}
  
export default withRouter(Register);