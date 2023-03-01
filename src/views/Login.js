import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from "axios";

function Login() {

    const [formData, setFormData] = useState({});
    const [loginMessage, setLoginMessage] = useState('')


    const handleInputChange = (e) => {
        const target = e.target;
        /* console.log(e.target.name) */
        const name = target.name;

        setFormData({
            ...formData,
            [name]: target.value
        });
    }

    console.log(formData);

    const handleSubmit = () => {

        axios.post(`https://akademia108.pl/api/social-app/user/login`,
            formData
        )
            .then((response) => {
                console.log(response);
            })
    }

   /*  useEffect(() => { handleSubmit(); }, [formData]); */




    return (

        <form className='loginForm' >
            <input type='text' placeholder='Username' name='username' onChange={(e) => { handleInputChange(e) }}></input>
            <input type='text' placeholder='Password' name='password' onChange={(e) => { handleInputChange(e) }}></input>
            <button className='loginBtn' onClick={() => { handleSubmit() }}>Login</button>
        </form>
    )
}

export default Login;