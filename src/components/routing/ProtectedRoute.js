import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";

export default class ProtectedRoute extends Component {
  render() {
    const {isAuthenticated} = this.props;

    return (
      <Route
        render={({location}) =>
          isAuthenticated ?
            (<Redirect
              to={{
                pathname: "/news",
                state: {from: location}
              }}
            />) : (<Redirect
              to={{
                pathname: "/signin",
                state: {from: location}
              }}
            />)
        }
      />
    );
  }
}