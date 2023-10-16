import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo4.png';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Successful login, redirect to another page or perform further actions.
                // You can also store the user's session information.
                console.log('Login successful');
            } else {
                // Login failed, show an error message.
                const data = await response.json();
                setLoginError(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='login-container'>
            <div className='logo'>
                <img src={logo} alt='Your Logo' />
            </div>
            <form className='login-form'>
                {/* Email and Password fields */}
                <TextField
                    className='input'
                    label='Email'
                    type='email'
                    placeholder='Please Enter Your Mail ID'
                    id='email'
                    name='email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Please Enter Your Password'
                    id='password'
                    name='password'
                    required
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={togglePasswordVisibility}
                                edge='end'
                                className='icon-button1'
                            >
                                {showPassword ? <VisibilityOff style={{ color: 'white' }} /> : <Visibility style={{ color: 'white' }} />}
                            </IconButton>
                        ),
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="forgot-password"><a href="Forgot Password">Forgot Password?</a></div>
                <button className='login-button' onClick={handleLogin}>Login</button>
                {loginError && <div className="error-message">{loginError}</div>}
                <div className="dont-have-account">
                    Don't have an account? <a href="./Register" style={{ color: "#fca321", textDecoration: "none" }}>Register</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
