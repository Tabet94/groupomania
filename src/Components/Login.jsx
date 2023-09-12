import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';




export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            console.log('Both email and password are required');
            return;
        }

        // Send a POST request to the login API endpoint
        axios
            .post('http://localhost:5000/login', { email, password })
            .then((res) => {
                console.log('Login successful'); 
                ;
            })
            .catch((err) => {
                console.log('Login failed:', err.response.data.message);
            });
    };

    return (
        <div className="auth-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="email">EMAIL</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter Email"
                    id="email"
                    name="email"
                ></input>
                <label htmlFor="password">PASSWORD</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    placeholder="Enter Password"
                    id="password"
                    name="password"
                ></input>
                <button className="login-btn" type="submit">
                    Log In
                </button>
                
            </form>
            <Link to="/register" className='link-btn'>Create account</Link> 
        </div>
    );
};





