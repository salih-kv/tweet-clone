import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

import signupRoutes from "./routes/signup.js";
import usersRoutes from "./routes/users.js";
import loginRoutes from './routes/login.js'
import { dbConnect } from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

dbConnect();

app.use("/signup", signupRoutes);
app.use("/users", usersRoutes);
app.use('/login', loginRoutes)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
