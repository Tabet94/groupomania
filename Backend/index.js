import  express  from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";



// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../social-app/public/upload')
  },
  filename: function (req, file, cb) {

    
    cb(null, Date.now() + file.originalname )
  }
})
const upload = multer({ storage: storage })
app.post ("/backend/upload", upload.single("file"), (req,res) => {
  const file = req.file;
  res.status(200).json(file.filename)
})


app.use("/backend/auth",authRoutes);
app.use("/backend/users",userRoutes);
app.use("/backend/posts",postRoutes);
app.use("/backend/comments",commentRoutes);
app.use("/backend/likes",likeRoutes);



app.listen(5000, () => {
  console.log('Listening on port 5000');
    });