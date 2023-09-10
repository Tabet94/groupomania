const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'groupomania'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});


// User route SIGNUP ..............................................................................
app.post('/user', (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if required fields are missing ................................................................
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
  
    // Check if the email is already registered ............................................................
    db.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      // If the email is not registered, insert the new user into the database ........................................
      const sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
      db.query(sql, [name, email, password], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        return res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });app.post('/user', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if required fields are missing ......................................
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Check if the email is already registered ................................
        const existingUser = await db.query('SELECT * FROM user WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password before saving it ....................................
        const saltRounds = 10; // Number of salt rounds (higher is more secure)
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database with the hashed password ........
        const sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
        await db.query(sql, [name, email, hashedPassword]);

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

  



// User route LOGIN ...........................................................
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if required fields are missing ......................................
  if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
      // Fetch the user with the provided email .................................
      const user = await db.query('SELECT * FROM user WHERE email = ?', [email]);

      if (user.length === 0) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Compare the hashed password with the provided password ..................
      const passwordMatch = await bcrypt.compare(password, user[0].password);

      if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      // User authenticated successfully
      return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});