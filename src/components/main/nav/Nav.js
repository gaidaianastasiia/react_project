import React from "react";
import {Link} from "react-router-dom";
import "./Nav.css";

const Nav = () => {
    return (<nav className="nav">
        <ul>
            <li>
                <Link to="/main/news">News</Link>
            </li>
            <li>
                <Link to="/main/events">Events</Link>
            </li>
            <li>
                <Link to="/main/profile">Profile</Link>
            </li>
        </ul>
    </nav>);
};

export default Nav;