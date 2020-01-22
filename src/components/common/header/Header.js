import React, {Component} from 'react';
import Logo from "../logo/Logo";
import UserDropdown from "../user-dropdown/UserDropdown";
import "./Header.css";
import AuthService from "../../../services/AuthService";

export default class Header extends Component {
    render() {
        const authService = new AuthService();

        return (
            <header className="header">
                <Logo />
                {authService.isAuthenticated() && <UserDropdown />}
            </header>
        )
    }
}