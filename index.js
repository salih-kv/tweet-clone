import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnect } from "./config/db.js";
import { createUser } from "./controllers/user/signup.controller.js";
import { getUsers, updateUsers } from "./controllers/user/users.controller.js";
import loginUser from "./controllers/user/login.controller.js";
import {
  createNewTweet,
  updateTweet,
  getTweets,
  deleteTweet,
} from "./controllers/tweet/tweet.controller.js";
import { verifyToken } from "./controllers/user/tokenValidation.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dbConnect();

app.post("/signup", createUser);
app.use("/users", getUsers);
app.post("/login", loginUser);
app.post("/verifyToken", verifyToken);
app.post("/createTweet", createNewTweet);
app.get("/getTweets", getTweets);
app.post("/updateTweet", updateTweet);
app.post("/deleteTweet", deleteTweet);
app.post("/updateUsers", updateUsers);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
