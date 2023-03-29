import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { NavLink } from "react-router-dom";

function Signup(props) {

    /* Czy stany w ramach różnych komponentów można nazywać się tak samo, czy lepiej różnie? */
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [signUpMessage, setSignUpMessage] = useState('');
    const [signUpDone, setSignUpDone] = useState(false);


    const handleInputChange = (e) => {
        const target = e.target;
        /* console.log(e.target.name) */
        const name = target.name;

        setFormData({
            ...formData,
            [name]: target.value.trim()
        });
    }

    const validate = () => {

        let validationErrors = {
            username: false,
            email: false,
            password: false,
            repeatPassword: false,
        };


        /* RESET KOMENTARZY DO BŁĘDÓW */
        setErrors(() => {
            return ({});
        });


        /* Username */
        if (!formData.username || formData.username.length < 4) {
            validationErrors.username = true;

            /* Używam updater function "React puts your updater functions in a queue. Then, during the next render, it will call them in the same order:" */
            setErrors((errors) => {
                return (
                    {
                        ...errors,
                        username: 'Username should have at least 4 characters'
                    }
                )
            });
        }

        else if (!/^[^\s]*$/.test(formData.username)) {
            validationErrors.username = true;

            setErrors((errors) => {
                return ({
                    ...errors,
                    username: 'Username cannot contain whitespace characters'
                });
            });
        }

        /* Email */
        if (!formData.email) {
            validationErrors.email = true;
            setErrors((errors) => {
                return ({
                    ...errors,
                    email: 'Email field cannot be empty'
                })
            });
        }

        else if (!/^[^\s]*$/.test(formData.email)) {
            validationErrors.email = true;
            setErrors((errors) => {
                return ({
                    ...errors,
                    email: 'Email cannot contain whitespace characters'
                });
            });
        }

        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = true;
            setErrors((errors) => {
                return ({
                    ...errors,
                    email: 'Invalid email format'
                });
            });
        }



        /* Password */
        if (!formData.password || formData.password.length < 6) {

            validationErrors.password = true;
            setErrors((errors) => {
                return ({
                    ...errors,
                    password: 'Password should have at least 6 characters'
                });
            });
        }

        else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password)) {

            validationErrors.password = true;
            setErrors((errors) => {
                return ({
                    ...errors,
                    password: 'Password should have at least one special character (! # @ $ %)'
                });
            });
        }

        else if (!/[0123456789^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password)) {

            validationErrors.password = true;
            setErrors((errors) => {
                return ({
                    ...errors,
                    password: 'Password must contain at least 1 digit'
                });
            });
        }

        /* Repeat password */

        if (formData.password !== formData.repeatPassword) {
            validationErrors.repeatPassword = true;

            setErrors((errors) => {
                return ({
                    ...errors,
                    repeatPassword: 'Passwords should be the same'
                });
            });
        }

        console.log(validationErrors);

        /* Returns TRUE if there are no validation errors */
        return !Object.values(validationErrors).includes(true);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        /* console.log(errors);
        console.log(validate()); */
        if (validate()) {

            let newUser = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            }

            axios
                .post("http://akademia108.pl/api/social-app/user/signup", newUser)
                .then((response) => {
                    // your code :)
                    setSignUpDone(true);
                    setSignUpMessage('Account created! :)');

                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }




    return (

        <div className="signup">
            <h2>Signup</h2>
            <form className='signupForm' >
                <h2 className='signUpHeader'>{signUpMessage}</h2>

                <input type='text' placeholder='User name' name='username' onChange={(e) => { handleInputChange(e) }}></input>
                <p className='signupMsg' >{errors.username}</p>

                <input type='email' placeholder='Email' name='email' onChange={(e) => { handleInputChange(e) }}></input>
                <p className='signupMsg' >{errors.email}</p>

                <input type='text' placeholder='Password' name='password' onChange={(e) => { handleInputChange(e) }}></input>
                <p className='signupMsg' >{errors.password}</p>

                <input type='text' placeholder='Repeat password' name='repeatPassword' onChange={(e) => { handleInputChange(e) }}></input>
                <p className='signupMsg' >{errors.repeatPassword}</p>

                <button className='signupBtn' onClick={(e) => { handleSubmit(e) }}>Sign Up</button>
                {signUpDone &&
                    <NavLink className='nav-link' to="/signup">
                        <button className='signupBtn'>Przejdź do logowania</button>
                    </NavLink>}
            </form>
        </div>
    )
}

export default Signup;