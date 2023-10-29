import { db } from "../connect.js"; 
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?"; // SQL query to check if a user with the given username exists.

  db.query(q, [req.body.username], (err, data) => { // Execute the query to check for an existing user.
    if (err) return res.status(500).json(err); // Handle a database error.
    if (data.length) return res.status(409).json("User already exists!"); // Return an error if the user already exists.

    // Generate a salt and hash the user's password.
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (`username`,`email`,`password`) VALUE (?)"; // SQL query to insert a new user.
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword, 
    ];

    db.query(q, [values], (err, data) => { // Execute the query to insert the new user.
      if (err) return res.status(500).json(err); // Handle a database error.
      return res.status(200).json("User has been created."); // Respond with a success message.
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?"; // SQL query to find a user by their username.

  db.query(q, [req.body.username], (err, data) => { // Execute the query to find the user.
    if (err) return res.status(500).json(err); // Handle a database error.
    if (data.length === 0) return res.status(404).json("User not found!"); // Return an error if the user is not found.

    // Compare the provided password with the hashed password stored in the database.
    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!"); // Return an error for incorrect password.

    // Generate a JSON Web Token (JWT) for authentication.
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0]; // Remove the password field for security.

    // Set the JWT token as an HTTP-only cookie and respond with user data.
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  // Clear the access token cookie, making the user effectively logged out.
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out.");
};
