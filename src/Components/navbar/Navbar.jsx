import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Logout } from "../logout/Logout";


export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Groupomania</span>
        </Link>
      </div>
      <div className="right">
        <div className="user">
          <Link
            to={`/profile/${currentUser.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={`/upload/${currentUser.profilePic}`}
              alt=""
            />
            <span>{currentUser.name}</span>
          </Link>
        </div>
      </div>
      <Logout />
    </div>
  );
};


