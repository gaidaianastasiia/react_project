import React, {Component} from 'react';
import AuthService from "../../../services/AuthService";
import Logo from "../logo/Logo";
import UserDropdown from "../user-dropdown/UserDropdown";

export default class Header extends Component {
    constructor() {
        super();
        this.authService = new AuthService();
    }

    render() {
        const currentUser = this.authService.getCurrentUser();

        return (
            <header className="header">
                <Logo/>
                {currentUser && <UserDropdown/>}
            </header>
        )
    }
}