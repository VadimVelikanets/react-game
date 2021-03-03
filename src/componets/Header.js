import React from 'react';
import {
    NavLink
} from "react-router-dom";
const Header = () =>{
    return(
        <header>
            <div className="header-logo">
               XO
            </div>
            <ul>
                <li>
                    <NavLink  activeClassName='active-link' exact to="/">Game</NavLink>
                </li>
                <li>
                    <NavLink activeClassName='active-link' to="/settings">Settings</NavLink>
                </li>
            </ul>
        </header>
    )
}
export default Header;