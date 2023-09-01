import React, { useState } from 'react';
import './Login.css'



export const Login = () => {    
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState ('');


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="auth-form-container"> 
            <form className='login-form' onSubmit={handleSubmit}> 
            
                <h1>Login</h1>
                <label htmlFor="email">EMAIL</label>
                <input value={email}
                    onChange={e =>setEmail(e.targetvalue)} 
                    type="text" 
                    placeholder="Useremail" 
                    id='email' 
                    name='email'>   
                </input>    
                <label htmlFor="password">PASSWORD</label>
                <input value={pass}
                    onChange={e => setPass(e.targetvalue)} 
                    type="text" placeholder="*******" 
                    id='password' 
                    name='password'>   
                </input>
                <button className='login-btn'type='submit'>Log In</button>
            </form>
        </div>      
    );
};





