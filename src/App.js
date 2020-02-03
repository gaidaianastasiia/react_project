import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom";
import './App.scss';
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import NewsPage from "./pages/NewsPage";
import EventsPage from "./pages/EventsPage";
import ProfilePage from "./pages/ProfilePage";
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


