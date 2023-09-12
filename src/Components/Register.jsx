import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";


export const Register = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState ('');
    const [name,setName] = useState('');
    const navigate = useNavigate();
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
            if (!name || !email || !password) {
            console.log('One or more fields are missing');
            return;
          }

        axios.post('http://localhost:5000/user', { name, email, password }) 
        .then((res) => {
            console.log('Registration successful');
            navigate('/login');
          
          })
        .catch(err => console.log(err))
    }
   
    return (
        <div className="auth-form-container">
            
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>SignUp</h1> 
                <label htmlFor="Full name">NAME</label>
                <input value={name}
                    onChange={e => setName(e.target.value)} 
                    type="text" 
                    placeholder="Enter Name" 
                    name="name" 
                    id="name">    
                </input> 
                <label htmlFor="email">EMAIL</label>
                <input value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text" 
                    placeholder="Enter Email" 
                    id='email'
                    name='email'>
                </input>  
                <label htmlFor="password">PASSWORD</label>
                <input value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    type="password"
                    placeholder="Enter Password" 
                    id='password'
                    name='password'>   
                </input>
                <button className='register-btn' type='submit'>Sing Up</button>
            </form>
            <Link to="/login" className='link-btn'>login</Link>   
        </div>
    );
};
