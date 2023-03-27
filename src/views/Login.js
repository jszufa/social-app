import React, { useState } from 'react';
import './Login.css';
import LoginForm from '../components/LoginForm';

function Login(props) {


    return (

        <div className="loginFrame">
            <LoginForm setUser={props.setUser} user={props.user} setShowPopup={props.setShowPopup}/>
        </div>
    )
}

export default Login;