import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Home } from "./Homepage/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
