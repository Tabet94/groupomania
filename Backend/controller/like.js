import { db } from "../connect.js"; 
import jwt from "jsonwebtoken"; 

export const getLikes = (req, res) => {
  const q = "SELECT userId FROM likes WHERE postId = ?"; // SQL query to retrieve users who liked a specific post.

  // Execute the SQL query to get the likes for a specific post.
  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err); // Handle a database error.
    return res.status(200).json(data.map(like => like.userId)); // Respond with an array of user IDs who liked the post.
  });
}

export const addLike = (req, res) => {
  const token = req.cookies.accessToken; // Get the JWT token from the request's cookies.

  if (!token) return res.status(401).json("Not logged in!"); // Check if the user is not logged in (no token).

  // Verify the JWT token to extract user information (ID) and check if it's valid.
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // Handle an invalid token.

    const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)"; // SQL query to add a like to a post.
    const values = [
      userInfo.id, // User ID from the token.
      req.body.postId, // Post ID that is being liked.
    ];

    // Execute the SQL query to add a like to the database.
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err); // Handle a database error.
      return res.status(200).json("Post has been liked."); // Respond with a success message.
    });
  });
}

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken; // Get the JWT token from the request's cookies.

  if (!token) return res.status(401).json("Not logged in!"); // Check if the user is not logged in (no token).

  // Verify the JWT token to extract user information (ID) and check if it's valid.
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // Handle an invalid token.

    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?"; // SQL query to delete a like from a post.

    // Execute the SQL query to remove a like from the database.
    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err); // Handle a database error.
      return res.status(200).json("Post has been disliked."); // Respond with a success message.
    });
  });
}
