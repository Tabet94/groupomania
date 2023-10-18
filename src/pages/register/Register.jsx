import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

export const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  
  
  const [err, setErr] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isNotEmpty = (value) => value.trim() !== '';
  const isValidEmail = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const isValidPassword = (value) => value.length >= 6; 


  const handleClick = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!isNotEmpty(inputs.username) || !isNotEmpty(inputs.email) || !isNotEmpty(inputs.password) || !isNotEmpty(inputs.name)) {
      setErr("All fields are required.");
      return;
    }
  
    if (!isValidEmail(inputs.email)) {
      setErr("Please enter a valid email address.");
      return;
    }
  
    if (!isValidPassword(inputs.password)) {
      setErr("Password must be at least 6 characters long.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5000/backend/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  

 

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Groupomania</h1>
          <p>
            Welcome to Groupomania-Network Where everyone is connected
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              validation={{
                required: {
                  value: true,
                  message: 'required',
                },
              }}
              
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}/>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}/>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}/>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};



