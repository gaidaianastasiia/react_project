import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import './App.css';
import SignupPage from "./pages/signup-page/SignupPage";
import SigninPage from "./pages/signin-page/SigninPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import NewsPage from "./pages/news-page/NewsPage";
import EventsPage from "./pages/events-page/EventsPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import AuthService from "./services/AuthService";
import Loader from "./components/common/loader/Loader";

export default class App extends Component {
    constructor() {
        super();
        this.authService = new AuthService();
    }

    state = {
        isAuthChecked: false,
        isAuthenticated: false
    }

    componentDidMount() {
        this.checkIsAuthenticated();
    }

    checkIsAuthenticated() {
        this.authService.isAuthenticated()
            .then(() => {
               this.setAuthState(true, true);
            })
            .catch(() => {
                    this.setAuthState(true, false);
                }
            )
    }

    setAuthState = (isAuthChecked, isAuthenticated) => {
        this.setState({
            ...this.state,
            isAuthChecked,
            isAuthenticated
        });
    }

    render() {
        const {isAuthChecked, isAuthenticated} = this.state;

        return (
            <div>
                <Switch>
                    <Route path="/news">
                        <NewsPage/>
                    </Route>
                    <Route path="/events">
                        <EventsPage/>
                    </Route>
                    <Route path="/profile">
                        <ProfilePage/>
                    </Route>
                    <Route path="/signin">
                        <SigninPage/>
                    </Route>
                    <Route path="/signup">
                        <SignupPage/>
                    </Route>
                    {isAuthChecked ? <ProtectedRoute isAuthenticated={isAuthenticated}/> : <Loader/>}
                </Switch>
            </div>
        );
    }
}


