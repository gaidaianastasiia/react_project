import React from "react";
import {Link} from "react-router-dom";

const Nav = () => {
    return (<nav className="nav">
        <ul className="nav__list">
            <li>
                <Link className="nav__link" to="/news">News</Link>
            </li>
            <li>
                <Link className="nav__link" to="/events">Events</Link>
            </li>
            <li className="nav__link_bottom">
                <Link className="nav__link" to="/profile">Profile</Link>
            </li>
        </ul>
    </nav>);
};

export default Nav;