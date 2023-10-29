import { db } from "../connect.js"; 
import jwt from "jsonwebtoken"; 
import moment from "moment"; // Import the moment library for date formatting.

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken; // Get the JWT token from the request's cookies.

  if (!token) return res.status(401).json("Not logged in!"); // Check if the user is not logged in (no token).

  // Verify the JWT token to extract user information (ID) and check if it's valid.
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // Handle an invalid token.

    const q = 'SELECT p.*, u.id AS userId, username, profilePic FROM posts AS p JOIN users AS u ON (u.id) = p.userId ORDER BY p.createdat DESC';

    // Execute a SQL query to retrieve posts along with user information.
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err); // Handle a database error.
      return res.status(200).json(data); // Respond with the retrieved posts.
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken; // Get the JWT token from the request's cookies.

  if (!token) return res.status(401).json("Not logged in!"); // Check if the user is not logged in (no token).

  // Verify the JWT token to extract user information (ID) and check if it's valid.
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // Handle an invalid token.

    const q = "INSERT INTO posts (`desc`,`img`,`createdAt`, `userId` ) VALUES (?)"; // SQL query to add a new post.
    const values = [
      req.body.desc, // Post description.
      req.body.img, // Post image.
      moment(Date.now()).fromNow("YYYY-MM-DD HH:mm:ss"), // Current timestamp.
      userInfo.id, // User ID from the token.
    ];

    // Execute the SQL query to add a new post to the database.
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err); // Handle a database error.
      return res.status(200).json("Post created"); // Respond with a success message.
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken; // Get the JWT token from the request's cookies.

  if (!token) return res.status(401).json("Not logged in!"); // Check if the user is not logged in (no token).

  // Verify the JWT token to extract user information (ID) and check if it's valid.
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // Handle an invalid token.

    const q = "DELETE FROM posts WHERE `id`=? AND `userId` = ?"; // SQL query to delete a post.

    // Execute the SQL query to remove a post from the database, but only if it belongs to the user.
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err); // Handle a database error.
      if (data.affectedRows > 0) return res.status(200).json("Post has been deleted."); // Respond with a success message.
      return res.status(403).json("You can delete only your post"); // Inform the user they can only delete their posts.
    });
  });
};
