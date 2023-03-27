import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios";
import { Navigate } from "react-router-dom";

function LoginForm(props) {

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
                if (response.status === 200) {

                    //zapisywanie użytkownika w local storage
                    localStorage.setItem('user-info', JSON.stringify(response.data))

                    setLoginMessage('Zalogowano :)');

                    //zamykam popup (jeśli jest akurat przez route Login - to wtedy ta operacja jest w sumie niepotrzebna)
                    props.setShowPopup(false);

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

        <div className="login">
            {props.user && <Navigate to='/' />}
            <form className='loginForm' >
                <p className='loginMsg' >{loginMessage}</p>

                <input type='text' placeholder='Username' name='username' onChange={(e) => { handleInputChange(e) }}></input>
                <input type='text' placeholder='Password' name='password' onChange={(e) => { handleInputChange(e) }}></input>

                <button className='loginBtn' onClick={(e) => { handleSubmit(e) }}>Login</button>
            </form>
        </div>
    )
}

export default LoginForm;