import React, { useState }  from 'react';
import { NavLink } from "react-router-dom";

import './AppNav.css';

function AppNav(props) {

    //wstępna obsługa zmiany wyświetlania nawigacji przy zalogowaniu
    const [loggedIn, setLogStatus] = useState(false);

    if (!loggedIn) {
        return (
            <nav className='MainNav'>
                <NavLink className='nav-link' to="/">Home</NavLink>
                <NavLink className='nav-link' to="/login">Login</NavLink>
                <NavLink className='nav-link' to="/signup">Sign up</NavLink>
            </nav>
        )
    }
    else {
        return (
            <nav className='MainNav'>
                <NavLink className='nav-link' to="/">Home</NavLink>
                <NavLink className='nav-link' to="/" onClick={()=>{setLogStatus(true)}}>Logout</NavLink>
            </nav>
        )
    }
}

export default AppNav;