import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"




export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
   
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(hashedPassword)

  

    const q =
      "UPDATE users SET `name`=?,`profilePic`=?,`coverPic`=?, `email` =?, `password` =? WHERE id=? ";

    db.query(
      q,
      [
        req.body.name,
        req.body.profilePic,
        req.body.coverPic,
        req.body.email,
        hashedPassword,
        userInfo.id
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};



export const deleteUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json(req);

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json("Token is not valid!");

    // Clear the accessToken cookie
    res.clearCookie("accessToken", {
      secure: true,
      sameSite: "none"
    });
    
    const userId = req.params.userId;
    const q = "DELETE FROM users WHERE id=?";
    
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) {
        return res.json({ message: "User deleted successfully" });
      }
      return res.status(403).json("You can delete only your user!");
    });
  })
};


