import React, { useState } from 'react';
import './Popup.css';

function Popup(props) {

    /* ten stan przechowywać w app */
    

    if (props.showPopup) {
        return (

            <div className='popupWindow'>
                <span onClick={() => props.setShowPopup(false)}>X</span>
                <h2>Already have an account?</h2>
                <p>No? Create account! SignUp</p>
            </div>
        )
    }
}

export default Popup;