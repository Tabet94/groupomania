import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:5000/backend/auth/login", inputs, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/backend/auth/logout", null, {
        withCredentials: true,
      });
      setCurrentUser(null); // Clear the current user state
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
