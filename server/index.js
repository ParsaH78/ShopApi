import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Connected on Port ${process.env.PORT}`);
});