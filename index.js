import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import signupRoutes from "./routes/signup.js";
import usersRoutes from "./routes/users.js";
import { dbConnect } from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/signup", signupRoutes);
app.use("/users", usersRoutes);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
