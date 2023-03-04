import React from 'react';
import { NavLink } from "react-router-dom";
import axios from "axios";

import './AppNav.css';

function AppNav(props) {

    const handleLogout = () => {

        axios.post(`https://akademia108.pl/api/social-app/user/logout`)
            .then((response) => {
                console.log(response.data);
                localStorage.clear();
                props.setUser('');
            });
    }



    if (!props.user) {
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
                <NavLink className='nav-link' to="/" onClick={() => { handleLogout() }}>Logout</NavLink>
            </nav>
        )
    }
}

export default AppNav;