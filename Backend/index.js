import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import helmet from "helmet";

// Set the header to allow credentials and parse JSON requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
  })
);

// Use the helmet middleware to enhance security
app.use(helmet());

// Use the helmet.crossOriginResourcePolicy middleware to set the cross-origin resource policy
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/upload'); // Define the destination folder for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Define the filename for uploaded file
  }
});

const upload = multer({ storage: storage });

// Handle file uploads at the "/backend/upload" endpoint
app.post("/backend/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename); // Send a JSON response with the uploaded file's name
});

// Define routes for various parts of the application
app.use("/backend/auth", authRoutes);
app.use("/backend/users", userRoutes);
app.use("/backend/posts", postRoutes);
app.use("/backend/comments", commentRoutes);
app.use("/backend/likes", likeRoutes);

// Start the server and make it listen on port 5000
app.listen(5000, () => {
  console.log('Listening on port 5000');
});

// Export the Express application for use in other files
export default app;
