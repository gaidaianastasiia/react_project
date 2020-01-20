import React, {Component} from 'react';
import Logo from "../../common/logo/Logo";
import UserMenu from "../user-menu/UserMenu";
import "./Header.css";

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <Logo />
                <UserMenu />
            </header>
        )
    }
}