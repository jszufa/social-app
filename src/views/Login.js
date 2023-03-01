import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from "axios";

function Login(props) {

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

    /* console.log(formData); */

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`https://akademia108.pl/api/social-app/user/login`,
            formData
        )
            .then((response) => {
                /* console.log(response); */
                if (response.status == 200) {

                    //zapisywanie użytkownika w local storage
                    localStorage.setItem('user-info', JSON.stringify(response.data))

                    setLoginMessage('Zalogowano :)');

                    props.setUser(JSON.parse(localStorage.getItem('user-info')));
                    //zastanawiam się czy na pewno dobrze to zrobiłem


                }
                else {
                    setLoginMessage('Niepoprawny login lub/i hasło - wprowadź poprawne dane');

                    localStorage.setItem('user-info', '')
                    // może tymczasowo
                }

            })
    }







    return (

        <form className='loginForm' >
            <p className='loginMsg' >{loginMessage}</p>

            <input type='text' placeholder='Username' name='username' onChange={(e) => { handleInputChange(e) }}></input>
            <input type='text' placeholder='Password' name='password' onChange={(e) => { handleInputChange(e) }}></input>
            
            <button className='loginBtn' onClick={(e) => { handleSubmit(e) }}>Login</button>
        </form>
    )
}

export default Login;