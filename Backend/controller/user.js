import { db } from "../connect.js"; 
import jwt from "jsonwebtoken"; 

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?"; // SQL query to retrieve user information by their ID.

  // Execute the SQL query to fetch user information.
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err); // Handle a database error.
    const { password, ...info } = data[0]; // Remove the password field for security.
    return res.json(info); // Respond with the user's information.
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken; // Get the JWT token from the request's cookies.

  if (!token) return res.status(401).json("Not authenticated!"); // Check if the user is not authenticated (no token).

  // Verify the JWT token to extract user information and check if it's valid.
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!"); // Handle an invalid token.

    const q =
      "UPDATE users SET `username`=?,`profilePic`=?,`coverPic`=?, `email` =? WHERE id=? "; // SQL query to update user information.

    // Execute the SQL query to update the user's information, but only for the user's own data.
    db.query(
      q,
      [
        req.body.username,
        req.body.profilePic,
        req.body.coverPic,
        req.body.email,
        userInfo.id, // User ID from the token.
      ],
      (err, data) => {
        if (err) res.status(500).json(err); // Handle a database error.
        if (data.affectedRows > 0) return res.json("Updated!"); // Respond with a success message.
        return res.status(403).json("You can update only your user!"); // Inform the user they can only update their own data.
      }
    );
  });
};

export const deleteUser = (req, res) => {
  const token = req.cookies.accessToken; // Get the JWT token from the request's cookies.

  if (!token) return res.status(401).json(req); // Check if the user is not authenticated (no token).

  // Verify the JWT token to extract user information and check if it's valid.
  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json("Token is not valid!"); // Handle an invalid token.

    // Clear the accessToken cookie.
    res.clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    });

    const userId = req.params.userId;
    const q = "DELETE FROM users WHERE id=?"; // SQL query to delete a user.

    // Execute the SQL query to remove a user, but only for the user's own data.
    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err); // Handle a database error.
      if (data.affectedRows > 0) {
        return res.json({ message: "User deleted successfully" }); // Respond with a success message.
      }
      return res.status(403).json("You can delete only your user!"); // Inform the user they can only delete their own user.
    });
  });
};
