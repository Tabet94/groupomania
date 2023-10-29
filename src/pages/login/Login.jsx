import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Login.css";

// Define the Login component for user authentication
export const Login = () => {
  // State to store user input for username and password
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  // State to store and display error messages
  const [err, setErr] = useState(null);

  // Use the useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle changes in the input fields
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Access the login function from the AuthContext
  const { login } = useContext(AuthContext);

  // Function to handle the login button click
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the login function from the context and attempt to log in the user
      await login(inputs);
      // If successful, navigate to the home page ("/")
      navigate("/");
    } catch (err) {
      // If there's an error, display the error message
      setErr(err.response.data);
    }
  };

  return (
    // Render the Login component
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Groupomania</h1>
          <p>
            Hello and welcome again,
            Connect into your account,
            & stay in touch with your co-workers.
          </p>
          <span>Don't you have an account?</span>
          {/* Link to the registration page */}
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            {/* Input fields for username and password */}
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {err && err}
            {/* Button to trigger the login process */}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};
