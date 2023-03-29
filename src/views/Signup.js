import React, { useState } from 'react';
import './Signup.css';

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
            [name]: target.value
        });
    }

    const validate = () => {

        let validationErrors = {
            username: false,
            email: false,
            password: false,
            repeatPassword: false,
        };

        /* console.log(formData.username.length); */

        /* Pytanie: jak ustawiać stany wielokrotnie w czasie jednego wywołania funkcji */

        /* Username */
        if (!formData.username || formData.username.length < 4) {
            console.log('0 characters');
            validationErrors.username = true;
            setErrors((errors) => {
                return (
                    {
                        ...errors,
                        username: 'Username should have at least 4 characters'
                    }
                )
            });
        }

        else if (!/^[^\s]*$/.test(formData.username) /* || /\s/.test(formData.username) */) {
            console.log('empty character');
            validationErrors.username = true;

            setErrors((errors) => {
                return ({
                    ...errors,
                    username: 'Username cannot contain empty characters'
                });
            });
        }

        /* Email */
        if (!formData.email) {
            validationErrors.email = true;
            setErrors((errors) => {
                return ({
                    ...errors,
                    email: 'Email filed cannot be empty'
                })
            });
        }

        else if (!/^[^\s]*$/.test(formData.username)) {
            validationErrors.email = true;
            setErrors({
                ...errors,
                email: 'Email cannot contain empty characters'
            });
        }


        /* Password */
        if (!formData.password || formData.password.length < 6) {

            validationErrors.password = true;
            setErrors({
                ...errors,
                password: 'Password should have at least 6 characters'
            });
        }

        else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password)) {

            validationErrors.password = true;
            setErrors({
                ...errors,
                password: 'Password should have at least one special character (! # @ $ %)'
            });
        }

        else if (!/[0123456789^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password)) {

            validationErrors.password = true;
            setErrors({
                ...errors,
                password: 'Password must contain at least 1 digit'
            });
        }

        console.log(validationErrors);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(errors);
        validate();


        /* Walidacja */
        /* if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password)) {
            console.log('hasło zawiera znak specjalny');
        }
        else {
            console.log('hasło nie zawiera znaku specjalnego')
        } */


        /*  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test('string');
 
         /^[^\s]*$/.test('string'); */


    }




    return (

        <div className="signup">
            <h2>Signup</h2>
            <form className='signupForm' >
                {/* <h2 className='signupMsg' >Account created</h2> */}

                <input type='text' placeholder='User name' name='username' onChange={(e) => { handleInputChange(e) }}></input>
                <p className='signupMsg' >{errors.username}</p>

                <input type='text' placeholder='Email' name='email' onChange={(e) => { handleInputChange(e) }}></input>

                <input type='text' placeholder='Password' name='password' onChange={(e) => { handleInputChange(e) }}></input>
                <p className='signupMsg' >{errors.password}</p>

                <input type='text' placeholder='Repeat password' name='repeatPassword' onChange={(e) => { handleInputChange(e) }}></input>

                <button className='signupBtn' onClick={(e) => { handleSubmit(e) }}>Sign Up</button>
                {/* <button className='signupBtn'>Przejdź do logowania</button> */}
            </form>
        </div>
    )
}

export default Signup;