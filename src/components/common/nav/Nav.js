import React from "react";
import {Link} from "react-router-dom";
import "./Nav.css";

const Nav = () => {
    return (<nav className="nav">
        <ul>
            <li>
                <Link to="/news">News</Link>
            </li>
            <li>
                <Link to="/events">Events</Link>
            </li>
            <li className="profile-link">
                <Link to="/profile">Profile</Link>
            </li>
        </ul>
    </nav>);
};

export default Nav;