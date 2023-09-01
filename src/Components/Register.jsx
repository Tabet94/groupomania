import React, { useState } from "react";


export const Register = () => {
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState ('');
    const [name,setName] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email", email);
    }
   
    return (
        <div className="auth-form-container">
            
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>SignUp</h1> 
                <label htmlFor="Full name">NAME</label>
                <input value={name}
                    onChange={e => setName(e.targetvalue)} 
                    type="text" 
                    placeholder="Username" 
                    name="name" 
                    id="name">    
                </input> 
                <label htmlFor="email">EMAIL</label>
                <input value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text" 
                    placeholder="Useremail" 
                    id='email'
                    name='email'>
                </input>  
                <label htmlFor="password">PASSWORD</label>
                <input value={pass} 
                    onChange={e => setPass(e.targetvalue)} 
                    type="text"
                    placeholder="*******" 
                    id='password'
                    name='password'>   
                </input>
                <button className='register-btn' type='submit'>Sing Up</button>
            </form>   
        </div>
    );
};
