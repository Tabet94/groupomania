// Import necessary dependencies and components
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

// Define the Register component
export const Register = () => {
  // State to manage form input fields
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  // State to handle error messages
  const [err, setErr] = useState(null);

  // Use the useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validation functions
  const isNotEmpty = (value) => value.trim() !== '';
  const isValidEmail = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
  const isValidPassword = (value) => value.length >= 6;

  // Function to handle the registration button click
  const handleClick = async (e) => {
    e.preventDefault();

    // Validation
    if (!isNotEmpty(inputs.username) || !isNotEmpty(inputs.email) || !isNotEmpty(inputs.password)) {
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
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
