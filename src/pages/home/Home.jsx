import React from "react";
import { Posts } from "../../Components/posts/Posts";
import { Share } from "../../Components/share/Share";
import './home.css'

export const Home = () => {
  return (
    <div className="home">
      <Share/>
      <Posts/> 
    </div>
  )
};
