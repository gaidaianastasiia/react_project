import React, {Component} from 'react';
import Button from "../button/Button";
import "./UserDropdown.css";
import AuthService from "../../../services/AuthService";
import {Redirect} from "react-router-dom";

export default class UserDropdown extends Component {
    constructor() {
        super();
        this.authService = new AuthService();
    }

    state = {
        isRedirect: false
    }

    handleSubmit = () => {
        this.authService.signout()
            .then(() => {
                this.setRedirectState(true);
            });
    }

    setRedirectState = state => {
        this.setState({
            ...this.state,
            isRedirect: state
        });
    }

    render() {
        const {isRedirect} = this.state;

        return (
            <div className="user-menu">
                <p className="user-menu__title">
                    <span className="user-menu__name">User</span>
                    <span><i className="material-icons">account_circle</i></span>
                    <span><i className="material-icons">keyboard_arrow_down</i></span>
                </p>
                <ul className="user-menu__dropdown">
                    <li>
                        <Button size={"small"} onClick={this.handleSubmit}>Log Out</Button>
                    </li>
                </ul>
                {isRedirect && <Redirect to={{pathname: '/signin'}}/>}
            </div>
        );
    }
};