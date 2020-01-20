import React from 'react';
import Button from "../../common/Button";
import "./UserMenu.css";

const UserMenu = () => (
    <div className="user-menu">
        <div className="user-menu__title">
            <span><i className="material-icons">account_circle</i></span>
            <span><i className="material-icons">keyboard_arrow_down</i></span>
        </div>
        <ul className="user-menu__dropdown">
            <li>
                <Button>Log Out</Button>
            </li>
        </ul>
    </div>
);

export default UserMenu;