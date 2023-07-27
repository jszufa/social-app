import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from '../views/Home';
import Login from '../views/Login';
import Signup from '../views/Signup';

function AppRoutes(props) {

    //jak tutaj dodać routing dla logoutu?? Bez dodawania komponentu logoutu??


    return (
        <Routes>
            <Route path="social-app/" element={<Home setUser={props.setUser} user={props.user} setShowPopup={props.setShowPopup} showPopup={props.showPopup} />} />
            <Route path="social-app/login" element={<Login setUser={props.setUser} user={props.user} setShowPopup={props.setShowPopup} />} />
            <Route path="social-app/signup" element={<Signup />} />
        </Routes>
    )
}

export default AppRoutes;



