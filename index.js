import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnect } from "./config/db.js";
import { createUser } from "./controllers/user/signup.controller.js";
import {
  deleteUser,
  getUser,
  updateUser,
  followUser,
  unfollowUser, 
  searchUser
} from "./controllers/user/user.controller.js";
import {
  createNewTweet,
  getTweets,
  deleteTweet,
  likeTweet,
} from "./controllers/tweet/tweet.controller.js";
import {
  uploadProfile,
} from "./controllers/uploads/upload.controller.js";
import { verifyToken } from "./utils/authMiddleware.js";
import { loginUser } from "./controllers/user/login.controller.js";
import { verifyUser } from "./utils/verifyUser.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnect();


app.post("/signup", createUser);
app.post("/login", loginUser);
app.post("/verifyUser", verifyUser)

// ~------------------------------------------------- user
app.post("/getUser", verifyToken, getUser);
app.post("/updateUser/:userId", updateUser);
app.post("/deleteUser/:userId", deleteUser);
app.post("/followUser", followUser);
app.post("/unfollowUser", unfollowUser);
app.get("/searchUser", searchUser)
// ~------------------------------------------------- tweet
app.post("/createTweet", verifyToken, createNewTweet);
// app.post("/getTweets/:userId", verifyToken, getTweets);
app.post("/getTweets", getTweets);
app.post("/deleteTweet", verifyToken, deleteTweet);
app.post("/likeTweet", likeTweet)

// ~------------------------------------------------- File upload
app.post("/uploads",verifyToken, uploadProfile);

// error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const status = err.status;

  return res.status(statusCode).json({
    status: status || false,
    message,
  });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
