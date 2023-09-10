import React, { useState } from "react";
import './App.css';
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Side } from "./Components/Side";


function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = () => {
    setCurrentForm(currentForm === "login" ? "register" : "login");
  };

  return (
    <div className="App">
      <div className="content-container">
      {currentForm === "login" ? <Login /> : <Register />}
        <div className="link-container">
          <button className="link-btn" onClick={toggleForm}>
            Switch to {currentForm === "login" ? "Register" : "Login"}
          </button>
        </div>
      </div>
      <Side/>  
    </div>
  );
};


export default App;