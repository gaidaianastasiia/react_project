import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";
import AuthService from "../../services/AuthService";

export default class ProtectedRoute extends Component {
    render() {
        const authService = new AuthService();

        return (
            <Route
                render={({location}) =>
                    authService.isAuthenticated() ?
                        (<Redirect
                            to={{
                                pathname: "/main/news",
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