import { db } from "../connect.js"; 
import jwt from "jsonwebtoken"; 
import moment from "moment"; 

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, username, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
      WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  // Execute a SQL query to retrieve comments for a specific post.
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err); 
    return res.status(200).json(data); 
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken; // Get the JWT token from the request's cookies.

  if (!token) return res.status(401).json("Not logged in!"); // Check if the user is not logged in (no token).

  // Verify the JWT token to extract user information (ID) and check if it's valid.
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // Handle an invalid token.

    const q = "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)"; // SQL query to add a comment.
    const values = [
      req.body.desc, // Comment text.
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), // Current timestamp.
      userInfo.id, // User ID from the token.
      req.body.postId, // Post ID where the comment is added.
    ];

    // Execute the SQL query to add a comment to the database.
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err); // Handle a database error.
      return res.status(200).json("Comment has been created."); // Respond with a success message.
    });
  });
};
