import React from 'react';
import {Switch, Route} from "react-router-dom";
import './App.css';
import SignupPage from "./pages/signup-page/SignupPage";
import SigninPage from "./pages/signin-page/SigninPage";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import NewsPage from "./pages/news-page/NewsPage";
import EventsPage from "./pages/events-page/EventsPage";
import ProfilePage from "./pages/profile-page/ProfilePage";

function App() {
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
                <ProtectedRoute/>
            </Switch>
        </div>
    );
}

export default App;
