import React, { useState } from 'react';
import './Register.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import logo from '../assets/logo4.png';
import { notification } from 'antd';
import { CUSTOMER_BASE_REST_API_URL } from '../services/api';

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    mail: '',
    mobileNumber: '',
    address: '',
    postalCode: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      notification.error({
        message: 'Password Mismatch',
        description: 'Password and Confirm Password do not match.',
      });
      return;
    }

    const apiUrl = `${CUSTOMER_BASE_REST_API_URL}/register`;

    const requestBody = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      city: formData.city,
      mail: formData.mail,
      mobileNumber: formData.mobileNumber,
      address: formData.address,
      postalCode: formData.postalCode,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed. Please try again.');
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        if (data === 'Mail ID Already Exists.') {
          notification.error({
            message: 'Email Already Exists',
            description: 'A user with this email already exists.',
          });
        } else if (data === 'Mobile Number Already Exists.') {
          notification.error({
            message: 'Mobile Number Already Exists',
            description: 'A user with this mobile number already exists.',
          });
        }
        else {
          notification.success({
            message: 'Registration successful',
            description: data,
          });
        }
      })
      .catch((error) => {
        console.error('Registration error:', error.message);
        notification.error({
          message: 'Registration error',
          description: 'An error occurred during registration. Please try again.',
        });
      });
  };

  return (
    <div className='register-container'>
      <div className='logo'>
        <img src={logo} alt='Your Logo' />
      </div>
      <form className='register-form' onSubmit={handleSubmit}>
        <TextField className='input'
          label='First Name'
          type='text'
          placeholder='Please Enter Your First Name'
          id='first-name'
          name='firstName'
          onChange={handleInputChange}
          required
        />
        <TextField
          label='Last Name'
          type='text'
          placeholder='Please Enter Your Last Name'
          id='last-name'
          name='lastName'
          onChange={handleInputChange}
          required
        />
        <TextField
          label='City'
          type='text'
          placeholder='Please Enter Your City'
          id='city'
          name='city'
          onChange={handleInputChange}
          required
        />
        <TextField
          label='Email'
          type='email'
          placeholder='Please Enter Your Email'
          id='mail'
          name='mail'
          onChange={handleInputChange}
          required
        />
        <TextField
          label='Mobile number'
          type='number'
          placeholder='Please Enter Your Mobile Number'
          id='mobile-number'
          name='mobileNumber'
          onChange={handleInputChange}
          required
        />
        <TextField
          label='Address'
          type='text'
          placeholder='Please Enter Your Address'
          id='address'
          name='address'
          onChange={handleInputChange}
          required
        />
        <TextField
          label='Postal code'
          type='number'
          placeholder='Please Enter Your Postal Code'
          id='postal-code'
          name='postalCode'
          onChange={handleInputChange}
          required
        />
        <TextField
          label='Password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Please Enter Your Password'
          id='password'
          name='password'
          onChange={handleInputChange}
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
        />
        <TextField
          label='Confirm Password'
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder='Please Enter Your Confirm Password'
          id='confirm-password'
          name='confirmPassword'
          onChange={handleInputChange}
          required
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label='toggle confirm password visibility'
                onClick={toggleConfirmPasswordVisibility}
                edge='end'
                className='icon-button2'
              >
                {showConfirmPassword ? <VisibilityOff style={{ color: 'white' }} /> : <Visibility style={{ color: 'white' }} />}
              </IconButton>
            ),
          }}
        />
        <button type='submit' className='register-button'>
          Register
        </button>
        <div className="already-have-account">
          Already have an account? <a href="./" style={{ color: "#fca321", textDecoration: "none" }}>Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;
