import React from 'react';
import {Link, Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import MainPage from "./pages/main-page/MainPage";
import SignupPage from "./pages/signup-page/SignupPage";
import SigninPage from "./pages/signin-page/SigninPage";
import AuthService from "./services/AuthService";

const authService = new AuthService();

function App() {
    return (
        <div>
            <Switch>
                <Route path="/main">
                    <MainPage/>
                </Route>
                <Route path="/signin">
                    <SigninPage/>
                </Route>
                <Route path="/signup">
                    <SignupPage/>
                </Route>
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
            </Switch>
        </div>
    );
}

export default App;
