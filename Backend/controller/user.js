import { db } from "../connect.js";
import jwt from "jsonwebtoken";





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
   
    

  

    const q =
      "UPDATE users SET `username`=?,`profilePic`=?,`coverPic`=?, `email` =? WHERE id=? ";

    db.query(
      q,
      [
        req.body.username,
        req.body.profilePic,
        req.body.coverPic,
        req.body.email,
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


