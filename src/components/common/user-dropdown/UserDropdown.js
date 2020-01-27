import React, {Component} from "react";
import Button from "../button/Button";
import "./UserDropdown.css";
import AuthService from "../../../services/AuthService";
import {Redirect} from "react-router-dom";

export default class UserDropdown extends Component {
    constructor() {
        super();
        this.authService = new AuthService();
        this.currentUser = this.authService.getCurrentUser();
    }

    state = {
        listOpen: false,
        isRedirect: false
    };

    toggleList = () => {
        this.setState(prevState => ({
            ...this.state,
            listOpen: !prevState.listOpen
        }));
    };

    handleSubmit = () => {
        this.authService.signout().then(() => {
            this.setRedirectState(true);
        });
    };

    setRedirectState = state => {
        this.setState({
            ...this.state,
            isRedirect: state
        });
    };

    render() {
        const {listOpen, isRedirect} = this.state;
        const userName = this.currentUser.role;

        return (
            <div className="dd-wrapper">
                <div className="dd-header" onClick={this.toggleList}>
                    <span className="user-name">{userName}</span>
                    <span>
            <i className="material-icons">account_circle</i>
          </span>
                    <span>
            <i className="material-icons">keyboard_arrow_down</i>
          </span>
                </div>
                {listOpen && (
                    <ul className="dd-list">
                        <li className="dd-list-item">
                            <Button size={"small"} onClick={this.handleSubmit}>
                                Log Out
                            </Button>
                        </li>
                    </ul>
                )}
                {isRedirect && <Redirect to={{pathname: "/signin"}}/>}
            </div>
        );
    }
}
