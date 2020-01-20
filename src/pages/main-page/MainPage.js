import React, {Component, Fragment} from 'react';
import {Switch, Route} from "react-router-dom";
import Header from "../../components/main/header/Header";
import Sidebar from "../../components/main/sidebar/Sidebar";
import News from "../../components/news/News";
import Events from "../../components/events/Events";
import Profile from "../../components/profile/Profile";
import "./MainPage.css";

export default class MainPage extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <div className="wrapper">
                    <Sidebar/>
                    <main>
                        <Switch>
                            <Route path="/main/news">
                                <News/>
                            </Route>
                            <Route path="/main/events">
                                <Events/>
                            </Route>
                            <Route path="/main/profile">
                                <Profile/>
                            </Route>
                        </Switch>
                    </main>
                </div>
            </Fragment>
        )
    }
}