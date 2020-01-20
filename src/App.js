import React from 'react';
import {Link, Switch, Route, Redirect} from "react-router-dom";
import './App.css';
import MainPage from "./pages/main-page/MainPage";
import SignupPage from "./pages/signup-page/SignupPage";
import SigninPage from "./pages/signin-page/SigninPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";

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
                <ProtectedRoute/>
            </Switch>
        </div>
    );
}

export default App;
