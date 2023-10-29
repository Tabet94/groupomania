// Import necessary dependencies
import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create an AuthContext to manage user authentication
export const AuthContext = createContext();

// Define the AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  // State to hold the current user, initialized with the user from local storage (if available)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Function to handle user login
  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:5000/backend/auth/login", inputs, {
        withCredentials: true,
      });
      // Update the current user with the data from the login response
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/backend/auth/logout", null, {
        withCredentials: true,
      });
      // Set the current user to null to log out the user
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Store the current user in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Provide the AuthContext and its related functions to child components
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
