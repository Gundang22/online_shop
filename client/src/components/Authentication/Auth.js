import React, { useState } from 'react'

import Login from './Login/Login.js';
import Signup from './Sigunup/Signup.js';
import Forgot from './Forgot/Forgot.js';

const Auth = () => {
    const [login, setLogin] = useState(true);
    const [forgot, setForgot] = useState(false);
    
    return (
        <>
            {login ? (
                forgot ? (
                    <Forgot forgot={forgot => setForgot(forgot)} />
                ) : (
                    <Login login={register => setLogin(register)} forgot={forgot => setForgot(forgot)} />
                )
            ) : (   
                <Signup login={register => setLogin(register)} />
            )}
        </>
    );
}

export default Auth;