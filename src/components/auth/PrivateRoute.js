import React from 'react';
import { Route, Redirect } from "react-router-dom";
import authServices from './authServices'
  
  
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={ props => {
        if(authServices.isAuthenticated()) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        }
      }}
    />
  )
}
  
export default PrivateRoute