import React from 'react';
import Button from "../button/Button";
import "./UserDropdown.css";

const UserDropdown = () => (
    <div className="user-menu">
        <p className="user-menu__title">
            <span className="user-menu__name">User</span>
            <span><i className="material-icons">account_circle</i></span>
            <span><i className="material-icons">keyboard_arrow_down</i></span>
        </p>
        <ul className="user-menu__dropdown">
            <li>
                <Button size={"small"}>Log Out</Button>
            </li>
        </ul>
    </div>
);

export default UserDropdown;