import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnect } from "./config/db.js";
import { createUser } from "./controllers/user/signup.controller.js";
import {
  deleteUser,
  getUser,
  updateUser,
} from "./controllers/user/user.controller.js";
import {
  createNewTweet,
  getTweets,
  deleteTweet,
} from "./controllers/tweet/tweet.controller.js";
import { protect } from "./utils/authMiddleware.js";
import { loginUser } from "./controllers/user/login.controller.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnect();

app.post("/signup", createUser);
app.post("/login", loginUser);

// ~------------------------------------------------- user
app.post("/getUser", protect, getUser);
// app.post("/updateUser/:userId", updateUser);
// app.post("/deleteUser/:userId", deleteUser);

// ~------------------------------------------------- tweet
app.post("/createTweet", protect, createNewTweet);
app.get("/getTweets", protect, getTweets);
app.post("/deleteTweet", protect, deleteTweet);

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
